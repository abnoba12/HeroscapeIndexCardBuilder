// scripts: 
//     - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
//     - '/assets/js/upup/upup.min.js'
import { createThumbnail } from './pdfThumb.js';

// scripts: 
//     - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js'
//     - 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
import { downloadAllAsZip } from '../cardMaker/fileHelper.js';

// scripts: 
//     - '/assets/js/upup/upup.min.js'
document.addEventListener('DOMContentLoaded', async () => {
    const cardType = $("#cardType").val();
    const cardsData = await fetchArmyCards(cardType);
    const pdfUrls = cardsData.map(x => x.file_path);

    //    - '/assets/js/upup/upup.min.js'
    UpUp.start({
        'cache-version': 'v1',
        'resources': pdfUrls,
        'service-worker-url': '/assets/js/upup/upup.sw.min.js'
    });

    await Promise.all(pdfUrls.map(async (url) => {
        $('#pdf-gallery').append(await createThumbnail(url));
    }));

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

function fetchArmyCards(cardType) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://dnqjtsaxybwrurmucsaa.supabase.co/rest/v1/army_card_files?file_purpose=eq.${cardType}&order=file_path`,
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucWp0c2F4eWJ3cnVybXVjc2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMzA2ODMsImV4cCI6MjAzODYwNjY4M30.sgt6aQlrLAnPWoTx4LY6qIGu4YYGEoSQJHfz0tzBBwE',
                'Content-Type': 'application/json'
            }
        })
            .done(data => resolve(data))
            .fail((jqXHR, textStatus, errorThrown) => reject(new Error(`Request failed: ${textStatus}, ${errorThrown}`)));
    });
}
