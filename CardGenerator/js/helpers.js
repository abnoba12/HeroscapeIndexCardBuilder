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

export function filloutForm() {
    document.getElementById('creator').value = "C3V";
    document.getElementById('unitGeneral').value = "Ullar";
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
    addAbility();
    addAbility();
    const abilitiesContainer = document.getElementById('abilitiesContainer');
    const abilities = abilitiesContainer.querySelectorAll('.ability-row');
    abilities.forEach((ability, index) => {
        ability.querySelector('input[type="text"]').value = `GIFT OF THE EMPRESS AURA ${index}`;
        ability.querySelector('textarea').value = "When you roll defense dice for any Kyrie that you control who follows Einar and is within 5 clear sight spaces of Empress Kiova, you may reroll all defense dice that did not show shields. Gift of the Empress Aura can be used only once for each defense roll. Empress Kiova's Gift of the Empress Aura does not affect Empress Kiova.";
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