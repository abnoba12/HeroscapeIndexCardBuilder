import { filloutForm, addAbility } from './helpers.js';
import { initializePDF, generateIndexCard, savePDF } from './generatePDF.js';

// Create a URLSearchParams object from the query string
const urlParams = new URLSearchParams(window.location.search);

$(document).ready(function () {
    if (urlParams.get('cardsize') == "3x5") {
        $('#subSectionTitle').text("3x5 Heroscape Index Card Creator");
        $('#advImgTT').text(`To ensure your image looks its best when uploaded, please use a square image (aspect ratio 1:1). This will prevent any distortion, as the image will be scaled to fit the content area.`);
        $('#unitImageBasic').parent().remove();
    } else if (urlParams.get('cardsize') == "4x6") {
        $('#subSectionTitle').text("4x6 Heroscape Index Card Creator");
        $('#advImgTT').text(`To ensure the best quality, please upload a square image (aspect ratio 1:1) to avoid distortion, as the image will be scaled to fit the content area. Note that the bottom right of the image will be partially covered by unit statistics.`);
    } else if (urlParams.get('cardsize') == "Standard") {
        $('#subSectionTitle').text("Heroscape Card Creator");
        $('#advImgTT').text(`To ensure the best quality, please upload a tall rectangular image (aspect ratio 467:1000) to avoid distortion, as the image will be scaled to fit the content area. Note that the bottom half of the image will be covered by unit statistics.`);
    }

    $('#heroscapeForm').on('submit', async function (event) {
        event.preventDefault(); // Prevent form submission

        // Gather form data
        const formData = {
            creator: $('#creator').val().trim(),
            unitGeneral: $('#unitGeneral').val().trim(),
            unitName: $('#unitName').val().trim(),
            unitRace: $('#unitRace').val().trim(),
            unitRole: $('#unitRole').val().trim(),
            unitPersonality: $('#unitPersonality').val().trim(),
            unitPlanet: $('#unitPlanet').val().trim(),
            unitType: $('#unitType').val().trim(),
            unitRarity: $('#unitRarity').val().trim(),
            unitSizeCategory: $('#unitSizeCategory').val().trim(),
            unitSize: $('#unitSize').val().trim(),
            life: $('#life').val().trim(),
            advancedMove: $('#advancedMove').val().trim(),
            advancedRange: $('#advancedRange').val().trim(),
            advancedAttack: $('#advancedAttack').val().trim(),
            advancedDefense: $('#advancedDefense').val().trim(),
            points: $('#points').val().trim(),
            basicMove: $('#basicMove').val().trim(),
            basicRange: $('#basicRange').val().trim(),
            basicAttack: $('#basicAttack').val().trim(),
            basicDefense: $('#basicDefense').val().trim(),
            hitboxImage: URL.createObjectURL($('#hitboxImage')[0].files[0]), // File upload
            unitImageAdvanced: URL.createObjectURL($('#unitImageAdvanced')[0].files[0]), // File upload
            unitImageBasic: $('#unitImageBasic')[0]?.files[0] ? URL.createObjectURL($('#unitImageBasic')[0].files[0]) : undefined, // File upload
            set: $('#set').val().trim(),
            unitNumbers: $('#unitNumbers').val().trim(),
            numberOfUnitsInSet: $('#numberOfUnitsInSet').val().trim(),
            abilities: [] // Initialize abilities as an empty array
        };

        // Validate form data
        const missingFields = [];
        for (const [key, value] of Object.entries(formData)) {
            if (key != "creator" && key != "unitImageBasic" && !value) {
                missingFields.push(key);
            }
        }

        // Handle abilities (if applicable)
        $('#abilitiesContainer .ability-row').each(function (index, ability) {
            const abilityName = $(ability).find('input[type="text"]').val();
            const abilityText = $(ability).find('textarea').val();
            formData.abilities.push({ name: abilityName, text: abilityText });
            if (!abilityName) {
                missingFields.push(`abilityName${index + 1}`);
            }
            if (!abilityText) {
                missingFields.push(`abilityText${index + 1}`);
            }
        });

        // Display error messages
        const errorMessagesDiv = $('#errorMessages').empty();
        if (missingFields.length > 0) {
            missingFields.forEach(field => {
                const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                errorMessagesDiv.append(`<p>${fieldName} is required.</p>`);
            });
        } else {
            errorMessagesDiv.html('<p>All fields are filled out -> Generating PDF.</p>');

            var size = urlParams.get('cardsize');

            if (!size) {
                alert("Error: Unknown Card Size!")
                window.location.href = './';
            }

            let doc = initializePDF(size);
            await generateIndexCard(doc, formData, size);
            await savePDF(doc, `Index_${size}_${formData.unitName.replace(" ", "_")}.pdf`);
        }
    });

    $('#addAbilityBtn').on('click', addAbility);

    var testing = urlParams.get('test');
    if (testing) {
        filloutForm();
    }
});