export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/') {
        console.log(from.meta);
        return navigateTo('/home');
    }
})  