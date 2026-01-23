export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware for auth pages
  const publicPages = ['/', '/sign-in', '/sign-up'];
  
  if (publicPages.includes(to.path)) {
    return;
  }

  // Check if user is authenticated (client-side only)
  if (import.meta.client) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return navigateTo('/sign-in');
    }
  }
});
