const urls = [
  "/icon-192x192.png",
  "/Images/bg.png",
  "/Images/Icons/back.png",
  "/Images/Icons/editTag.png",
  "/Images/Icons/menu-rounded.png",
  "/Images/Icons/menu-vertical.png",
  "/Images/Icons/notes.svg",
  "/Images/Icons/notes.png",
  "/Images/Icons/person.png",
  "/Images/Icons/recycle.png",
  "/Images/Icons/search.png",
  "https://fonts.googleapis.com/css?family=Open+Sans:300,400,700",
  "/home"
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open("staticCache").then((cache) => {
      var stack = [];
      urls.forEach((file) =>
        stack.push(
          cache
            .add(file)
            .catch((_) => console.error(`can't load ${file} to cache`))
        )
      );
      return Promise.all(stack)
    })
  );
});
self.addEventListener("activate", (evt) => {
  console.log("activated: ", evt);
});
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((CacheRes) => {
      return CacheRes || fetch(evt.request);
    })
  );
});

// self.addEventListener("push", e => {
//     const data = e.data.json();
//     console.log("Recieved notification: ", data)
//     self.registration.showNotification(
//         data.title, // title of the notification
//         {
//             body: "Push notification from section.io", //the body of the push notification
//             image: "https://pixabay.com/vectors/bell-notification-communication-1096280/",
//             icon: "https://pixabay.com/vectors/bell-notification-communication-1096280/" // icon
//         }
//     );
// });
