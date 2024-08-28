// scripts: 
// - '/assets/js/upup/upup.min.js'

// Example Usage
// const cacheHelper = new CacheHelper();

// // Example usage of manageCache
// cacheHelper.manageCache('thumbnail-cache', 'thumbnail-key', async () => {
//     return fetch('https://example.com/thumbnail.jpg').then(response => response.text());
// }).then(result => {
//     console.log('Thumbnail:', result);
// });

// // Example usage of clearCache
// cacheHelper.clearCache('thumbnail-cache');

// // Example usage of removeFromCache
// cacheHelper.removeFromCache('thumbnail-cache', 'thumbnail-key');

// // Example usage of getAllCachedKeys
// cacheHelper.getAllCachedKeys('thumbnail-cache').then(keys => {
//     console.log('Cached keys:', keys);
// });

class CacheHelper {
    constructor() {
        // Ensure that UPUP is initialized properly
        this.initUpUp();
    }

    initUpUp() {
        if (typeof UpUp === 'undefined') {
            throw new Error("UpUp is not available. Make sure you have included the UPUP library.");
        }

        // Start UPUP service worker if it hasn't been started already
        UpUp.start({
            'cache-version': 'v1',
            'service-worker-url': '/assets/js/upup/upup.sw.min.js'
        });
    }

    async manageCache(cacheName, cacheKey, fetchFunction, ttl = null) {
        // Set default TTL to 1 week if not provided
        if (!ttl) {
            ttl = new Date();
            ttl.setDate(ttl.getDate() - 7); // Set the TTL to 1 week ago
        }

        // Check if the cache type exists, if not, create it
        const cache = await caches.open(cacheName);

        // Check if the cache has a value for the specified key
        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
            // Check if the TTL is specified and if the cache has expired
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            if (cachedDate < ttl) {
                console.log('Cache expired, fetching new data...');
            } else {
                // If a value exists and TTL is valid, return it as a text or JSON based on your needs
                return JSON.parse(await cachedResponse.text());
            }
        }

        // If no value exists or cache is expired, execute the function to get the value
        const result = await fetchFunction();

        // Save the result in the cache for future requests
        const headers = new Headers({ 'sw-cache-date': new Date().toISOString() });
        const response = new Response(JSON.stringify(result), { headers });
        await cache.put(cacheKey, response);

        // Return the result
        return result;
    }

    async manageCacheBinary(cacheName, cacheKey, fetchFunction, ttl = null) {
        // Set default TTL to 1 week if not provided
        if (!ttl) {
            ttl = new Date();
            ttl.setDate(ttl.getDate() - 7); // Set the TTL to 1 week ago
        }

        // Check if the cache type exists, if not, create it
        const cache = await caches.open(cacheName);

        // Check if the cache has a value for the specified key
        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
            // Check if the TTL is specified and if the cache has expired
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            if (cachedDate < ttl) {
                console.log('Cache expired, fetching new data...');
            } else {
                // If a value exists and TTL is valid, return it as an arrayBuffer
                return cachedResponse.arrayBuffer();
            }
        }

        // If no value exists or cache is expired, execute the function to get the value
        const result = await fetchFunction();

        // Save the result in the cache for future requests
        const headers = new Headers({ 'sw-cache-date': new Date().toISOString() });
        const response = new Response(result, { headers });
        await cache.put(cacheKey, response);

        // Return the result
        return result;
    }

    async manageCacheImage(cacheName, imageUrl, ttl = null) {
        var debug = false;

        // Set default TTL to 1 week if not provided
        if (!ttl) {
            ttl = new Date();
            ttl.setDate(ttl.getDate() - 7); // Set the TTL to 1 week ago
        }

        // Check if the cache type exists, if not, create it
        const cache = await caches.open(cacheName);
        const cacheKey = imageUrl.replace('https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/', '').replace(/\s+/g, "_");

        // Check if the cache has a value for the specified key
        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
            // Check if the TTL is specified and if the cache has expired
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            if (cachedDate < ttl) {
                if (debug) console.log('Cache expired, fetching new image...');
            } else {
                if (debug) console.log(`Cache exists for key ${cacheKey}`)
                // If a value exists and TTL is valid, return the cached Blob URL
                const cachedBlob = await cachedResponse.blob();
                return URL.createObjectURL(cachedBlob);
            }
        }

        // If no value exists or cache is expired, fetch the image
        const response = await fetch(imageUrl);
        const imageBlob = await response.blob();

        // Save the image blob in the cache for future requests
        const headers = new Headers({ 'sw-cache-date': new Date().toISOString() });
        const newResponse = new Response(imageBlob, { headers });
        await cache.put(cacheKey, newResponse);
        if (debug) console.log(`Create new cache for key ${cacheKey}`)

        // Return the cached Blob URL
        return URL.createObjectURL(imageBlob);
    }

    async clearCache(cacheName) {
        // Delete the specified cache
        await caches.delete(cacheName);
    }

    async removeFromCache(cacheName, cacheKey) {
        // Remove a specific entry from the cache
        const cache = await caches.open(cacheName);
        await cache.delete(cacheKey);
    }

    async getAllCachedKeys(cacheName) {
        // Get all keys stored in the specified cache
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        return keys.map(request => request.url);
    }
}
