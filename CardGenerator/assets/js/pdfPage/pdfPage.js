import { createThumbnail } from './pdfThumb.js';
import { downloadAllAsZip } from '../cardMaker/fileHelper.js';
import { cachePDFs } from '../../../../assets/js/cachePDFs.js'

// Array of PDF URLs
const pdfUrls = $('#pdfList li a').map(function () { return $(this).attr('href'); }).get();

cachePDFs(pdfUrls);

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
