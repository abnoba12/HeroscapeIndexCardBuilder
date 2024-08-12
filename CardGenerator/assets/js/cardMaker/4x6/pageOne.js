import { SizeAndCenterText, SizeAndCenterAbilities } from "../textHelper.js";
import { loadImage, getSizeToMax } from "../imageHelper.js";

export async function addPageOne4x6(formData, doc) {
    try {
        if (doc.getNumberOfPages() != 1) {
            doc.addPage();
        }

        const debug = false;
        if (debug) {
            doc.setLineWidth(1);
            doc.setDrawColor(0, 0, 255);
        }

        var whiteRGB = [255, 255, 255];
        var blackRGB = [0, 0, 0];

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const unitImageAdvancedSrc = formData.unitImageAdvanced;
        const unitAdvanceImg = await loadImage(unitImageAdvancedSrc);
        doc.addImage(unitAdvanceImg, 'PNG', 259, 17, 174.5, 177.5);

        // Load the General's image
        const generalImgSrc = `/cardGenerator/assets/images/blanks/${formData.unitGeneral}/${formData.unitGeneral}Front_4x6.png`;
        const generalImg = await loadImage(generalImgSrc);

        // Add the General's image to the first page
        doc.addImage(generalImg, 'PNG', 0, 0, pageWidth, pageHeight);

        // Set font for the first page
        doc.setFont('impact', 'normal');
        doc.setTextColor(...whiteRGB); // Set text color to white

        SizeAndCenterText(doc, formData.unitName?.toUpperCase(), 14, 45, 20, 97, 27, -2, 2, debug);

        if (debug) doc.rect(45, 20, 97, 27);

        SizeAndCenterText(doc, formData.unitRace?.toUpperCase(), 6.75, 47.5, 52.5, 46, 12, -1.5, 0, debug);
        SizeAndCenterText(doc, formData.unitRole?.toUpperCase(), 6.75, 98.5, 52.5, 46, 12, -1.5, 0, debug);
        SizeAndCenterText(doc, formData.unitPersonality?.toUpperCase(), 6.75, 47.5, 68.5, 46, 12, -1.5, 0, debug);
        SizeAndCenterText(doc, formData.unitPlanet?.toUpperCase(), 6.75, 98.5, 68.5, 46, 12, -1.5, 0, debug);

        doc.setFontSize(14);
        doc.setFont('arial', 'bold');
        doc.text(formData.life?.toUpperCase(), 386, 136, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont('arial', 'bold');
        const statsX = 413.5;
        doc.text(formData.advancedMove?.toUpperCase(), statsX, 160, { align: 'center' });
        doc.text(formData.advancedRange?.toUpperCase(), statsX, 183, { align: 'center' });
        doc.text(formData.advancedAttack?.toUpperCase(), statsX, 206, { align: 'center' });
        doc.text(formData.advancedDefense?.toUpperCase(), statsX, 230, { align: 'center' });

        // if (drawOutlines) doc.rect(statsX, 160.5, 1, 230.5 - 160.5);

        if (formData.unitGeneral == "Jandar") {
            doc.setTextColor(...blackRGB); // Set text color to black
        }

        doc.text(formData.points?.toUpperCase(), 384, 252, { align: 'center' });

        // Load the unit type image
        var unitTypeImgSrc = `/cardGenerator/assets/images/blanks/${formData.unitRarity}${formData.unitType}.png`;
        const unitTypeImg = await loadImage(unitTypeImgSrc);

        const unitTypeImgWidth = 48;
        const aspectRatio = unitTypeImg.height / unitTypeImg.width;
        const unitTypeImgHeight = unitTypeImgWidth * aspectRatio;
        const unitTypeImgX = 149;
        const unitTypeImgY = 15;

        if (debug) doc.rect(unitTypeImgX, unitTypeImgY, unitTypeImgWidth, unitTypeImgHeight);

        // Add the new image to the first page                    
        doc.addImage(unitTypeImg, 'PNG', unitTypeImgX, unitTypeImgY, unitTypeImgWidth, unitTypeImgHeight);

        // Load the unit size image
        var unitSizeImgSrc = `/cardGenerator/assets/images/blanks/${formData.unitSizeCategory}.png`;
        const unitSizeImg = await loadImage(unitSizeImgSrc);

        const unitSizeImgWidth = 48;
        const unitSizeAspectRatio = unitSizeImg.height / unitSizeImg.width;
        const unitsizeImgHeight = unitSizeImgWidth * unitSizeAspectRatio;
        const unitsizeX = 199;
        const unitsizeY = 18

        if (debug) doc.rect(unitsizeX, unitsizeY, unitSizeImgWidth, unitsizeImgHeight);

        // Add the new image to the first page                    
        doc.addImage(unitSizeImg, 'PNG', unitsizeX, unitsizeY, unitSizeImgWidth, unitsizeImgHeight);

        doc.setFontSize(10);
        doc.setFont('impact', 'normal');
        doc.setTextColor(...blackRGB); // Set text color to black
        doc.text(formData.unitSize?.toUpperCase(), 223, 35.25, { align: 'center' });

        // Load the hitbox image
        var hitboxImgSrc = formData.hitboxImage;
        const hitboxImg = await loadImage(hitboxImgSrc);

        const hitboxImgMaxWidth = 70;
        const hitboxImgMaxHeight = 72;
        var size = getSizeToMax(hitboxImgMaxWidth, hitboxImgMaxHeight, hitboxImg);

        const hitboxX = 265;
        const hitboxY = 211;
        const padHitboxX = size?.wPadding ? hitboxX + size.wPadding : hitboxX;
        const padHitboxY = size?.hPadding ? hitboxY + size.hPadding : hitboxY;

        if (debug) doc.rect(padHitboxX, padHitboxY, size.width, size.height);

        // Add the new image to the first page                    
        doc.addImage(hitboxImg, 'PNG', padHitboxX, padHitboxY, size.width, size.height);

        // Add text area constraints
        const textX = 23; // X coordinate for the text area
        const textY = 87; // Y coordinate for the text area
        const textWidth = 221; // Width of the text area
        const textHeight = 202; // Height of the text area
        let maxAbilityNameFontSize = 12;
        let maxAbilityTextFontSize = 9.5;
        let abilitySpacing = 1;
        await SizeAndCenterAbilities(doc, formData, textX, textY, textWidth, textHeight, maxAbilityNameFontSize, maxAbilityTextFontSize, abilitySpacing, debug);
    } catch (e) {
        var message = `Error building page one for ${formData.unitName}`;
        console.error(message, e);
        throw e;
    }
}