var lineHeightOffset = 1.15;

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

export function SizeAndCenterText(doc, text, fontSize, areaX, areaY, areaWidth, areaHeight, yOffset = 0, padding = 0, drawOutlines = false, align = "center") {
    try {
        SizeText(doc, text, fontSize, areaWidth, areaHeight, padding = 0);
        CenterTextInArea(doc, text, areaX, areaY, areaWidth, areaHeight, yOffset, padding, drawOutlines, align);
    } catch (e) {
        var message = `Error sizing text: ${text}`;
        console.error(message, error);
        throw error;
    }
}

export function SizeText(doc, text, fontSize, areaWidth, areaHeight, padding = 0) {
    try {
        var notFit = true;
        while (notFit) {
            doc.setFontSize(fontSize);
            const wrappedText = doc.splitTextToSize(text, areaWidth - padding);
            const lineHeight = fontSize * lineHeightOffset; // You might need to adjust this value based on your font size
            const textHeight = wrappedText.length * lineHeight;

            //Too large, reduce the font size by 0.25pt
            if (textHeight > areaHeight) {
                fontSize -= 0.25;
            } else {
                notFit = false;
            }
        }
    } catch (e) {
        var message = `Error sizing text: ${text}`;
        console.error(message, error);
        throw error;
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
        console.error(message, error);
        throw error;
    }
}

export function filloutForm() {
    document.getElementById('creator').value = "C3V";
    document.getElementById('unitGeneral').value = "Utgar";
    document.getElementById('unitName').value = "Deathwalker 9000 and some big monsters";
    document.getElementById('unitRace').value = "Monster";
    document.getElementById('unitRole').value = "Deathstalkers";
    document.getElementById('unitPersonality').value = "Blood Thirsty";
    document.getElementById('unitPlanet').value = "Marr";
    document.getElementById('unitType').value = "Hero";
    document.getElementById('unitRarity').value = "Uncommon";
    document.getElementById('unitSizeCategory').value = "Large";
    document.getElementById('unitSize').value = 17;
    document.getElementById('life').value = 1;
    document.getElementById('advancedMove').value = 7;
    document.getElementById('advancedRange').value = 1;
    document.getElementById('advancedAttack').value = 8;
    document.getElementById('advancedDefense').value = 3;
    document.getElementById('points').value = 110;
    document.getElementById('basicMove').value = 7;
    document.getElementById('basicRange').value = 1;
    document.getElementById('basicAttack').value = 8;
    document.getElementById('basicDefense').value = 3
    document.getElementById('set').value = "Some made up set name";
    document.getElementById('unitNumbers').value = 1;
    document.getElementById('numberOfUnitsInSet').value = 3;

    addAbility();
    addAbility();
    const abilitiesContainer = document.getElementById('abilitiesContainer');
    const abilities = abilitiesContainer.querySelectorAll('.ability-row');
    abilities.forEach((ability) => {
        ability.querySelector('input[type="text"]').value = "Really cool power";
        ability.querySelector('textarea').value = "The power to do really cool things and impress others. Wow such a cool thing to be able to do, I am impressed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus nulla sit amet euismod accumsan. Fusce commodo molestie ligula at feugiat. Vivamus porta quam in vestibulum ullamcorper. Pellentesque libero purus, malesuada sit amet massa id, facilisis pulvinar tellus. Quisque vulputate libero ut lobortis ultricies. Vivamus fermentum lobortis orci, a rutrum purus consequat ac. Vivamus ac vulputate ipsum. Fusce imperdiet mattis laoreet. Proin vestibulum ipsum in sem molestie, in vehicula velit semper. Nulla dui augue, feugiat volutpat est vitae, fermentum bibendum nunc.";
    });

    // Create a File object from the image URL
    const imageUrl = './Images/Blanks/test/charos.png';
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'charos.png', { type: 'image/png' });

            // Set the File object as the value of the file input element
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('unitImageAdvanced').files = dataTransfer.files;
        })
        .catch(error => {
            console.error('Error loading image:', error);
        });

    const hb = './Images/Blanks/test/hitbox.png';
    fetch(hb)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'hitbox.png', { type: 'image/png' });

            // Set the File object as the value of the file input element
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('hitboxImage').files = dataTransfer.files;
        });

    const bi = './Images/Blanks/test/Anubian Wolves.png';
    fetch(bi)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'Anubian Wolves.png', { type: 'image/png' });

            // Set the File object as the value of the file input element
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('unitImageBasic').files = dataTransfer.files;
        });
}

export function fillOutCSV() {
    const hb = './Images/Blanks/test/Heroscape - Unit Data 2.csv';
    fetch(hb)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'Heroscape - Unit Data 2.csv', { type: 'text/csv' });

            // Set the File object as the value of the file input element
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('csvFile').files = dataTransfer.files;
        });

    const bi = './Images/Blanks/test/CardAssets.zip';
    fetch(bi)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'CardAssets.zip', { type: 'application/zip' });

            // Set the File object as the value of the file input element
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('AssetsZip').files = dataTransfer.files;
        });
}