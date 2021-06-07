// make sure sw are supported
if('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        console.log("service worker support");
        navigator.serviceWorker
            .register('../sw_cache_site.js')
            .then(() => {console.log("service worker: Registered")})
            .catch((err) => {console.log(`service worker: ${err}`)})
    })
}