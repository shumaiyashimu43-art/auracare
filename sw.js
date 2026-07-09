// sw.js - ব্যাকগ্রাউন্ড সার্ভিস ওয়ার্কার

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// ব্যাকগ্রাউন্ডে নোটিফিকেশন রিসিভ করার ইভেন্ট
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'MEDICINE_REMINDER') {
        const options = {
            body: event.data.body,
            icon: 'https://cdn-icons-png.flaticon.com/512/822/822143.png', 
            badge: 'https://cdn-icons-png.flaticon.com/512/822/822143.png',
            vibrate: [200, 100, 200, 100, 200], 
            tag: 'medication-reminder',
            renotify: true,
            requireInteraction: true
        };

        event.waitUntil(
            self.registration.showNotification(event.data.title, options)
        );
    }
});

// নোটিফিকেশনে ক্লিক করলে অ্যাপ উইন্ডো সামনে আসবে
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/');
        })
    );
});