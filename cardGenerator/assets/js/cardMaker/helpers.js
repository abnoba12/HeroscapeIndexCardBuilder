export function addAbility() {
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
            placeholder: 'Ability Name'
        });

        const $abilityText = $('<textarea>', {
            class: 'col-md-7',
            placeholder: 'Ability Text',
            rows: 4
        });

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
    addAbility();
    addAbility();
    addAbility();
    addAbility();

    const $abilitiesContainer = $('#abilitiesContainer');
    const $abilities = $abilitiesContainer.find('.ability-row');

    $abilities.each(function (index) {
        $(this).find('input[type="text"]').val(`GIFT OF THE EMPRESS AURA ${index}`);
        $(this).find('textarea').val("When you roll defense dice for any Kyrie that you control who follows Einar and is within 5 clear sight spaces of Empress Kiova, you may reroll all defense dice that did not show shields. Gift of the Empress Aura can be used only once for each defense roll. Empress Kiova's Gift of the Empress Aura does not affect Empress Kiova.");
    });

    // Load and set the advanced unit image
    const imageUrl = '/cardGenerator/assets/images/test/charos.png';
    fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'charos.png', { type: 'image/png' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            var ele = $('#unitImageAdvanced');
            if (ele[0] && dataTransfer.files) {
                ele[0].files = dataTransfer.files;
            }
        })
        .catch(error => {
            console.error('Error loading image:', error);
        });

    // Load and set the hitbox image
    const hb = '/cardGenerator/assets/images/test/hitbox.png';
    fetch(hb)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'hitbox.png', { type: 'image/png' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            var ele = $('#hitboxImage');
            if (ele[0] && dataTransfer.files) {
                ele[0].files = dataTransfer.files;
            }
        })
        .catch(error => {
            console.error('Error loading image:', error);
        });

    // Load and set the basic unit image
    const bi = '/cardGenerator/assets/images/test/Anubian Wolves.png';
    fetch(bi)
        .then(response => response.blob())
        .then(blob => {
            const file = new File([blob], 'Anubian Wolves.png', { type: 'image/png' });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            var ele = $('#unitImageBasic');
            if (ele[0] && dataTransfer.files) {
                ele[0].files = dataTransfer.files;
            }
        })
        .catch(error => {
            console.error('Error loading image:', error);
        });
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