import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des routes publiques
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/category',
  '/product',
  '/fermier/login',
  '/fermier/register',
];

// Liste des routes protégées du fermier
const protectedFarmerRoutes = [
  '/fermier',
  '/fermier/add-farm',
  '/fermier/mes-fermes',
  '/fermier/produits',
  '/fermier/commandes',
  '/fermier/profile',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si c'est une route publique
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Vérifier si c'est une route protégée du fermier
  const isFarmerRoute = protectedFarmerRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Si c'est une route publique, autoriser l'accès
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Si c'est une route protégée du fermier
  if (isFarmerRoute) {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('jwt_token');

    // Si pas de token, rediriger vers la page de connexion fermier
    if (!token) {
      return NextResponse.redirect(new URL('/fermier/login', request.url));
    }

    // Si token présent, autoriser l'accès
    return NextResponse.next();
  }

  // Pour toute autre route non listée, rediriger vers la page 404
  return NextResponse.rewrite(new URL('/404', request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo|banner-carousel|ico|imgs|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|woff2?|ttf|eot|otf|webmanifest)).*)',
  ],
};
