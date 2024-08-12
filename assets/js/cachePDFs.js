
export function cachePDFs(pdfUrls) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/assets/js/cacheServiceWorker.js')
            .then(registration => {
                //console.log('Service Worker registered with scope:', registration.scope);

                if (registration.active) {
                    registration.active.postMessage({
                        action: 'updateCache',
                        pdfs: pdfUrls
                    });
                } else if (registration.waiting) {
                    registration.waiting.postMessage({
                        action: 'updateCache',
                        pdfs: pdfUrls
                    });
                } else if (registration.installing) {
                    registration.installing.addEventListener('statechange', function () {
                        if (this.state === 'activated') {
                            this.postMessage({
                                action: 'updateCache',
                                pdfs: pdfUrls
                            });
                        }
                    });
                }
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}

//cache PDF Service Workers
const CACHE_NAME = 'pdf-cache-v1';

// Function to cache new PDFs
function cachePdfs(pdfs) {
    return caches.open(CACHE_NAME).then(cache => {
        return Promise.all(pdfs.map(pdf => {
            return cache.add(pdf).catch(error => {
                console.error('Failed to cache:', pdf, error);
            });
        }));
    });
}

// Function to remove PDFs from the cache
function removePdfsFromCache(pdfs) {
    return caches.open(CACHE_NAME)
        .then(cache => {
            return Promise.all(pdfs.map(pdf => cache.delete(pdf)));
        });
}

// Function to update the cache with a new array of PDFs
function updateCacheWithNewPdfs(newPdfs) {
    return caches.open(CACHE_NAME)
        .then(cache => {
            return cache.keys()
                .then(keys => {
                    const cachedRequests = keys.map(request => request.url);
                    const pdfsToRemove = cachedRequests.filter(url => !newPdfs.includes(url));
                    const pdfsToAdd = newPdfs.filter(url => !cachedRequests.includes(url));
                    return Promise.all([
                        ...pdfsToRemove.map(pdf => cache.delete(pdf)),
                        ...pdfsToAdd.map(pdf => cache.add(pdf))
                    ]);
                });
        });
}

self.addEventListener('install', event => {
    event.waitUntil(
        cachePdfs(pdfUrlsToCache)
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.endsWith('.pdf')) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
        );
    }
});
