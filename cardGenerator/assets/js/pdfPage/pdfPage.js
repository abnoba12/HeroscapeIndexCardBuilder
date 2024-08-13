import { createThumbnail } from './pdfThumb.js';
import { downloadAllAsZip } from '../cardMaker/fileHelper.js';

document.addEventListener('DOMContentLoaded', () => {
    // Array of PDF URLs
    const pdfUrls = $('#pdfList li a').map(function () { return $(this).attr('href'); }).get();

    //    - '/assets/js/upup/upup.min.js'
    UpUp.start({
        'cache-version': 'v1',
        'resources': pdfUrls,
        'service-worker-url': '/assets/js/upup/upup.sw.min.js'
    });

    // Create thumbnails for each PDF URL
    pdfUrls.forEach((pdfUrl, index) => {
        createThumbnail(pdfUrl, index);
    });

    // Add event listener to the "Download All" button
    $('#download-all').on('click', function () {
        var $spinner = $('#spinner');
        $spinner.css('display', 'inline-block');

        var title = $('#subSectionTitle').html().replaceAll(' ', '_');

        downloadAllAsZip(pdfUrls, `${title ? title : 'ArmyCards'}.zip`).finally(function () {
            $spinner.css('display', 'none');
        });
    });

});
