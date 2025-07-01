import ProductDetail from '@/components/ProductDetail'
import { getProductById } from '@/lib/product'
import { getProductsByCategory } from '@/lib/productCategory'
import { notFound } from 'next/navigation'
import ProductList from '../../category/components/ProductList'

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  try {
    const product = await getProductById(params.id)
    // Harmonisation de la structure
    const isApiStructure = product && typeof product === 'object' && 'product' in product;
    const prod = isApiStructure ? product.product : product;
    const categories = prod.categories;
    let relatedProducts = []
    let loading = false
    let error = ''
    if (categories && categories.length > 0) {
      try {
        loading = true
        console.log('Catégories du produit:', categories)
        const categoryId = categories[0]?.id
        if (!categoryId) {
          error = 'Aucune catégorie trouvée pour ce produit.'
        } else {
          const data = await getProductsByCategory(categoryId)
          console.log('Produits de la catégorie:', data)
          relatedProducts = Array.isArray(data) ? data.filter((p: any) => p.id !== prod.id) : []
        }
      } catch (e) {
        error = 'Erreur lors du chargement des autres produits.'
      } finally {
        loading = false
      }
    } else {
      error = 'Ce produit n\'a pas de catégorie associée.'
    }
    return <>
      <ProductDetail product2={product} />
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <ProductList products={relatedProducts} loading={loading} error={error} title="Autres produits de la catégorie" />
      </div>
    </>
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error)
    notFound()
  }
}

export default ProductDetailPage