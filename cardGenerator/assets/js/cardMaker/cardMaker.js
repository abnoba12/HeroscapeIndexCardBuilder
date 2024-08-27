import { filloutForm, addAbility, loadImage } from './helpers.js';
import { initializePDF, generateIndexCard, savePDF } from './generatePDF.js';
import { setAWS, saveFileToS3 } from './fileHelper.js'

// Create a URLSearchParams object from the query string
const urlParams = new URLSearchParams(window.location.search);

$(document).ready(async function () {
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

    if (urlParams.get('k') && urlParams.get('s') && urlParams.get('save')) {
        $("#saveCard").show();
        $('#saveCard').on('click', async (e) => await saveCard(e));
    }

    loadExistingUnitNameData(await fetchUnitNames());

    $('#unit').change(async function () {
        await populateUnitData($(this).val())
    });

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
            hitboxImage: $('#hitboxImage')[0]?.files[0] ? URL.createObjectURL($('#hitboxImage')[0].files[0]) : undefined, // File upload
            unitImageAdvanced: $('#unitImageAdvanced')[0]?.files[0] ? URL.createObjectURL($('#unitImageAdvanced')[0].files[0]) : undefined, // File upload
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

            var fileName = `Index_${size}_${formData.unitName.replace(/\s+/g, "_")}.pdf`;
            if (size == "Standard") {
                fileName = `${formData.unitName.replace(/\s+/g, "_")}.pdf`;

                if (formData.creator == "Renegade") {
                    fileName = `${formData.unitName.replace(/\s+/g, "_")}-OG.pdf`;
                }
            }

            await savePDF(doc, fileName);
        }
    });

    $('#addAbilityBtn').on('click', () => addAbility());

    var testing = urlParams.get('test');
    if (testing) {
        filloutForm();
    }
});

function loadExistingUnitNameData(unitNameData) {
    var dropdown = $('#heroscapeForm #unit');

    for (var i = 0; i < unitNameData.length; i++) {
        var x = unitNameData[i];
        var t = x.Name;
        t = x.Creator != 'Heroscape' ? `(${x.Creator}) ${t}` : t;
        t = nameCount(unitNameData, x.Name) > 1 ? `${t}-${x.Set.name}` : t;
        unitNameData[i].formattedName = t;
        dropdown.append(`<option value="${x.id}">${t}</option>`);
    }
}

async function populateUnitData(id) {
    var data = await fetchUnitData(id);
    if (data && data[0]) {
        var d = data[0];
        //console.log(d);
        $('#creator').val(d.Creator);
        $('#unitGeneral').val(d.General);
        $('#unitName').val(d.Name);
        $('#unitRace').val(d.Race);
        $('#unitRole').val(d.Role);
        $('#unitPersonality').val(d.Personality);
        $('#unitPlanet').val(d.Planet);
        $('#unitType').val(d.Type);
        $('#unitRarity').val(d.Rarity);
        $('#unitSizeCategory').val(d.SizeCategory);
        $('#unitSize').val(d.Size);
        $('#life').val(d.Life);
        $('#advancedMove').val(d.AdvMove);
        $('#advancedRange').val(d.AdvRange);
        $('#advancedAttack').val(d.AdvAttack);
        $('#advancedDefense').val(d.AdvDefense);
        $('#points').val(d.Points);
        $('#basicMove').val(d.BasicMove);
        $('#basicRange').val(d.BasicRange);
        $('#basicAttack').val(d.BasicAttack);
        $('#basicDefense').val(d.BasicDefense);
        $('#set').val(d.Set?.name);
        $('#unitNumbers').val(d.UnitNumbers);
        $('#numberOfUnitsInSet').val(d.UnitsInSet);

        if (d.army_card_abilities && d.army_card_abilities.length) {
            $('#abilitiesContainer .ability-row').remove();
            d.army_card_abilities.forEach(a => {
                addAbility(a.abilityname, a.ability);
            });
        }

        if (d.army_card_files && d.army_card_files.length) {
            var hb = d.army_card_files.filter(x => x.file_purpose == "Card_Hitbox_Image");
            var b = d.army_card_files.filter(x => x.file_purpose == "Card_Basic_Image");
            var adv;
            if (urlParams.get('cardsize') == "3x5") {
                adv = d.army_card_files.filter(x => x.file_purpose == "Card_3x5_Advanced_Image");
                b = undefined
            } else if (urlParams.get('cardsize') == "4x6") {
                adv = d.army_card_files.filter(x => x.file_purpose == "Card_4x6_Advanced_Image");
            } else if (urlParams.get('cardsize') == "Standard") {
                adv = d.army_card_files.filter(x => x.file_purpose == "Card_Advanced_Image_Standard");
            }

            if (adv && adv.length) {
                // Load and set the advanced unit image
                loadImage(adv[0].file_path, $('#unitImageAdvanced'));
            } else {
                $('#unitImageAdvanced').val('')
            }

            if (hb && hb.length) {
                // Load and set the hitbox image
                loadImage(hb[0].file_path, $('#hitboxImage'));
            } else {
                $('#hitboxImage').val('')
            }

            if (b && b.length) {
                // Load and set the basic unit image
                loadImage(b[0].file_path, $('#unitImageBasic'));
            } else {
                $('#unitImageBasic').val('')
            }
        }
    }
}

function fetchUnitNames() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://dnqjtsaxybwrurmucsaa.supabase.co/rest/v1/army_card?select=id,Creator,Name,Set(*)&order=Name.asc',
            method: 'GET',
            headers: {
                //'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucWp0c2F4eWJ3cnVybXVjc2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMzA2ODMsImV4cCI6MjAzODYwNjY4M30.sgt6aQlrLAnPWoTx4LY6qIGu4YYGEoSQJHfz0tzBBwE',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucWp0c2F4eWJ3cnVybXVjc2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMzA2ODMsImV4cCI6MjAzODYwNjY4M30.sgt6aQlrLAnPWoTx4LY6qIGu4YYGEoSQJHfz0tzBBwE',
                'Content-Type': 'application/json'
            }
        })
            .done(data => resolve(data))
            .fail((jqXHR, textStatus, errorThrown) => reject(new Error(`Request failed: ${textStatus}, ${errorThrown}`)));
    });
}

function nameCount(unitNameData, name) {
    return unitNameData.reduce((count, item) => {
        return count + (item.Name.replace(/\s+/g, '').toLowerCase() === name.replace(/\s+/g, '').toLowerCase() ? 1 : 0);
    }, 0);
}

function fetchUnitData(unitId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://dnqjtsaxybwrurmucsaa.supabase.co/rest/v1/army_card?select=*,Set(*),army_card_abilities(*),army_card_files(*)&id=eq.${unitId}`,
            method: 'GET',
            headers: {
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucWp0c2F4eWJ3cnVybXVjc2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMzA2ODMsImV4cCI6MjAzODYwNjY4M30.sgt6aQlrLAnPWoTx4LY6qIGu4YYGEoSQJHfz0tzBBwE',
                'Content-Type': 'application/json'
            }
        })
            .done(data => resolve(data))
            .fail((jqXHR, textStatus, errorThrown) => reject(new Error(`Request failed: ${textStatus}, ${errorThrown}`)));
    });
}

async function saveCard(event) {
    event.preventDefault();

    var k = urlParams.get('k');
    var s = urlParams.get('s');
    var save = urlParams.get('save');
    if (k && s && save) {
        const s3 = setAWS(k, s)
        var cardSize = urlParams.get('cardsize');

        var status = "";

        //Save the images to S3 Storage and then to the database
        status += JSON.stringify(await saveCardAssetToStorageAndDB(s3, '#hitboxImage', cardSize));
        status += "\n\n";
        status += JSON.stringify(await saveCardAssetToStorageAndDB(s3, '#unitImageAdvanced', cardSize));
        status += "\n\n";
        status += JSON.stringify(await saveCardAssetToStorageAndDB(s3, '#unitImageBasic', cardSize));
        status += "\n\n";

        //The generate PDFs are too large for storage until they have been compressed, so make a entry in the database, but don't upload the file
        //This will make a broken link for now
        var fileName;
        var unitName = $('#unitName').val().trim().replace(/\s+/g, "_");
        switch (cardSize) {
            case "3x5":
                fileName = `Index_3x5_${unitName}.pdf`;
                break;
            case '4x6':
                fileName = `Index_4x6_${unitName}.pdf`;
                break;
            case 'Standard':
                fileName = `${unitName}.pdf`;
                if ($('#creator').val() == "Renegade") {
                    status += JSON.stringify(await addArmyCardFileEntry({
                        army_card_id: $('#unit').val(),
                        file_path: `https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/PDFs/${cardSize.toLowerCase()}/${fileName}`,
                        file_purpose: `${cardSize}_Army_Card`
                    }, $('#creator').val() == "Renegade"));

                    fileName = `${unitName}-OG.pdf`;
                }
                break;
        }

        status += JSON.stringify(await addArmyCardFileEntry({
            army_card_id: $('#unit').val(),
            file_path: `https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/PDFs/${cardSize.toLowerCase()}/${fileName}`,
            file_purpose: `${cardSize}_Army_Card`
        }, $('#creator').val() == "Renegade"));

        alert(status);
    } else {
        alert("Nope");
    }
}

async function saveCardAssetToStorageAndDB(s3, selector, cardSize) {
    var f = $(selector)[0];
    if (f) {
        var filePurpose;
        var path;

        switch (selector) {
            case "#hitboxImage":
                path = `card_assets/Hitbox`;
                filePurpose = 'Card_Hitbox_Image';
                break;
            case "#unitImageAdvanced":
                path = `card_assets/${cardSize}`;
                switch (cardSize) {
                    case "3x5":
                        filePurpose = 'Card_3x5_Advanced_Image';
                        break;
                    case '4x6':
                        filePurpose = 'Card_4x6_Advanced_Image';
                        break;
                    case 'Standard':
                        filePurpose = 'Card_Advanced_Image_Standard';
                        break;
                }
                break;
            case "#unitImageBasic":
                path = `card_assets/Basic`;
                filePurpose = 'Card_Basic_Image';
                break;
        }

        //save the file to s3 storage
        var imgUrl = await saveFileToS3(s3, f, path);

        //add the URL to the database
        return await addArmyCardFileEntry({
            army_card_id: $('#unit').val(),
            file_path: imgUrl,
            file_purpose: filePurpose
        });
    }
}

function addArmyCardFileEntry(data, allowDup = false) {
    return new Promise((resolve, reject) => {
        // First, check if the entry already exists
        $.ajax({
            url: `https://dnqjtsaxybwrurmucsaa.supabase.co/rest/v1/army_card_files?army_card_id=eq.${data.army_card_id}&file_purpose=eq.${data.file_purpose}`,
            method: 'GET',
            headers: {
                'apikey': urlParams.get('save'), // Replace with your actual Supabase anon key
                'Authorization': `Bearer ${urlParams.get('save')}`, // Replace with your actual Supabase anon key
                'Content-Type': 'application/json'
            },
            success: function (existingEntries) {
                if (existingEntries.length > 0 && !allowDup) {
                    // Entry already exists, resolve without adding a duplicate
                    resolve(`Entry already exists. ${data.file_purpose} - ${data.file_path} was not added to the database.`);
                } else {
                    // Entry does not exist, proceed to add the new entry
                    $.ajax({
                        url: 'https://dnqjtsaxybwrurmucsaa.supabase.co/rest/v1/army_card_files',
                        method: 'POST',
                        headers: {
                            'apikey': urlParams.get('save'), // Replace with your actual Supabase anon key
                            'Authorization': `Bearer ${urlParams.get('save')}`, // Replace with your actual Supabase anon key
                            'Content-Type': 'application/json',
                            'Prefer': 'return=representation' // Return the created record
                        },
                        data: JSON.stringify(data), // Convert the data to JSON
                        success: function (response) {
                            resolve(response);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            reject(`Error adding entry: ${textStatus}, ${errorThrown}`);
                        }
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject(`Error checking for existing entry: ${textStatus}, ${errorThrown}`);
            }
        });
    });
}
