class CacheHelper {
    constructor() {
        this.initUpUp();
        this.debug = true;
        this.cleanedExpired = false; // Track if expired caches were cleaned already
    }

    initUpUp() {
        if (typeof UpUp === 'undefined') {
            throw new Error("UpUp is not available. Make sure you have included the UPUP library.");
        }

        UpUp.start({
            'cache-version': 'v1',
            'service-worker-url': '/assets/js/upup/upup.sw.min.js'
        });

        if (this.debug) console.log("UpUp initialized.");
    }

    // Manage Cache for Text or Object Data
    async manageCache(cacheName, cacheKey, fetchFunction, ttl = null) {
        if (!ttl) {
            ttl = new Date();
            ttl.setDate(ttl.getDate() - 7); // Set TTL to 1 week ago
        }

        const cache = await caches.open(cacheName);
        if (this.debug) console.log(`Opened cache: ${cacheName}`);

        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            if (cachedDate >= ttl) {
                if (this.debug) console.log(`Data found in cache and valid: ${cacheKey}`);
                return JSON.parse(await cachedResponse.text());
            }
        }

        const result = await fetchFunction();
        const estimatedSize = this.estimateDataSize(result);

        if (await this.willExceedStorageQuota(estimatedSize)) {
            if (this.debug) console.log(`Caching ${cacheKey} will exceed storage quota.`);
            await this.handleCacheQuotaExceeded(cacheName, cacheKey, result, estimatedSize, ttl);
        } else {
            if (this.debug) console.log(`Caching data for: ${cacheKey}`);
            await this.tryCachePut(cache, cacheKey, JSON.stringify(result), estimatedSize);
        }

        return result;
    }

    // Manage Cache for Binary Data
    async manageCacheBinary(cacheName, cacheKey, fetchFunction, ttl = null) {
        if (!ttl) {
            ttl = new Date();
            ttl.setDate(ttl.getDate() - 7); // Set TTL to 1 week ago
        }

        const cache = await caches.open(cacheName);
        if (this.debug) console.log(`Opened cache: ${cacheName}`);

        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            if (cachedDate >= ttl) {
                if (this.debug) console.log(`Binary data found in cache and valid: ${cacheKey}`);
                return cachedResponse.arrayBuffer();
            }
        }

        const result = await fetchFunction();
        const estimatedSize = result.byteLength;

        if (await this.willExceedStorageQuota(estimatedSize)) {
            if (this.debug) console.log(`Caching binary ${cacheKey} will exceed storage quota.`);
            await this.handleCacheQuotaExceeded(cacheName, cacheKey, result, estimatedSize, ttl);
        } else {
            if (this.debug) console.log(`Caching binary data for: ${cacheKey}`);
            await this.tryCachePut(cache, cacheKey, result, estimatedSize);
        }

        return result;
    }

    // Manage Cache for Images
    async manageCacheImage(cacheName, imageUrl, ttl = null) {
        if (!ttl) {
            ttl = new Date();
            ttl.setDate(ttl.getDate() - 7); // Set TTL to 1 week ago
        }

        const cache = await caches.open(cacheName);
        if (this.debug) console.log(`Opened cache: ${cacheName}`);

        const cacheKey = imageUrl.replace('https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/', '').replace(/\s+/g, "_");
        const cachedResponse = await cache.match(cacheKey);
        if (cachedResponse) {
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            if (cachedDate >= ttl) {
                if (this.debug) console.log(`Image found in cache and valid: ${cacheKey}`);
                const cachedBlob = await cachedResponse.blob();
                return URL.createObjectURL(cachedBlob);
            }
        }

        const response = await fetch(imageUrl);
        if (response.status !== 200) return null;

        const imageBlob = await response.blob();
        const estimatedSize = imageBlob.size;

        if (await this.willExceedStorageQuota(estimatedSize)) {
            if (this.debug) console.log(`Caching image ${cacheKey} will exceed storage quota.`);
            await this.handleCacheQuotaExceeded(cacheName, cacheKey, imageBlob, estimatedSize, ttl);
        } else {
            if (this.debug) console.log(`Caching image data for: ${cacheKey}`);
            await this.tryCachePut(cache, cacheKey, imageBlob, estimatedSize);
        }

        return URL.createObjectURL(imageBlob);
    }

    async tryCachePut(cache, cacheKey, result, size) {
        if (this.debug) console.log(`Attempting to cache: ${cacheKey}`);

        let body;
        let contentType;

        // Determine the body and content type based on the result type
        if (typeof result === 'string') {
            body = result;
            contentType = 'text/plain';
        } else if (result instanceof Blob) {
            return;
            body = result;
            contentType = result.type || 'application/octet-stream'; // Use the blob's type if available
        } else if (result instanceof ArrayBuffer) {
            body = new Blob([result]); // Convert ArrayBuffer to Blob
            contentType = 'application/octet-stream';
        } else if (typeof result === 'object' && !Array.isArray(result)) {
            body = JSON.stringify(result);
            contentType = 'application/json';
        } else {
            // Handle common image types based on their extensions in the cacheKey
            const lowerCacheKey = cacheKey.toLowerCase();
            if (lowerCacheKey.endsWith('.png')) {
                contentType = 'image/png';
                body = new Blob([result], { type: contentType });
            } else if (lowerCacheKey.endsWith('.jpeg') || lowerCacheKey.endsWith('.jpg')) {
                contentType = 'image/jpeg';
                body = new Blob([result], { type: contentType });
            } else if (lowerCacheKey.endsWith('.gif')) {
                contentType = 'image/gif';
                body = new Blob([result], { type: contentType });
            } else if (lowerCacheKey.endsWith('.svg')) {
                contentType = 'image/svg+xml';
                body = new Blob([result], { type: contentType });
            } else {
                throw new Error('Unsupported data type for caching');
            }
        }

        const contentLength = typeof body === 'string' ? new Blob([body]).size : body.size || body.byteLength;

        const headers = new Headers({
            'Content-Type': contentType, // Set dynamically based on content
            'Content-Length': contentLength, // Set Content-Length explicitly
            'sw-cache-date': new Date().toISOString()
        });

        const response = new Response(body, { headers });
        await cache.put(cacheKey, response);

        if (this.debug) console.log(`Cached successfully: ${cacheKey} with size ${contentLength} and Content-Type: ${contentType}`);
    }

    async willExceedStorageQuota(estimatedSize) {
        if ('storage' in navigator && navigator.storage.estimate) {
            const { quota, usage } = await navigator.storage.estimate();

            const remaining = Math.max(quota - usage, 0);
            if (this.debug) console.log(`Quota: ${quota}, Usage: ${usage}, Remaining storage: ${remaining}, Estimated size: ${estimatedSize}`);
            return remaining < estimatedSize;
        }
        return false; // If storage estimate API is unavailable, assume no quota issue
    }

    async handleCacheQuotaExceeded(cacheName, cacheKey, result, size, ttl) {
        if (!this.cleanedExpired) {
            if (this.debug) console.warn('Cleaning up expired caches...');
            await this.cleanUpExpiredCache(cacheName, ttl);
            this.cleanedExpired = true; // Set flag to skip future cleanup
        }

        while (await this.willExceedStorageQuota(size)) {
            if (this.debug) console.warn('Deleting smallest cache entry and retrying...');
            const deleted = await this.deleteSmallestCacheEntry();
            if (!deleted) {
                if (this.debug) console.warn('No more cache entries to delete. Returning result without caching.');
                return result;
            }
        }

        if (!await this.willExceedStorageQuota(size)) {
            const cache = await caches.open(cacheName);
            await this.tryCachePut(cache, cacheKey, result, size);
        }
    }

    // Deletes the smallest cache entry across all caches
    async deleteSmallestCacheEntry() {
        const cacheNames = await caches.keys();
        let cacheEntries = [];

        // Gather all cache entries and their sizes in one go
        for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();

            for (const request of keys) {
                const response = await cache.match(request);
                const contentLength = parseInt(response.headers.get('Content-Length'), 10);

                if (contentLength > 0) {
                    cacheEntries.push({
                        cacheName,
                        request,
                        size: contentLength
                    });
                }
            }
        }

        // Sort all cache entries by size (ascending)
        cacheEntries.sort((a, b) => a.size - b.size);

        // Delete the smallest entry
        if (cacheEntries.length > 0) {
            const smallestEntry = cacheEntries[0];
            const cache = await caches.open(smallestEntry.cacheName);
            if (this.debug) {
                console.log(`Deleting smallest cache entry: ${smallestEntry.request.url}, size: ${smallestEntry.size}`);
            }
            await cache.delete(smallestEntry.request);
            return true;
        }

        if (this.debug) console.log('No cache entries found to delete.');
        return false;
    }


    estimateDataSize(data) {
        if (typeof data === 'string') {
            return new Blob([data]).size;
        } else if (data instanceof Blob || data instanceof ArrayBuffer) {
            return data.size || data.byteLength;
        } else if (typeof data === 'object') {
            const jsonString = JSON.stringify(data);
            return new Blob([jsonString]).size;
        }
        return 0;
    }

    async cleanUpExpiredCache(cacheName, ttl) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        if (this.debug) console.log(`Cleaning up expired cache entries in: ${cacheName}`);
        for (const request of keys) {
            const cachedResponse = await cache.match(request);
            const cachedDate = new Date(cachedResponse.headers.get('sw-cache-date'));
            if (cachedDate < ttl) {
                if (this.debug) console.log(`Deleting expired cache entry: ${request.url}`);
                await cache.delete(request);
            }
        }
    }
}
