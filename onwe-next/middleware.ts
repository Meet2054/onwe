import { clerkMiddleware } from '@clerk/nextjs/server';
 
export default clerkMiddleware()
 
export const config = {
  publicRoutes: ["/"],
  matcher: [
    '/((?!.*\\..*|_next).*)', // Don't run middleware on static files
    '/', // Run middleware on index page
    '/(api|trpc)(.*)'], // Run middleware on API routes
};