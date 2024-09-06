// scripts: 
//     - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
import { createThumbnail } from './pdfThumb.js';

// scripts: 
//     - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js'
//     - 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
import { downloadAllAsZip } from '../cardMaker/fileHelper.js';

// scripts: 
// - 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'
document.addEventListener('DOMContentLoaded', async () => {
    const cardType = $("#cardType").val();
    const cardsData = await fetchArmyCards(cardType);
    const pdfUrls = cardsData.map(x => x.file_path);

    await Promise.all(pdfUrls.map(async (url) => {
        $('#pdf-gallery').append(await createThumbnail(url));
    }));

    const $checkbox = $('<input>', {
        type: 'checkbox',
        // id: 'checkboxId', // Assign an ID so the label can be associated with the checkbox
        class: 'make-pdf', // Optional: Add any class(es) you need
        checked: false // Optional: Set to true if you want it checked by default
    });
    const $label = $('<label>', {
        // for: 'checkboxId', // Matches the ID of the checkbox to associate the label with it
        text: 'Add to PDF', // The text for the label
        class: 'label-make-pdf' // Optional: Add any class(es) you need
    });
    const $wrapperDiv = $('<div>', {
        class: 'checkbox-wrapper' // Optional: Add any class(es) for the wrapper div
    }).append($checkbox, $label);
    $('#pdf-gallery .thumbnail').prepend($wrapperDiv);

    //Toggle the checkbox if you click anywhere on the element
    $('.thumbnail').on('click', function (event) {
        // Check if the clicked element is not the image
        if (!$(event.target).is('img') && !$(event.target).is('input')) {
            // Find the checkbox within the clicked .thumbnail and toggle its checked state
            const checkbox = $(this).find('.make-pdf');
            checkbox.prop('checked', !checkbox.prop('checked'));
        }
    });

    $('#download').on('click', async function () {
        const pdfUrls = $('.make-pdf:checked').closest('.thumbnail').map(function () { return $(this).attr('data-url'); });
        const cardSize = $(this).attr("data-size");
        if (pdfUrls.length) {
            await mergePDFs(pdfUrls, cardSize);
        } else {
            alert("Please add some PDFs to be downloaded");
        }
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

async function fetchArmyCards(cardType) {
    return await cacheHelper.manageCache('data-cache', `fetchArmyCards-${cardType}`, async () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://dnqjtsaxybwrurmucsaa.supabase.co/rest/v1/army_card_files?file_purpose=eq.${cardType}&order=file_path`,
                method: 'GET',
                headers: {
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucWp0c2F4eWJ3cnVybXVjc2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMzA2ODMsImV4cCI6MjAzODYwNjY4M30.sgt6aQlrLAnPWoTx4LY6qIGu4YYGEoSQJHfz0tzBBwE',
                    'Content-Type': 'application/json'
                }
            })
                .done(data => {
                    data.unshift({
                        army_card_id: 0,
                        created_at: new Date(),
                        file_path: "/assets/CommonAbilities_3x5.pdf",
                        file_purpose: "3x5_Army_Card",
                        id: 0
                    });
                    return resolve(data)
                })
                .fail((jqXHR, textStatus, errorThrown) => reject(new Error(`Request failed: ${textStatus}, ${errorThrown}`)));
        });
    }, new Date(new Date().setDate(new Date().getDate() - 1)));
}

async function mergePDFs(urls, cardSize, debug = false) {
    if (urls.length === 1) {
        if (debug) console.log('Only one PDF provided, downloading it directly...');
        const blob = await cacheHelper.manageCache('pdf-cache', urls[0], async () => {
            const response = await fetch(urls[0]);
            return await response.blob();
        });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = urls[0].split('/').pop();
        link.click();
        return;
    }

    const mergedPdf = await PDFLib.PDFDocument.create();
    const letterSize = [612, 792]; // Letter size in points (8.5 x 11 inches)

    if (debug) console.log('Starting PDF merge process...');

    if (cardSize === "3x5") {
        for (let i = 0; i < urls.length; i += 4) {
            if (debug) console.log(`Processing four PDFs: ${urls.slice(i, i + 4).join(", ")}`);

            const pdfs = [];
            for (let j = 0; j < 4; j++) {
                if (urls[i + j]) {
                    const pdfArrayBuffer = await cacheHelper.manageCacheBinary('pdf-cache', urls[i + j], async () => {
                        return await fetch(urls[i + j]).then(res => res.arrayBuffer());
                    });

                    const pdf = await PDFLib.PDFDocument.load(pdfArrayBuffer);
                    pdfs.push(pdf);
                } else {
                    pdfs.push(null); // Push null if there's no PDF for this slot
                }
            }

            const pages = [];
            for (const pdf of pdfs) {
                if (pdf) {
                    pages.push(await pdf.getPages());
                } else {
                    pages.push([]);
                }
            }

            // Layout on the first page
            const combinedPage1 = mergedPdf.addPage(letterSize);
            const positions1 = [
                { x: letterSize[0] / 2, y: letterSize[1] / 2 }, // Bottom Right corner at center
                { x: letterSize[0] / 2, y: letterSize[1] / 2 }, // Bottom Left corner at center
                { x: letterSize[0] / 2, y: letterSize[1] / 2 }, // Top Right corner at center
                { x: letterSize[0] / 2, y: letterSize[1] / 2 }  // Top Left corner at center
            ];

            for (let j = 0; j < 4; j++) {
                if (pages[j][0]) {
                    const [embeddedPage] = await mergedPdf.embedPages([pages[j][0]]);
                    let drawX = positions1[j].x;
                    let drawY = positions1[j].y;

                    switch (j) {
                        case 0: // Bottom Right
                            drawX -= embeddedPage.width;
                            drawY -= embeddedPage.height;
                            break;
                        case 1: // Bottom Left
                            drawY -= embeddedPage.height;
                            break;
                        case 2: // Top Right
                            drawX -= embeddedPage.width;
                            break;
                        case 3: // Top Left
                            break;
                    }

                    combinedPage1.drawPage(embeddedPage, {
                        x: drawX,
                        y: drawY
                    });
                    if (debug) console.log(`Drew PDF ${j + 1} on the combined page 1.`);
                }
            }

            // Layout on the second page
            const combinedPage2 = mergedPdf.addPage(letterSize);
            const positions2 = [
                { x: letterSize[0] / 2, y: letterSize[1] / 2 }, // Bottom Left corner at center
                { x: letterSize[0] / 2, y: letterSize[1] / 2 }, // Bottom Right corner at center
                { x: letterSize[0] / 2, y: letterSize[1] / 2 }, // Top Left corner at center
                { x: letterSize[0] / 2, y: letterSize[1] / 2 }  // Top Right corner at center
            ];

            for (let j = 0; j < 4; j++) {
                if (pages[j][0]) {
                    const [embeddedPage] = await mergedPdf.embedPages([pages[j][0]]);
                    let drawX = positions2[j].x;
                    let drawY = positions2[j].y;

                    switch (j) {
                        case 0: // Bottom Left
                            drawY -= embeddedPage.height;
                            break;
                        case 1: // Bottom Right
                            drawX -= embeddedPage.width;
                            drawY -= embeddedPage.height;
                            break;
                        case 2: // Top Left
                            break;
                        case 3: // Top Right
                            drawX -= embeddedPage.width;
                            break;
                    }

                    combinedPage2.drawPage(embeddedPage, {
                        x: drawX,
                        y: drawY
                    });
                    if (debug) console.log(`Drew PDF ${j + 1} on the combined page 2.`);
                }
            }
        }
    } else {
        // Handle the 4x6 or Standard card size logic (existing logic)
        for (let i = 0; i < urls.length; i += 2) {
            if (debug) console.log(`Processing pair: ${urls[i]} and ${urls[i + 1] ? urls[i + 1] : 'N/A'}`);
            const pdfArrayBuffer1 = await cacheHelper.manageCacheBinary('pdf-cache', urls[i], async () => {
                return await fetch(urls[i]).then(res => res.arrayBuffer());
            });
            const pdfArrayBuffer2 = await cacheHelper.manageCacheBinary('pdf-cache', urls[i + 1], async () => {
                return await fetch(urls[i + 1]).then(res => res.arrayBuffer());
            });

            const pdf1 = await PDFLib.PDFDocument.load(pdfArrayBuffer1);
            const pdf2 = i + 1 < urls.length ? await PDFLib.PDFDocument.load(pdfArrayBuffer2) : null;

            const pages1 = await pdf1.getPages();
            const pages2 = pdf2 ? await pdf2.getPages() : [];

            if (debug) console.log(`PDF 1 has ${pages1.length} pages.`);
            if (pdf2 && debug) {
                console.log(`PDF 2 has ${pages2.length} pages.`);
            }

            for (let j = 0; j < Math.max(pages1.length, pages2.length); j++) {
                const combinedPage = mergedPdf.addPage(letterSize);
                if (debug) console.log('Created a new combined page.');

                let embeddedPage1 = null;
                let embeddedPage2 = null;

                if (pages1[j]) {
                    if (debug) console.log('Embedding page from PDF 1...');
                    [embeddedPage1] = await mergedPdf.embedPages([pages1[j]]);
                    if (debug) console.log('Embedded page from PDF 1:', embeddedPage1);
                } else if (debug) {
                    console.log('No page available from PDF 1 for this iteration.');
                }

                if (pages2[j]) {
                    if (debug) console.log('Embedding page from PDF 2...');
                    [embeddedPage2] = await mergedPdf.embedPages([pages2[j]]);
                    if (debug) console.log('Embedded page from PDF 2:', embeddedPage2);
                } else if (debug) {
                    console.log('No page available from PDF 2 for this iteration.');
                }

                if (embeddedPage1 && embeddedPage2) {
                    const combinedHeight = embeddedPage1.height + embeddedPage2.height;
                    const startY = (letterSize[1] - combinedHeight) / 2;

                    combinedPage.drawPage(embeddedPage1, {
                        x: (letterSize[0] - embeddedPage1.width) / 2,
                        y: startY + embeddedPage2.height,
                    });
                    if (debug) console.log('Drew embedded page from PDF 1 onto the combined page.');

                    combinedPage.drawPage(embeddedPage2, {
                        x: (letterSize[0] - embeddedPage2.width) / 2,
                        y: startY,
                    });
                    if (debug) console.log('Drew embedded page from PDF 2 onto the combined page.');
                } else if (embeddedPage1) {
                    combinedPage.drawPage(embeddedPage1, {
                        x: (letterSize[0] - embeddedPage1.width) / 2,
                        y: (letterSize[1] - embeddedPage1.height) / 2,
                    });
                    if (debug) console.log('Drew embedded page from PDF 1 onto the combined page.');
                } else if (embeddedPage2) {
                    combinedPage.drawPage(embeddedPage2, {
                        x: (letterSize[0] - embeddedPage2.width) / 2,
                        y: (letterSize[1] - embeddedPage2.height) / 2,
                    });
                    if (debug) console.log('Drew embedded page from PDF 2 onto the combined page.');
                }
            }
        }
    }

    if (debug) console.log('Saving merged PDF...');
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `HerscapeBuilder.com-${cardSize}.pdf`;
    link.click();
    if (debug) console.log('PDF merge process completed.');
}