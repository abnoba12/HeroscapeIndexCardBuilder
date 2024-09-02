import { SizeAndCenterText, CenterTextInArea } from "../textHelper.js";
import { loadImage, getSizeToMax } from "../imageHelper.js";

export async function addPageTwo4x6(formData, doc) {
    doc.addPage();

    const drawOutlines = false;
    if (drawOutlines) {
        doc.setLineWidth(1);
        doc.setDrawColor(0, 0, 255);
    }

    var whiteRGB = [255, 255, 255];
    var blackRGB = [0, 0, 0];

    const unitImageBasicSrc = formData.unitImageBasic;
    const unitBasicImg = await loadImage(unitImageBasicSrc);
    doc.addImage(unitBasicImg, 'PNG', 16, 17.5, 417.5, 271);

    // Load the General's image
    const stdImgSrc = `https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/${formData.unitGeneral}/${formData.unitGeneral}Back_4x6.png`;
    const stdImg = await loadImage(stdImgSrc);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add the Standard's image to the second page
    doc.addImage(stdImg, 'PNG', 0, 0, pageWidth, pageHeight);

    // Set font for the second page
    doc.setFont('impact', 'normal');
    doc.setTextColor(...whiteRGB); // Set text color to white

    SizeAndCenterText(doc, formData.unitName.toUpperCase(), 14, 45, 20, 97, 27, -2, 2, drawOutlines);



    var statsX = 385;
    var statsY = 136.5
    var statsXGap = 27.5;
    var statsYGap = 23.25;

    if (formData.unitGeneral == "Revna") {
        statsY = 150
        statsYGap = 19.25;
    }

    doc.setFontSize(10);
    doc.setFont('arial', 'bold');
    doc.text(formData.basicMove?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 1), { align: 'center' });
    doc.text(formData.basicRange?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 2), { align: 'center' });
    doc.text(formData.basicAttack?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 3), { align: 'center' });
    doc.text(formData.basicDefense?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 4), { align: 'center' });

    if (formData.creator) {
        // Load the hitbox image
        var creatorImgSrc = `/cardGenerator/assets/images/logos/${formData.creator}.png`;
        const creatorImg = await loadImage(creatorImgSrc);

        const creatorImgMaxWidth = 76;
        const creatorImgMaxHeight = 12;
        var size = getSizeToMax(creatorImgMaxWidth, creatorImgMaxHeight, creatorImg);

        const creatorX = 261;
        const creatorY = 212;
        const padcreatorX = size?.wPadding ? creatorX + size.wPadding : creatorX;
        const padcreatorY = size?.hPadding ? creatorY + size.hPadding : creatorY;

        if (drawOutlines) doc.rect(padcreatorX, padcreatorY, size.width, size.height);

        // Add the new image to the first page                    
        doc.addImage(creatorImg, 'PNG', padcreatorX, padcreatorY, size.width, size.height);
    }

    doc.setFontSize(8);
    var setText = `${formData.set}\r\n${formData.unitNumbers} of ${formData.numberOfUnitsInSet}`;
    CenterTextInArea(doc, setText, 261, 224, 76, 58, 0, 6, drawOutlines);
}
