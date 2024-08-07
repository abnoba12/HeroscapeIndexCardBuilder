import { SizeAndCenterText } from "../helpers.js";
import { loadImage, getSizeToMax } from "../imageHelper.js";

export async function addPageOneStandard(formData, doc, GlobalAdjustX = 0, GlobalAdjustY = 0, GlobalYGapAdjust = 0) {
    try {
        if (doc.getNumberOfPages() != 1) {
            doc.addPage();
        }

        const drawOutlines = false;
        if (drawOutlines) {
            doc.setLineWidth(1);
            doc.setDrawColor(0, 0, 255);
        }

        // var coverX = 105; //174;
        // var coverY = 14;
        // var coverWidth = 253 //115;
        // var coverHeight = 253;
        // const unitImageAdvancedCoverSrc = `./Images/Blanks/${formData.unitGeneral}/${formData.unitGeneral}Cover.png`;
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
        const generalImgSrc = `./Images/Blanks/${formData.unitGeneral}/${formData.unitGeneral}Front_EW.png`;
        const generalImg = await loadImage(generalImgSrc);

        // Add the General's image to the first page
        doc.addImage(generalImg, 'PNG', 0, 0, pageWidth, pageHeight);

        // if (drawOutlines) doc.rect(coverX, coverY, coverWidth, coverHeight);
        if (drawOutlines) doc.rect(padunitAdvX, padunitAdvY, unitAdvSize.width, unitAdvSize.height);

        // Set font for the first page
        doc.setFont('impact', 'normal');
        doc.setTextColor(211, 212, 205); // Set text color to white

        SizeAndCenterText(doc, formData.unitName?.toUpperCase(), 14, 80 + GlobalAdjustX, 51 + GlobalAdjustY, 78, 24, -2, 2, drawOutlines);

        var metaFontSize = 6;
        var metaX = 20 + GlobalAdjustX;
        var metaY = 136.5 + GlobalAdjustY;
        var metaWidth = 50;
        var metaHeight = 10;
        var metaYGap = 12.1 + GlobalYGapAdjust;
        SizeAndCenterText(doc, formData.unitRace?.toUpperCase(), metaFontSize, metaX, metaY, metaWidth, metaHeight, -1.5, 0, drawOutlines, "right");
        SizeAndCenterText(doc, `${formData.unitRarity?.toUpperCase()} ${formData.unitType?.toUpperCase()}`, metaFontSize, metaX + 1, metaY + (metaYGap * 1), metaWidth, metaHeight, -1.5, 0, drawOutlines, "right");
        SizeAndCenterText(doc, formData.unitRole?.toUpperCase(), metaFontSize, metaX + 2, metaY + (metaYGap * 2), metaWidth, metaHeight, -1.5, 0, drawOutlines, "right");
        SizeAndCenterText(doc, formData.unitPersonality?.toUpperCase(), metaFontSize, metaX + 2, metaY + (metaYGap * 3), metaWidth, metaHeight, -1.5, 0, drawOutlines, "right");
        SizeAndCenterText(doc, `${formData.unitSizeCategory?.toUpperCase()} ${formData.unitSize?.toUpperCase()}`, metaFontSize + 3, metaX + 1, metaY + (metaYGap * 4), metaWidth, metaHeight, -1.5, 0, drawOutlines, "right");

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
            doc.setTextColor(33, 35, 32); // Set text color to black
        }
        doc.text(formData.points?.toUpperCase(), statsX, statsY + (statsYGap * 5) + 1, { align: 'center' });

        if (drawOutlines) doc.rect(statsX, statsY, 1, 100);

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

        if (drawOutlines) doc.rect(padHitboxX, padHitboxY, size.width, size.height);

        // Add the new image to the first page                    
        doc.addImage(hitboxImg, 'PNG', padHitboxX, padHitboxY, size.width, size.height);



        doc.setTextColor(33, 35, 32); // Set text color to black
        // Add text area constraints
        const textX = 82 + GlobalAdjustX; // X coordinate for the text area
        const textY = 85 + GlobalAdjustY; // Y coordinate for the text area
        const textWidth = 95; // Width of the text area
        const textHeight = 215; // Height of the text area

        // Draw border
        if (drawOutlines) doc.rect(textX, textY, textWidth, textHeight);

        let currentY = textY;
        let maxAbilityNameFontSize = 12;
        let maxAbilityTextFontSize = 9.5;

        var abilitiesfit = false;
        var write = false;
        while (!abilitiesfit) {
            currentY = textY; // Reset currentY to the start of the text area
            formData.abilities.forEach((ability, index) => {
                // doc.setDrawColor(index * 100, index * 100, index * 100);
                // if (drawOutlines) doc.rect(textX, currentY, textWidth, textHeight - (currentY - textY));

                // Add an empty line before each new ability name for visual separation
                if (index > 0) {
                    currentY += (maxAbilityNameFontSize * 2);
                }

                // Ability Name
                doc.setFont('impact', 'normal');
                doc.setFontSize(maxAbilityNameFontSize);
                let abilityNameLines = doc.splitTextToSize(ability.name?.toUpperCase(), textWidth);
                const abilityNameHeight = abilityNameLines.length * maxAbilityNameFontSize;
                if (write) doc.text(abilityNameLines, textX, currentY + abilityNameHeight, { align: 'left' });
                currentY += abilityNameHeight * 2;

                // Ability Text
                doc.setFont('arial', 'bold');
                doc.setFontSize(maxAbilityTextFontSize);
                let abilityTextLines = doc.splitTextToSize(ability.text, textWidth);
                if (write) doc.text(abilityTextLines, textX, currentY, { align: 'left' });
                currentY += (maxAbilityTextFontSize * abilityTextLines.length);
                if (index > 0) currentY += 5;
            });

            if (currentY > textY + textHeight) {
                // console.log("Ability text won't fit, reduced font size by 0.25 pt");
                maxAbilityNameFontSize -= 0.25;
                maxAbilityTextFontSize -= 0.25;
            } else if (!write) {
                write = true;
            } else {
                abilitiesfit = true;
            }
        }
    } catch (e) {
        var message = `Error building page one for ${formData.unitName}`;
        console.error(message, e);
        throw e;
    }
}