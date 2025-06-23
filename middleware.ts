import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Liste des routes autorisées
const allowedRoutes = [
  '/',
  '/login',
  '/register',
  '/category',
  '/product',
  '/fermier/login',
  '/fermier/register',
  '/fermier/dashboard',
  '/fermier/profile',
  '/fermier/settings',
  '/fermier/help',
  '/fermier/support',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si le chemin commence par une route autorisée
  const isAllowedRoute = allowedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Si la route n'est pas autorisée, rediriger vers la page 404
  if (!isAllowedRoute) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }

  return NextResponse.next();
}

// Configuration du middleware
export const config = {
  // Matcher les routes qui ne commencent pas par ces préfixes
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  matcher: [
    '/',
    '/login',
    '/register',
    '/category',
    '/product',
    '/fermier/login',
    '/fermier/register',
    '/fermier/dashboard',
    '/fermier/profile',
    '/fermier/settings',
    '/fermier/help',
    '/fermier/support',
  ],
};