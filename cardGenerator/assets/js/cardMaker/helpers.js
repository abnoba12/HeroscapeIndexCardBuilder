export function addAbility(abilityName, abilityText) {
    try {
        const $abilitiesContainer = $('#abilitiesContainer');
        const maxAbilities = 4;

        // Check the number of existing abilities
        const currentAbilities = $abilitiesContainer.children('.ability-row').length;

        if (currentAbilities >= maxAbilities) {
            alert(`You can only add up to ${maxAbilities} abilities.`);
            return;
        }

        const $abilityRow = $('<div>', { class: 'ability-row row' });

        const $removeButton = $('<button>', {
            class: 'remove-ability-btn col-md-1',
            type: 'button',
            html: '&minus;'
        });

        $removeButton.on('click', function () {
            $abilityRow.remove();
        });

        const $abilityName = $('<input>', {
            class: 'col-md-4',
            type: 'text',
            placeholder: 'Ability Name',
            value: abilityName
        });

        const $abilityText = $('<textarea>', {
            class: 'col-md-7',
            placeholder: 'Ability Text',
            rows: 4
        }).val(abilityText);

        $abilityRow.append($removeButton, $abilityName, $abilityText);
        $abilitiesContainer.append($abilityRow);
    } catch (e) {
        var message = `Error adding ability`;
        console.error(message, e);
        throw e;
    }
}

export function filloutForm() {
    // Fill out the form fields using jQuery
    $('#creator').val('C3V');
    $('#unitGeneral').val('Ullar');
    $('#unitName').val('Deathwalker 9000 and some big monsters');
    $('#unitRace').val('Monster');
    $('#unitRole').val('Deathstalkers');
    $('#unitPersonality').val('Blood Thirsty');
    $('#unitPlanet').val('Marr');
    $('#unitType').val('Hero');
    $('#unitRarity').val('Uncommon');
    $('#unitSizeCategory').val('Large');
    $('#unitSize').val(17);
    $('#life').val(1);
    $('#advancedMove').val(7);
    $('#advancedRange').val(1);
    $('#advancedAttack').val(8);
    $('#advancedDefense').val(3);
    $('#points').val(110);
    $('#basicMove').val(7);
    $('#basicRange').val(1);
    $('#basicAttack').val(8);
    $('#basicDefense').val(3);
    $('#set').val('Some made up set name');
    $('#unitNumbers').val(1);
    $('#numberOfUnitsInSet').val(3);

    // Add abilities
    addAbility(`GIFT 1`, "When you roll defense dice for any Kyrie that you control.");
    addAbility(`THE EMPRESS 2`, "When you roll defense dice for any Kyrie that you control who follows Einar and is within 5 clear sight spaces of Empress Kiova, you may reroll all defense dice that did not show shields. ");
    addAbility(`GIFT OF THE EMPRESS AURA 3`, "When you roll defense dice for any Kyrie that you control who follows Einar and is within 5 clear sight spaces of Empress Kiova, you may reroll all defense dice that did not show shields. Gift of the Empress Aura can be used only once for each defense roll. Empress Kiova's Gift of the Empress Aura does not affect Empress Kiova.");

    // Load and set the advanced unit image
    loadImage('/cardGenerator/assets/images/test/charos.png', $('#unitImageAdvanced'));

    // Load and set the hitbox image
    loadImage('/cardGenerator/assets/images/test/hitbox.png', $('#hitboxImage'));

    // Load and set the basic unit image
    loadImage('/cardGenerator/assets/images/test/Anubian Wolves.png', $('#unitImageBasic'));
}


export function fillOutCSV() {
    const hb = '/cardGenerator/assets/images/test/Heroscape - Unit Data 2.csv';
    fetch(hb)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'Heroscape - Unit Data 2.csv', { type: 'text/csv' });

            // Set the File object as the value of the file input element
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            document.getElementById('csvFile').files = dataTransfer.files;
        });

    const bi = '/cardGenerator/assets/images/test/CardAssets.zip';
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

export function loadImage(image, element) {
    fetch(image)
        .then(response => {
            // Get the content disposition header
            const contentDisposition = response.headers.get('Content-Disposition');
            let fileName = 'default.png'; // Default file name

            // Extract file name from content disposition header
            if (contentDisposition && contentDisposition.includes('filename=')) {
                fileName = contentDisposition.split('filename=')[1].split(';')[0].replace(/"/g, '');
            } else {
                // If the content disposition header is not available, extract from the URL
                const urlParts = image.split('/');
                fileName = urlParts[urlParts.length - 1];
            }

            // Get the MIME type from the content type header
            const mimeType = response.headers.get('Content-Type') || 'image/png';

            // Convert the response to a blob
            return response.blob().then(blob => ({ blob, fileName, mimeType }));
        })
        .then(({ blob, fileName, mimeType }) => {
            // Create a file from the blob with the extracted file name and mime type
            const file = new File([blob], fileName, { type: mimeType });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);

            // Assign the file to the input element
            if (element[0] && dataTransfer.files) {
                element[0].files = dataTransfer.files;
            }
        })
        .catch(error => {
            console.error('Error loading image:', error);
        });
}
