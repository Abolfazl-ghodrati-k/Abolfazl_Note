const urls = [
    '/_next/static/chunks/pages/index.js?ts=1675885406760',
    '/_next/static/chunks/pages/_app.js?ts=1675885406760',
    '/_next/static/chunks/react-refresh.js?ts=1675885406760',
    '/icon-192x192.png',
    '/_next/static/chunks/main.js?ts=1675885406760',
    '/_next/static/chunks/webpack.js?ts=1675885406760'
]

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open("staticCache").then(cache => {
            console.log("chaching all alerts")
            cache.addAll(urls)
        })
    )
})
self.addEventListener('activate', (evt) => {
   console.log("activated: ", evt)
})
// self.addEventListener('fetch', (evt) => {
//     evt.respondWith(
//         caches.match(evt.request).then(CacheRes => {
//             return CacheRes || fetch(evt.request)
//         })
//     )
// })

self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Recieved notification: ", data)
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: "Push notification from section.io", //the body of the push notification
            image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
            icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon 
        }
    );
});