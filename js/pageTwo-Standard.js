import { loadImage, SizeAndCenterText, CenterTextInArea } from "./helpers.js";

export async function addPageTwo(formData, doc) {
    doc.addPage();

    const unitImageBasicSrc = formData.unitImageBasic;
    const unitBasicImg = await loadImage(unitImageBasicSrc);
    doc.addImage(unitBasicImg, 'PNG', 16, 17.5, 417.5, 270.5);

    // Load the General's image
    const stdImgSrc = `./Images/Blanks/${formData.unitGeneral}/${formData.unitGeneral}StandardWStatsBlank.png`;
    const stdImg = await loadImage(stdImgSrc);

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Add the Standard's image to the second page
    doc.addImage(stdImg, 'PNG', 0, 0, pageWidth, pageHeight);

    // Set font for the second page
    doc.setFont('impact', 'normal');
    doc.setTextColor(255, 255, 255); // Set text color to white

    SizeAndCenterText(doc, formData.unitName.toUpperCase(), 14, 45, 20, 97, 27, -2, 2);

    doc.setFontSize(10);
    doc.setFont('arial', 'bold');
    const statsX = 413.5;
    doc.text(formData.basicMove.toUpperCase(), statsX, 159.5, { align: 'center' });
    doc.text(formData.basicRange.toUpperCase(), statsX, 183, { align: 'center' });
    doc.text(formData.basicAttack.toUpperCase(), statsX, 206, { align: 'center' });
    doc.text(formData.basicDefense.toUpperCase(), statsX, 229.5, { align: 'center' });

    doc.setFontSize(8);
    var setText = `${formData.set}\r\n${formData.unitNumbers}/${formData.numberOfUnitsInSet}`;
    CenterTextInArea(doc, setText, 261, 206, 76, 84, 0, 6);
}
