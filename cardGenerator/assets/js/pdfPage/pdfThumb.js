// scripts: 
//     - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
//     - '/assets/js/upup/upup.min.js'

export function createThumbnail(pdfUrl, showName = true, thumbScale = 0.75) {
    return new Promise((resolve, reject) => {
        try {
            const thumbnailId = `pdf-thumbnail-${pdfUrl.split('/').pop().split('.')[0]}`;
            const cacheKey = `thumbnail-cache-${thumbnailId}`;

            // Create a div for the thumbnail
            const $thumbnailDiv = $('<div>', {
                class: 'thumbnail col-md-3',
                'data-url': pdfUrl
            });

            // Create a canvas element
            const $canvas = $('<canvas>', {
                id: thumbnailId
            }).hide(); // Hide the canvas, we'll show the image instead
            $thumbnailDiv.append($canvas);

            if (showName) {
                // Create a paragraph for the filename
                const $filename = $('<p>').text(decodeURI(pdfUrl.split('/').pop()));
                $thumbnailDiv.append($filename);
            }

            // Add event listener for downloading PDF on click
            $thumbnailDiv.on('click', function () {
                const link = $('<a>', {
                    href: pdfUrl,
                    download: pdfUrl.split('/').pop()
                }).appendTo('body');
                link[0].click();
                link.remove();
            });

            // Check if the thumbnail is cached
            caches.open('thumbnail-cache').then(cache => {
                cache.match(cacheKey).then(response => {
                    if (response) {
                        // If cached, use the cached PNG
                        response.blob().then(blob => {
                            const url = URL.createObjectURL(blob);
                            const $img = $('<img>', {
                                src: url,
                                alt: 'PDF Thumbnail',
                                class: `img-fluid ${thumbnailId.replace(/[^a-zA-Z0-9\-_]/g, '')}`
                            });
                            $thumbnailDiv.prepend($img);
                            resolve($thumbnailDiv);
                        });
                    } else {
                        console.log(`${cacheKey} is not cached`)
                        // If not cached, generate the thumbnail
                        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
                        pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
                            pdf.getPage(1).then(page => {
                                const scale = thumbScale;
                                const viewport = page.getViewport({ scale: scale });
                                const context = $canvas[0].getContext('2d');
                                $canvas.attr({
                                    width: viewport.width,
                                    height: viewport.height
                                });

                                const renderContext = {
                                    canvasContext: context,
                                    viewport: viewport
                                };

                                page.render(renderContext).promise.then(() => {
                                    // Convert canvas to PNG
                                    $canvas[0].toBlob(blob => {
                                        // Cache the PNG
                                        cache.put(cacheKey, new Response(blob));

                                        // Create an image from the canvas
                                        const url = URL.createObjectURL(blob);
                                        const $img = $('<img>', {
                                            src: url,
                                            alt: 'PDF Thumbnail',
                                            class: `img-fluid ${thumbnailId.replace(/[^a-zA-Z0-9\-_]/g, '')}`
                                        });

                                        // Replace the canvas with the image
                                        $thumbnailDiv.prepend($img);
                                        $canvas.remove();
                                        resolve($thumbnailDiv);
                                    });
                                });
                            });
                        });
                    }
                });
            });
        } catch (e) {
            reject(e);
        }
    });
}
