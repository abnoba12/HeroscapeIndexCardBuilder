import { setAWS, saveFileToS3 } from '../cardMaker/fileHelper.js'

// scripts: 
//     - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
//     - '/assets/js/upup/upup.min.js'

const urlParams = new URLSearchParams(window.location.search);

export function createThumbnail(pdfUrl, s3, bucketName, showName = true, thumbScale = 0.75) {
    return new Promise(async (resolve, reject) => {
        try {
            const thumbnailId = `pdf-thumbnail-${pdfUrl.split('/').pop().split('.')[0]}`;
            const thumbnailFileName = `${thumbnailId}.png`.replace(/\s+/g, "_");
            const cacheKey = `thumbnail-cache-${thumbnailFileName}`;

            // Supabase Storage URL
            const thumbnailUrl = `https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/Thumbs/pdf_thumbs/${thumbnailFileName}`;

            // Create a div for the thumbnail
            const $thumbnailDiv = $('<div>', {
                class: 'thumbnail col-md-3',
                'data-url': pdfUrl
            });

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
            const cache = await caches.open('thumbnail-cache');
            const cachedResponse = await cache.match(cacheKey);
            if (cachedResponse) {
                // If cached, use the cached PNG
                const cacheBlob = await cachedResponse.blob();
                const url = URL.createObjectURL(cacheBlob);
                const $img = $('<img>', {
                    src: url,
                    alt: 'PDF Thumbnail',
                    class: `img-fluid ${thumbnailId.replace(/[^a-zA-Z0-9\-_]/g, '')}`
                });
                $thumbnailDiv.prepend($img);
                return resolve($thumbnailDiv);
            }

            // Check if the thumbnail already exists in Supabase Storage
            fetch(thumbnailUrl)
                .then(response => {
                    if (response.ok) {
                        // Thumbnail exists, load it
                        const $img = $('<img>', {
                            src: thumbnailUrl,
                            alt: 'PDF Thumbnail',
                            class: `img-fluid ${thumbnailId.replace(/[^a-zA-Z0-9\-_]/g, '')}`
                        });
                        $thumbnailDiv.prepend($img);
                        return response.blob();
                    } else {
                        // Thumbnail doesn't exist, generate and upload it
                        console.log(`${thumbnailFileName} not found in storage, generating thumbnail...`);

                        // Load the PDF and generate the thumbnail using pdfjsLib
                        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
                        return pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
                            return pdf.getPage(1).then(page => {
                                const viewport = page.getViewport({ scale: thumbScale });

                                // Create a canvas element and set its size to the viewport's size
                                const canvas = document.createElement('canvas');
                                canvas.width = viewport.width;
                                canvas.height = viewport.height;
                                const context = canvas.getContext('2d');

                                const renderContext = {
                                    canvasContext: context,
                                    viewport: viewport
                                };

                                // Render the PDF page on the canvas
                                return page.render(renderContext).promise.then(() => {
                                    // Convert canvas to PNG blob
                                    return new Promise((resolveCanvasBlob) => {
                                        canvas.toBlob(blob => {
                                            resolveCanvasBlob(blob);

                                            // Cache the PNG
                                            cache.put(cacheKey, new Response(blob));

                                            // Upload the thumbnail to Supabase Storage
                                            const fileInput = {
                                                files: [new File([blob], thumbnailFileName, { type: 'image/png' })]
                                            };

                                            var k = urlParams.get('k');
                                            var s = urlParams.get('s');
                                            if (k && s) {
                                                const s3 = setAWS(k, s);
                                                saveFileToS3(s3, fileInput, "Thumbs/pdf_thumbs")
                                                    .then(fileUrl => {
                                                        // Create an image element with the uploaded file URL
                                                        const $img = $('<img>', {
                                                            src: fileUrl,
                                                            alt: 'PDF Thumbnail',
                                                            class: `img-fluid ${thumbnailId.replace(/[^a-zA-Z0-9\-_]/g, '')}`
                                                        });

                                                        // Add the image to the thumbnail div
                                                        $thumbnailDiv.prepend($img);
                                                        return response.blob();
                                                    })
                                                    .catch(uploadError => {
                                                        console.error('Error uploading thumbnail to Supabase:', uploadError);
                                                        reject(uploadError);
                                                    });
                                            } else {
                                                const url = URL.createObjectURL(blob);
                                                const $img = $('<img>', {
                                                    src: url,
                                                    alt: 'PDF Thumbnail',
                                                    class: `img-fluid ${thumbnailId.replace(/[^a-zA-Z0-9\-_]/g, '')}`
                                                });

                                                // Replace the canvas with the image
                                                $thumbnailDiv.prepend($img);
                                                return response.blob();
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    }
                })
                .then(blob => {
                    // Cache the blob if not already cached (for Supabase images)
                    cache.put(cacheKey, new Response(blob));
                    resolve($thumbnailDiv);
                })
                .catch(fetchError => {
                    console.error('Error checking Supabase Storage:', fetchError);
                    reject(fetchError);
                });
        } catch (e) {
            reject(e);
        }
    });
}
