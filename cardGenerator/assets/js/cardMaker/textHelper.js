const lineHeightOffset = 1.15;

export function SizeAndCenterText(doc, text, fontSize, areaX, areaY, areaWidth, areaHeight, yOffset = 0, padding = 0, drawOutlines = false, align = "center") {
    try {
        SizeText(doc, text, fontSize, areaWidth, areaHeight, padding = 0);
        CenterTextInArea(doc, text, areaX, areaY, areaWidth, areaHeight, yOffset, padding, drawOutlines, align);
    } catch (e) {
        var message = `Error sizing text: ${text}`;
        console.error(message, e);
        throw e;
    }
}

export function SizeText(doc, text, fontSize, areaWidth, areaHeight, padding = 0) {
    try {
        var notFit = true;
        while (notFit) {
            doc.setFontSize(fontSize);
            const words = text.split(" ");
            const wrappedText = doc.splitTextToSize(text, areaWidth - padding);
            const lineHeight = fontSize * lineHeightOffset; // You might need to adjust this value based on your font size
            const textHeight = wrappedText.length * lineHeight;

            //Too large, reduce the font size by 0.1pt
            if (textHeight > areaHeight) {
                fontSize -= 0.1;
            } else {
                //Heigh fits now check the width.
                for (let i = 0; i < words.length; i++) {
                    var textWidth = doc.getTextWidth(words[i]);
                    if (textWidth > areaWidth - padding) {
                        fontSize -= 0.1;
                    } else {
                        notFit = false;
                    }
                }
            }

        }
    } catch (e) {
        var message = `Error sizing text: ${text}`;
        console.error(message, e);
        throw e;
    }
}

export function CenterTextInArea(doc, text, areaX, areaY, areaWidth, areaHeight, yOffset = 0, padding = 0, drawOutlines = false, align = "center") {
    try {
        // console.log(`text: ${text}, areaX: ${areaX}, areaY: ${areaY}, areaWidth: ${areaWidth}, areaHeight: ${areaHeight}, padding: ${padding}`);

        const wrappedText = doc.splitTextToSize(text, areaWidth - padding); // Adjust width to account for padding

        // Calculate the height of the text block
        const fontSize = doc.internal.getFontSize();
        const lineHeight = fontSize * lineHeightOffset; // You might need to adjust this value based on your font size
        const lines = wrappedText.length;
        const textTotalHeight = lines * lineHeight;
        const textMiddleY = textTotalHeight / 2;
        const areaMiddleY = areaHeight / 2;
        const shiftTextDownBy = areaMiddleY - textMiddleY;

        var textY = areaY + lineHeight + shiftTextDownBy + yOffset;

        // // Calculate the starting positions to center the text
        const areaCenterX = areaX + (areaWidth / 2);

        // console.log(`lineHeight: ${lineHeight}, textHeight: ${textTotalHeight}, topOffset: ${topOffset}, textY: ${textY}`);

        if (drawOutlines) {
            // Draw the rectangle (for visualization)
            doc.setLineWidth(1);

            doc.setDrawColor(255, 0, 0); //Bottom of text
            doc.rect(areaCenterX, textY, 20, .1);

            // doc.setDrawColor(0, 255, 0); //Green center of area
            // doc.rect(areaX, areaCenterY, areaWidth, .1);

            doc.setDrawColor(0, 0, 255); //Blue Area outline
            doc.rect(areaX, areaY, areaWidth, areaHeight);
        }

        var xPlacement = areaCenterX;
        if (align == 'left') {
            xPlacement = areaX;
        }
        if (align == 'right') {
            xPlacement = areaX + areaWidth;
        }
        doc.text(wrappedText, xPlacement, textY, { align: align });
    } catch (e) {
        var message = `Error centering text: ${text}`;
        console.error(message, e);
        throw e;
    }
}

export async function SizeAndCenterAbilities(doc, formData, constraintsX, constraintsY, constraintsWidth, constraintsHeight, nameMaxFontSize, textMaxFontSize, abilitySpacing = 1, debug = false) {
    try {
        if (debug) console.log(`Unit: ${formData.unitName}`);
        // Draw border
        if (debug) doc.rect(constraintsX, constraintsY, constraintsWidth, constraintsHeight);
        let currentY = constraintsY;

        formData.abilities = combineAbilityText(formData.abilities, formData.condenseAbilities);

        const fontSizeReductionIncriment = 0.01;
        var write = false;
        while (true) {
            currentY = constraintsY; // Reset currentY to the start of the text area

            for (let i = 0; i < formData.abilities.length; i++) {
                const ability = formData.abilities[i];

                if (debug) doc.setDrawColor(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));

                // Add an empty line before each new ability name for visual separation
                if (i > 0) {
                    currentY += ((nameMaxFontSize * lineHeightOffset) * abilitySpacing);
                }

                // Ability Name
                doc.setFont('impact', 'normal');
                doc.setFontSize(nameMaxFontSize);
                let abilityNameLines = doc.splitTextToSize(ability.name?.toUpperCase(), constraintsWidth);
                const abilityNameHeight = abilityNameLines.length * (nameMaxFontSize * lineHeightOffset);
                if (write) {
                    doc.text(abilityNameLines, constraintsX, currentY + (nameMaxFontSize * lineHeightOffset), { align: 'left' });
                    if (debug) doc.rect(constraintsX, currentY, constraintsWidth, abilityNameHeight);
                    if (debug) console.log(`Writing the ability: ${ability.name?.toUpperCase()}`);
                }
                currentY += abilityNameHeight;

                // Ability Text
                doc.setFont('arial', 'bold');
                doc.setFontSize(textMaxFontSize);
                let abilityTextLines = doc.splitTextToSize(ability.text, constraintsWidth);
                const abilityTextHeight = abilityTextLines.length * (textMaxFontSize * lineHeightOffset);
                if (write) {
                    doc.text(abilityTextLines, constraintsX, currentY + (textMaxFontSize * lineHeightOffset), { align: 'left' });
                    if (debug) doc.rect(constraintsX, currentY, constraintsWidth, abilityTextHeight);
                }
                currentY += abilityTextHeight;
            }
            if (write) break;

            const constraintBottom = (constraintsY + constraintsHeight).toFixed(3);
            currentY = currentY.toFixed(3);
            if (currentY > constraintBottom) {
                nameMaxFontSize = nameMaxFontSize.toFixed(3) - fontSizeReductionIncriment.toFixed(3);
                textMaxFontSize = textMaxFontSize.toFixed(3) - fontSizeReductionIncriment.toFixed(3);
                if (debug) console.log(`Text is too large. Shrinking fonts, Name: ${nameMaxFontSize}pt, Text: ${textMaxFontSize}pt. Text Bottom: ${currentY}, Constraints Bottom: ${constraintBottom}`);
            } else {
                if (debug) console.log(`Found proper size. Text Bottom: ${currentY}, Constraints Bottom: ${constraintBottom}, difference: ${constraintBottom - currentY}`);
                write = true;
            }
        }
    } catch (e) {
        var message = `Error sizing and centering ability text.`;
        console.error(message, e);
        throw e;
    }
}

function combineAbilityText(abilities, condense) {
    const commonAbilities = ["flying", "disengage", "counter strike", "stealth flying", "slither", "double attack", "lava resistant"];

    //Turn stealth flying into its composite abilities "flying" and "disengage".
    if (condense && abilities.map(x => x.name.toLowerCase()).includes("stealth flying")) {
        abilities = abilities.filter(ability => ability.name.toLowerCase() !== "stealth flying");
        abilities.push({ "name": "Flying, Disengage", "text": "" })
    }

    // Turn any common ability into just its name and remove the ability text
    if (condense) {
        for (let i = 0; i < abilities.length; i++) {
            if (commonAbilities.includes(abilities[i].name.toLowerCase())) {
                abilities[i].text = undefined;
            }
        }
    }

    let nonEmptyText = abilities.filter(item => item.text);
    let emptyText = abilities.filter(item => !item.text);

    // Combine names of empty text objects
    if (emptyText.length > 0) {
        let combinedNames = emptyText.map(item => item.name).join(", ");

        // Add the new object with combined names to the array
        nonEmptyText.unshift({
            name: combinedNames,
            text: ""
        });
    }

    return nonEmptyText;
}