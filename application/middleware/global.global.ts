export default defineNuxtRouteMiddleware((to, from) => {
  // Global middleware - runs on every route change
  // You can add global logic here, such as:
  // - Analytics tracking
  // - Performance monitoring
  // - Global loading states
  
  console.log(`[Global Middleware] Navigating from ${from.path} to ${to.path}`);
});
