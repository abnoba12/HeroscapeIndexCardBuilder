// generatePDF.js
import { callAddFontImpact } from '../fonts/impact-normal.js';
import { callAddFontArialbd } from '../fonts/arial-bold.js';
import { callAddFontArial } from '../fonts/arial-normal.js';
import { addPageOne } from './pageOne.js';
import { addPageTwo } from './pageTwo-Standard.js';

export async function generateIndexCard(doc, formData) {
    try {
        await addPageOne(formData, doc);
        await addPageTwo(formData, doc);
        return doc;
    } catch (error) {
        console.error(`Error generating PDF for ${formData.unitName}`, error);
        throw error;
    }
}

export function initializePDF() {
    const { jsPDF } = window.jspdf;

    // Define custom page size
    const pageWidth = 6.25 * 72; // 1 inch = 72 points
    const pageHeight = 4.25 * 72;

    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [pageWidth, pageHeight] // Set custom page size
    });

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