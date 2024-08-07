// generatePDF.js
import { callAddFontImpact } from '../fonts/impact-normal.js';
import { callAddFontArialbd } from '../fonts/arial-bold.js';
import { callAddFontArial } from '../fonts/arial-normal.js';
import { addPageOne4x6 } from './4x6/pageOne.js';
import { addPageTwo4x6 } from './4x6/pageTwo.js';
import { addPageOne3x5 } from './3x5/pageOne.js';
import { addPageTwo3x5 } from './3x5/pageTwo.js';
import { addPageOneStandard } from './standard/pageOne.js';
import { addPageTwoStandard } from './standard/pageTwo.js';

export async function generateIndexCard(doc, formData, size = "4x6") {
    try {
        if (size == "4x6") {
            await addPageOne4x6(formData, doc);
            await addPageTwo4x6(formData, doc);
        } else if (size == "3x5") {
            await addPageOne3x5(formData, doc);
            await addPageTwo3x5(formData, doc);
        } else if (size == "Standard") {
            await addPageOneStandard(formData, doc);
            await addPageTwoStandard(formData, doc);
        }
        return doc;
    } catch (error) {
        console.error(`Error generating PDF for ${formData.unitName}`, error);
        throw error;
    }
}

export function initializePDF(size = "4x6") {
    const { jsPDF } = window.jspdf;

    var doc;
    if (size == "4x6") {
        // Define custom page size
        const pageWidth = 6.25 * 72; // 1 inch = 72 points, 450
        const pageHeight = 4.25 * 72; //306

        doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: [pageWidth, pageHeight] // Set custom page size
        });
    } else if (size == "3x5") {
        // Define custom page size
        const pageWidth = 3.25 * 72; // 1 inch = 72 points
        const pageHeight = 5.25 * 72;

        doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [pageWidth, pageHeight] // Set custom page size
        });
    } else if (size == "Standard") {
        const pageWidth = 128 * 2.83465; //mm to points
        const pageHeight = 121.5 * 2.83465; //mm to points

        doc = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: [pageWidth, pageHeight] // Set custom page size
        });
    }

    // Call the function to register the font
    callAddFontImpact.call(doc);
    callAddFontArial.call(doc);
    callAddFontArialbd.call(doc);

    return doc;
}

export function savePDF(doc, filename) {
    return new Promise((resolve, reject) => {
        try {
            // Get the PDF as a Blob
            const pdfBlob = doc.output('blob');
            // Create a download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = filename;
            // Append the link to the document
            document.body.appendChild(link);
            // Programmatically click the link to trigger the download
            link.click();
            // Clean up
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
            resolve();
        } catch (e) {
            var message = `Error saving file ${filename}`;
            console.error(message, e);
            reject(error);
        }
    });
}

export async function mergePDFs(pdfBlobs) {
    const { PDFDocument } = PDFLib;
    const mergedPdf = await PDFDocument.create();

    for (const pdfBlob of pdfBlobs) {
        const pdf = await PDFDocument.load(await pdfBlob.arrayBuffer());
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    return mergedPdfBytes;
}

export function saveMergedPDF(pdfBytes, filename) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}