import ProductDetail from '@/components/ProductDetail'
import { getProductById } from '@/lib/product'
import { notFound } from 'next/navigation'

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductDetailPage = async ({ params }: ProductPageProps) => {
  try {
    const product = await getProductById(params.id)
    return <ProductDetail product2={product} />
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error)
    notFound()
  }
}

export default ProductDetailPage