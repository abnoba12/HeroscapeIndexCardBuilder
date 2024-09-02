import { setAWS, saveFileToS3 } from '../cardMaker/fileHelper.js'

// scripts: 
//     - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'

const urlParams = new URLSearchParams(window.location.search);

export function createThumbnail(pdfUrl, showName = true, thumbScale = 1) {
    return new Promise(async (resolve, reject) => {
        try {
            const thumbnailId = `pdf-thumbnail-${pdfUrl.split('/').pop().split('.')[0]}`;
            const thumbnailFileName = `${thumbnailId}.png`.replace(/\s+/g, "_");
            const cacheKey = `thumbnail-cache-${thumbnailFileName}`;

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
            $thumbnailDiv.on('click', 'img', function () {
                const link = $('<a>', {
                    href: pdfUrl,
                    target: '_blank',
                    download: pdfUrl.split('/').pop()
                }).appendTo('body');
                link[0].click();
                link.remove();
            });

            const thumbnailUrl = `https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/Thumbs/pdf_thumbs/${thumbnailFileName}`;
            var thumbImg = await cacheHelper.manageCacheImage('thumbnail-cache', thumbnailUrl);

            //The image doesn't exist so save it and try to cache it again.
            if (!thumbImg) {
                var url = await fetchThumbs(thumbnailFileName, pdfUrl, thumbScale)
                thumbImg = await cacheHelper.manageCacheImage('thumbnail-cache', url);
            }

            if (thumbImg) {
                // Thumbnail exists, load it
                const $img = $('<img>', {
                    src: thumbImg,
                    alt: 'PDF Thumbnail',
                    class: `img-fluid ${thumbnailFileName}`
                });
                $thumbnailDiv.prepend($img);
                return resolve($thumbnailDiv);
            } else {
                reject("unable to generate thumbnail image");
            }

        } catch (e) {
            reject(e);
        }
    });
}

async function fetchThumbs(thumbnailFileName, pdfUrl, thumbScale) {
    return new Promise(async (resolve, reject) => {
        // Supabase Storage URL
        const thumbnailUrl = `https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/Thumbs/pdf_thumbs/${thumbnailFileName}`;

        try {
            // Check if the thumbnail already exists in Supabase Storage
            var response = await fetch(thumbnailUrl);
            if (response.ok) {
                // Thumbnail exists, load it
                return resolve(thumbnailUrl);
            } else {
                // Thumbnail doesn't exist, generate and upload it
                console.log(`${thumbnailFileName} not found in storage, generating thumbnail...`);

                // Load the PDF and generate the thumbnail using pdfjsLib
                pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
                var pdf = await pdfjsLib.getDocument(pdfUrl).promise;
                var page = await pdf.getPage(1);
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
                await page.render(renderContext).promise;
                // Convert canvas to PNG blob
                return new Promise((resolveCanvasBlob) => {
                    canvas.toBlob(async blob => {
                        resolveCanvasBlob(blob);

                        // Upload the thumbnail to Supabase Storage
                        const fileInput = {
                            files: [new File([blob], thumbnailFileName, { type: 'image/png' })]
                        };

                        var k = urlParams.get('k');
                        var s = urlParams.get('s');
                        if (k && s) {
                            try {
                                return resolve(await saveFileToS3(setAWS(k, s), fileInput, "Thumbs/pdf_thumbs"));
                            } catch (uploadError) {
                                console.error('Error uploading thumbnail to Supabase:', uploadError);
                                throw uploadError;
                            };
                        } else {
                            return resolve(URL.createObjectURL(blob));
                        }
                    });
                });
            }
        }
        catch (fetchError) {
            console.error('Error checking Supabase Storage:', fetchError);
            return reject(fetchError);
        }
    });
}