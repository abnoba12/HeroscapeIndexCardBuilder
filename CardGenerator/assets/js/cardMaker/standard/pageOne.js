import { loadImage, getSizeToMax } from "../imageHelper.js";
import { SizeAndCenterAbilities, SizeAndCenterText } from "../textHelper.js"

export async function addPageOneStandard(formData, doc, GlobalAdjustX = 0, GlobalAdjustY = 0, GlobalYGapAdjust = 0) {
    try {
        if (doc.getNumberOfPages() != 1) {
            doc.addPage();
        }

        const debug = false;
        if (debug) {
            doc.setLineWidth(1);
            doc.setDrawColor(0, 0, 255);
        }

        var whiteRGB = [211, 212, 205];
        var blackRGB = [33, 35, 32];

        // var coverX = 105; //174;
        // var coverY = 14;
        // var coverWidth = 253 //115;
        // var coverHeight = 253;
        // const unitImageAdvancedCoverSrc = `/cardGenerator/assets/images/blanks/${formData.unitGeneral}/${formData.unitGeneral}Cover.png`;
        // const unitAdvanceImgCover = await loadImage(unitImageAdvancedCoverSrc);
        // doc.addImage(unitAdvanceImgCover, 'PNG', coverX, coverY, coverWidth, coverHeight);

        const unitImageAdvancedSrc = formData.unitImageAdvanced;
        const unitAdvanceImg = await loadImage(unitImageAdvancedSrc);

        const unitAdvanceImgMaxWidth = 256; //110;
        const unitAdvanceImgMaxHeight = 256;
        var unitAdvSize = getSizeToMax(unitAdvanceImgMaxWidth, unitAdvanceImgMaxHeight, unitAdvanceImg);

        const unitAdvX = 104 + GlobalAdjustX; //180;
        const unitAdvY = 11 + GlobalAdjustY;
        const padunitAdvX = unitAdvSize?.wPadding ? unitAdvX + unitAdvSize.wPadding : unitAdvX;
        const padunitAdvY = unitAdvSize?.hPadding ? unitAdvY + unitAdvSize.hPadding : unitAdvY;

        // Add the new image to the first page                    
        doc.addImage(unitAdvanceImg, 'PNG', padunitAdvX, padunitAdvY, unitAdvSize.width, unitAdvSize.height);

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // const unitImageAdvancedSrc = formData.unitImageAdvanced;
        // const unitAdvanceImg = await loadImage(unitImageAdvancedSrc);
        // doc.addImage(unitAdvanceImg, 'PNG', 173, 14, 117, 253);

        // Load the General's image
        const generalImgSrc = `/cardGenerator/assets/images/blanks/${formData.unitGeneral}/${formData.unitGeneral}Front_EW.png`;
        const generalImg = await loadImage(generalImgSrc);

        // Add the General's image to the first page
        doc.addImage(generalImg, 'PNG', 0, 0, pageWidth, pageHeight);

        // if (debug) doc.rect(coverX, coverY, coverWidth, coverHeight);
        if (debug) doc.rect(padunitAdvX, padunitAdvY, unitAdvSize.width, unitAdvSize.height);

        // Set font for the first page
        doc.setFont('impact', 'normal');
        doc.setTextColor(...whiteRGB); // Set text color to white

        SizeAndCenterText(doc, formData.unitName?.toUpperCase(), 14, 84 + GlobalAdjustX, 51 + GlobalAdjustY, 72, 24, -2, 2, debug);

        var metaFontSize = 6;
        var metaX = 20 + GlobalAdjustX;
        var metaY = 136.5 + GlobalAdjustY;
        var metaWidth = 50;
        var metaHeight = 10;
        var metaYGap = 12.1 + GlobalYGapAdjust;
        SizeAndCenterText(doc, formData.unitRace?.toUpperCase(), metaFontSize, metaX, metaY, metaWidth, metaHeight, -1.5, 0, debug, "right");
        SizeAndCenterText(doc, `${formData.unitRarity?.toUpperCase()} ${formData.unitType?.toUpperCase()}`, metaFontSize, metaX + 1, metaY + (metaYGap * 1), metaWidth, metaHeight, -1.5, 0, debug, "right");
        SizeAndCenterText(doc, formData.unitRole?.toUpperCase(), metaFontSize, metaX + 2, metaY + (metaYGap * 2), metaWidth, metaHeight, -1.5, 0, debug, "right");
        SizeAndCenterText(doc, formData.unitPersonality?.toUpperCase(), metaFontSize, metaX + 2, metaY + (metaYGap * 3), metaWidth, metaHeight, -1.5, 0, debug, "right");
        SizeAndCenterText(doc, `${formData.unitSizeCategory?.toUpperCase()} ${formData.unitSize?.toUpperCase()}`, metaFontSize + 3, metaX + 1, metaY + (metaYGap * 4), metaWidth, metaHeight, -1.5, 0, debug, "right");

        doc.setFontSize(10);
        const statsX = 235 + GlobalAdjustX;
        const statsY = 177 + GlobalAdjustY;
        const statsXGap = 29;
        const statsYGap = 23.4 + GlobalYGapAdjust;
        doc.setFont('arial', 'bold');
        doc.text(formData.life?.toUpperCase(), statsX, statsY - 2.5, { align: 'center' });

        doc.setFontSize(8);
        doc.setFont('arial', 'bold');
        doc.text(formData.advancedMove?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 1), { align: 'center' });
        doc.text(formData.advancedRange?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 2), { align: 'center' });
        doc.text(formData.advancedAttack?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 3), { align: 'center' });
        doc.text(formData.advancedDefense?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 4), { align: 'center' });

        if (formData.unitGeneral == "Jandar") {
            doc.setTextColor(...blackRGB); // Set text color to black
        }
        doc.text(formData.points?.toUpperCase(), statsX, statsY + (statsYGap * 5) + 1, { align: 'center' });

        if (debug) doc.rect(statsX, statsY, 1, 100);

        // Load the hitbox image
        var hitboxImgSrc = formData.hitboxImage;
        const hitboxImg = await loadImage(hitboxImgSrc);

        const hitboxImgMaxWidth = 53;
        const hitboxImgMaxHeight = 60;
        var size = getSizeToMax(hitboxImgMaxWidth, hitboxImgMaxHeight, hitboxImg);

        const hitboxX = 293 + GlobalAdjustX;
        const hitboxY = 140 + GlobalAdjustY;
        const padHitboxX = size?.wPadding ? hitboxX + size.wPadding : hitboxX;
        const padHitboxY = size?.hPadding ? hitboxY + size.hPadding : hitboxY;

        if (debug) doc.rect(padHitboxX, padHitboxY, size.width, size.height);

        // Add the new image to the first page                    
        doc.addImage(hitboxImg, 'PNG', padHitboxX, padHitboxY, size.width, size.height);



        doc.setTextColor(...blackRGB); // Set text color to black
        // Add text area constraints
        const textX = 81 + GlobalAdjustX; // X coordinate for the text area
        const textY = 85 + GlobalAdjustY; // Y coordinate for the text area
        const textWidth = 90; // Width of the text area
        const textHeight = 217; // Height of the text area
        let maxAbilityNameFontSize = 9;
        let maxAbilityTextFontSize = 7.5;
        let abilitySpacing = 0.75;

        await SizeAndCenterAbilities(doc, formData, textX, textY, textWidth, textHeight, maxAbilityNameFontSize, maxAbilityTextFontSize, abilitySpacing, debug);
    } catch (e) {
        var message = `Error building page one for ${formData.unitName}`;
        console.error(message, e);
        throw e;
    }
}