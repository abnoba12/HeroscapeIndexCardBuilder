import { SizeAndCenterText, CenterTextInArea } from "../textHelper.js";
import { loadImage, getSizeToMax } from "../imageHelper.js";

export async function addPageTwoStandard(formData, doc, GlobalAdjustX = 0, GlobalAdjustY = 0, GlobalYGapAdjust = 0) {
    doc.addPage();

    const drawOutlines = false;
    if (drawOutlines) {
        doc.setLineWidth(1);
        doc.setDrawColor(0, 0, 255);
    }

    var whiteRGB = [211, 212, 205];
    var blackRGB = [33, 35, 32];

    const unitImageBasicSrc = formData.unitImageBasic;
    const unitBasicImg = await loadImage(unitImageBasicSrc);
    doc.addImage(unitBasicImg, 'PNG', 15 + GlobalAdjustX, 35 + GlobalAdjustY, 334, 242);

    // Load the General's image
    const stdImgSrc = `/cardGenerator/assets/images/blanks/${formData.unitGeneral}/${formData.unitGeneral}Back_EW.png`;
    const stdImg = await loadImage(stdImgSrc);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add the Standard's image to the second page
    doc.addImage(stdImg, 'PNG', 0, 0, pageWidth, pageHeight);

    // Set font for the second page
    doc.setFont('impact', 'normal');
    doc.setTextColor(...whiteRGB); // Set text color to white

    SizeAndCenterText(doc, formData.unitName?.toUpperCase(), 14, 84 + GlobalAdjustX, 51 + GlobalAdjustY, 72, 24, -2, 2, drawOutlines);

    const statsX = 233 + GlobalAdjustX;
    const statsY = 178 + GlobalAdjustY;
    const statsXGap = 29;
    const statsYGap = 23.5 + GlobalYGapAdjust;
    doc.setFontSize(8);
    doc.setFont('arial', 'bold');
    doc.text(formData.basicMove?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 1), { align: 'center' });
    doc.text(formData.basicRange?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 2), { align: 'center' });
    doc.text(formData.basicAttack?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 3), { align: 'center' });
    doc.text(formData.basicDefense?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 4), { align: 'center' });

    doc.setTextColor(...blackRGB); // Set text color to black
    if (formData.creator) {
        var creatorImgSrc = `/cardGenerator/assets/images/logos/${formData.creator}_dark.png`;
        const creatorImg = await loadImage(creatorImgSrc);

        const creatorImgMaxWidth = 76;
        const creatorImgMaxHeight = 8;
        var size = getSizeToMax(creatorImgMaxWidth, creatorImgMaxHeight, creatorImg);

        const creatorX = 37 + GlobalAdjustX;
        const creatorY = 359.5 + GlobalAdjustY;
        const padcreatorX = size?.wPadding ? creatorX + size.wPadding : creatorX;
        const padcreatorY = size?.hPadding ? creatorY + size.hPadding : creatorY;

        if (drawOutlines) doc.rect(padcreatorX, padcreatorY, size.width, size.height);

        // Add the new image to the first page                    
        // doc.addImage(creatorImg, 'PNG', padcreatorX, padcreatorY, size.width, size.height);

        const imgWidth = size.width;
        const imgHeight = size.height;
        const angle = 30; // Rotation angle in degrees

        // Convert degrees to radians
        const radians = angle * Math.PI / 180;

        // Calculate the transform matrix for rotation
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        // Save the current graphics state
        doc.saveGraphicsState();

        // Move the origin to the center of the image
        doc.internal.write(`q`);
        doc.internal.write(`${cos} ${sin} ${-sin} ${cos} ${padcreatorX} ${padcreatorY} cm`);
        doc.internal.write(`1 0 0 1 ${-padcreatorX} ${-padcreatorY} cm`);

        // Draw the image at the new transformed position
        doc.addImage(creatorImg, 'PNG', padcreatorX, padcreatorY, imgWidth, imgHeight);

        // Restore the original graphics state
        doc.internal.write('Q');
    }

    doc.setFontSize(6);
    var setText = `${formData.set}\r\n${formData.unitNumbers} of ${formData.numberOfUnitsInSet}`;
    CenterTextInArea(doc, setText, 80, 240 + GlobalAdjustX, 80 + GlobalAdjustY, 65, 0, 6, drawOutlines);
}
