export function createThumbnail(pdfUrl, index, thumbScale = 0.75) {
    // Create a div for the thumbnail
    const $thumbnailDiv = $('<div>', {
        class: 'thumbnail col-md-3',
        'data-url': pdfUrl
    });

    // Create a canvas element
    const $canvas = $('<canvas>', {
        id: 'pdf-thumbnail-' + index
    });
    $thumbnailDiv.append($canvas);

    // Create a paragraph for the filename
    const $filename = $('<p>').text(decodeURI(pdfUrl.split('/').pop()));
    $thumbnailDiv.append($filename);

    // Add event listener for downloading PDF on click
    $thumbnailDiv.on('click', function () {
        const link = $('<a>', {
            href: pdfUrl,
            download: pdfUrl.split('/').pop()
        }).appendTo('body');
        link[0].click();
        link.remove();
    });

    // Add the thumbnail to the gallery
    $('#pdf-gallery').append($thumbnailDiv);

    // Asynchronous download of PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        // Fetch the first page
        pdf.getPage(1).then(page => {
            const scale = thumbScale;  // Adjust the scale for thumbnail size
            const viewport = page.getViewport({ scale: scale });

            // Get the canvas context
            const context = $canvas[0].getContext('2d');
            $canvas.attr({
                width: viewport.width,
                height: viewport.height
            });

            // Render the page on the canvas
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
}
