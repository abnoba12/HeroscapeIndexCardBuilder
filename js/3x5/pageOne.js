import { SizeAndCenterText } from "../helpers.js";
import { loadImage, getSizeToMax } from "../imageHelper.js";

export function addAbility() {
    try {
        const abilitiesContainer = document.getElementById('abilitiesContainer');
        const abilityRow = document.createElement('div');
        abilityRow.className = 'ability-row';

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-ability-btn';
        removeButton.innerText = '−';
        removeButton.type = 'button';
        removeButton.onclick = function () {
            abilitiesContainer.removeChild(abilityRow);
        };

        const abilityName = document.createElement('input');
        abilityName.type = 'text';
        abilityName.placeholder = 'Ability Name';

        const abilityText = document.createElement('textarea');
        abilityText.placeholder = 'Ability Text';
        abilityText.rows = 2;

        abilityRow.appendChild(removeButton);
        abilityRow.appendChild(abilityName);
        abilityRow.appendChild(abilityText);

        abilitiesContainer.appendChild(abilityRow);
    } catch (e) {
        var message = `Error adding ability ${abilityName}`;
        console.error(message, e);
        throw e;
    }
}

export async function addPageOne3x5(formData, doc) {
    try {
        if (doc.getNumberOfPages() != 1) {
            doc.addPage();
        }

        const drawOutlines = false;
        if (drawOutlines) {
            doc.setLineWidth(1);
            doc.setDrawColor(0, 0, 255);
        }

        const unitImageAdvancedSrc = formData.unitImageAdvanced;
        const unitAdvanceImg = await loadImage(unitImageAdvancedSrc);
        doc.addImage(unitAdvanceImg, 'PNG', 13, 63, 109, 109);

        // Load the General's image
        const generalImgSrc = `./Images/Blanks/${formData.unitGeneral}/${formData.unitGeneral}Front_3x5.png`;
        const generalImg = await loadImage(generalImgSrc);

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // Add the General's image to the first page
        doc.addImage(generalImg, 'PNG', 0, 0, pageWidth, pageHeight);

        // Set font for the first page
        doc.setFont('impact', 'normal');
        doc.setTextColor(255, 255, 255); // Set text color to white

        SizeAndCenterText(doc, formData.unitName?.toUpperCase(), 20, 42, 18, 120, 40, -3, 2, drawOutlines);

        // Load the hitbox image
        var hitboxImgSrc = formData.hitboxImage;
        const hitboxImg = await loadImage(hitboxImgSrc);

        const hitboxImgMaxWidth = 38;
        const hitboxImgMaxHeight = 38;
        var size = getSizeToMax(hitboxImgMaxWidth, hitboxImgMaxHeight, hitboxImg);

        const hitboxX = 175;
        const hitboxY = 19;
        const padHitboxX = size?.wPadding ? hitboxX + size.wPadding : hitboxX;
        const padHitboxY = size?.hPadding ? hitboxY + size.hPadding : hitboxY;

        if (drawOutlines) doc.rect(padHitboxX, padHitboxY, size.width, size.height);

        // Add the new image to the first page                    
        doc.addImage(hitboxImg, 'PNG', padHitboxX, padHitboxY, size.width, size.height);

        var metaFontSize = 9;
        var metaX = 122.5;
        var metaY = 65;
        var metaWidth = 61;
        var metaHeight = 15;
        var metaYGap = 18.18;
        SizeAndCenterText(doc, formData.unitRace?.toUpperCase(), metaFontSize, metaX, metaY, metaWidth, metaHeight, -1.5, 0, drawOutlines, "left");
        SizeAndCenterText(doc, `${formData.unitRarity?.toUpperCase()} ${formData.unitType?.toUpperCase()}`, metaFontSize, metaX - 3, metaY + (metaYGap * 1), metaWidth, metaHeight, -1.5, 0, drawOutlines, "left");
        SizeAndCenterText(doc, formData.unitRole?.toUpperCase(), metaFontSize, metaX - 5, metaY + (metaYGap * 2), metaWidth, metaHeight, -1.5, 0, drawOutlines, "left");
        SizeAndCenterText(doc, formData.unitPersonality?.toUpperCase(), metaFontSize, metaX - 5.5, metaY + (metaYGap * 3), metaWidth, metaHeight, -1.5, 0, drawOutlines, "left");
        SizeAndCenterText(doc, formData.unitPlanet?.toUpperCase(), metaFontSize, metaX - 4, metaY + (metaYGap * 4), metaWidth, metaHeight, -1.5, 0, drawOutlines, "left");
        SizeAndCenterText(doc, `${formData.unitSizeCategory?.toUpperCase()} ${formData.unitSize?.toUpperCase()}`, metaFontSize + 3, metaX - 0.5, metaY + (metaYGap * 5), metaWidth, metaHeight, -1.5, 0, drawOutlines, "left");

        doc.setFontSize(10);
        const statsX = 201;
        const statsY = 80
        const statsXGap = 8.5;
        const statsYGap = 16.65;
        doc.setFont('arial', 'bold');
        doc.text(formData.life?.toUpperCase(), statsX, statsY - 2.5, { align: 'center' });

        doc.setFontSize(8);
        doc.setFont('arial', 'bold');
        doc.text(formData.advancedMove?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 1), { align: 'center' });
        doc.text(formData.advancedRange?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 2), { align: 'center' });
        doc.text(formData.advancedAttack?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 3), { align: 'center' });
        doc.text(formData.advancedDefense?.toUpperCase(), statsX + statsXGap, statsY + (statsYGap * 4), { align: 'center' });

        if (formData.unitGeneral == "Jandar") {
            doc.setTextColor(0, 0, 0); // Set text color to black
        }
        doc.text(formData.points?.toUpperCase(), statsX, statsY + (statsYGap * 5) - 1, { align: 'center' });

        if (drawOutlines) doc.rect(statsX, statsY, 1, 100);

        // Add text area constraints
        const paddingX = 5;
        const paddingY = 2;
        const textX = 14 + paddingX; // X coordinate for the text area
        const textY = 172 + paddingY; // Y coordinate for the text area
        const textWidth = 206 - (paddingX * 2); // Width of the text area
        const textHeight = 192 - (paddingY * 2); // Height of the text area

        // Draw border
        if (drawOutlines) doc.rect(textX, textY, textWidth, textHeight);

        let currentY = textY;
        let maxAbilityNameFontSize = 12;
        let maxAbilityTextFontSize = 9.5;

        doc.setTextColor(0, 0, 0); // Set text color to black
        var abilitiesfit = false;
        var write = false;
        while (!abilitiesfit) {
            currentY = textY; // Reset currentY to the start of the text area
            formData.abilities.forEach((ability, index) => {
                // doc.setDrawColor(index * 100, index * 100, index * 100);
                // if (drawOutlines) doc.rect(textX, currentY, textWidth, textHeight - (currentY - textY));

                // Add an empty line before each new ability name for visual separation
                if (index > 0) {
                    currentY += maxAbilityNameFontSize;
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