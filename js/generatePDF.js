// generatePDF.js
import { callAddFontImpact } from '../fonts/impact-normal.js';
import { callAddFontArialbd } from '../fonts/arial-bold.js';
import { callAddFontArial } from '../fonts/arial-normal.js';
import { addPageOne } from './pageOne.js';
import { addPageTwo } from './pageTwo-Standard.js';

export async function generateStandardIndexPDF(formData) {
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

    try {
        await addPageOne(formData, doc);
        await addPageTwo(formData, doc);

        // Save the PDF
        await savePDF(doc, `Index_${formData.unitName.replace(" ", "_")}.pdf`);
    } catch (error) {
        console.error('Error loading images:', error);
    }
}

function savePDF(doc, filename) {
    return new Promise((resolve, reject) => {
        doc.save(filename, {
            returnPromise: true
        }).then(resolve).catch(reject);
    });
}
