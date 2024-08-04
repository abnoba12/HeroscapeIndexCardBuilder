import { SizeAndCenterText, CenterTextInArea } from "../helpers.js";
import { loadImage, getSizeToMax } from "../imageHelper.js";

export async function addPageTwo3x5(formData, doc) {
    doc.addPage();

    const drawOutlines = false;
    if (drawOutlines) {
        doc.setLineWidth(1);
        doc.setDrawColor(0, 0, 255);
    }

    const unitImageAdvancedSrc = formData.unitImageAdvanced;
    const unitAdvanceImg = await loadImage(unitImageAdvancedSrc);
    doc.addImage(unitAdvanceImg, 'PNG', 8, 148, 217, 217);

    // Load the General's image
    const stdImgSrc = `./Images/Blanks/${formData.unitGeneral}/${formData.unitGeneral}Back_3x5.png`;
    const stdImg = await loadImage(stdImgSrc);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add the Standard's image to the second page
    doc.addImage(stdImg, 'PNG', 0, 0, pageWidth, pageHeight);

    // Set font for the first page
    doc.setFont('impact', 'normal');
    doc.setTextColor(255, 255, 255); // Set text color to white

    SizeAndCenterText(doc, formData.unitName?.toUpperCase(), 20, 42, 18, 120, 40, -3, 2, drawOutlines);

    const statsX = 193;
    const statsY = 42.5
    const statsXGap = 8.5;
    const statsYGap = 16.65;
    doc.setFontSize(8);
    doc.setFont('arial', 'bold');
    doc.text(formData.basicMove?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 1), { align: 'center' });
    doc.text(formData.basicRange?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 2), { align: 'center' });
    doc.text(formData.basicAttack?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 3), { align: 'center' });
    doc.text(formData.basicDefense?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 4), { align: 'center' });

    if (drawOutlines) doc.rect(statsX, statsY, 1, 100);

    if (formData.creator) {
        // Load the hitbox image
        var creatorImgSrc = `./Images/logos/${formData.creator}.png`;
        const creatorImg = await loadImage(creatorImgSrc);

        const creatorImgMaxWidth = 153;
        const creatorImgMaxHeight = 12;
        var size = getSizeToMax(creatorImgMaxWidth, creatorImgMaxHeight, creatorImg);

        const creatorX = 16;
        const creatorY = 83;
        const padcreatorX = size?.wPadding ? creatorX + size.wPadding : creatorX;
        const padcreatorY = size?.hPadding ? creatorY + size.hPadding : creatorY;

        if (drawOutlines) doc.rect(padcreatorX, padcreatorY, size.width, size.height);

        // Add the new image to the first page                    
        doc.addImage(creatorImg, 'PNG', padcreatorX, padcreatorY, size.width, size.height);
    }

    doc.setFontSize(8);
    var setText = `${formData.set}\r\n${formData.unitNumbers} of ${formData.numberOfUnitsInSet}`;
    CenterTextInArea(doc, setText, 16, 98, 153, 34, 0, 6, drawOutlines);
}
