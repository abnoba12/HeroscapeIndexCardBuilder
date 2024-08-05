export function createThumbnail(pdfUrl, index, thumbScale = 0.75) {
    // Create a div for the thumbnail
    const thumbnailDiv = document.createElement('div');
    thumbnailDiv.className = 'thumbnail';
    thumbnailDiv.setAttribute('data-url', pdfUrl);

    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'pdf-thumbnail-' + index;
    thumbnailDiv.appendChild(canvas);

    // Create a paragraph for the filename
    const filename = document.createElement('p');
    filename.textContent = pdfUrl.split('/').pop();
    thumbnailDiv.appendChild(filename);

    // Add event listener for downloading PDF on click
    thumbnailDiv.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfUrl.split('/').pop();
        link.click();
    });

    // Add the thumbnail to the gallery
    document.getElementById('pdf-gallery').appendChild(thumbnailDiv);

    // Asynchronous download of PDF
    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
        // Fetch the first page
        pdf.getPage(1).then(page => {
            const scale = thumbScale;  // Adjust the scale for thumbnail size
            const viewport = page.getViewport({ scale: scale });

            // Get the canvas context
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Render the page on the canvas
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
}