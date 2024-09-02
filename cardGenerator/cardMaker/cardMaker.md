---
layout: default
title: Card Creator
subSectionTitle: Origional Heroscape Cards
css:
    # - '/cardGenerator/assets/css/cardMaker.css'
    - 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
scripts:
    - 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js'
    - 'https://unpkg.com/pdf-lib'
    - 'https://cdnjs.cloudflare.com/ajax/libs/compressorjs/1.1.1/compressor.min.js'
    - 'https://cdn.jsdelivr.net/npm/aws-sdk/dist/aws-sdk.min.js'
moduleScripts:
  - '/cardGenerator/assets/js/cardMaker/cardMaker.js'
---
<div id="cardMaker" class="container my-4">
    <form id="heroscapeForm" class="row g-3">
        <div class="col-md-6">
            <label for="creator" class="form-label">
                Load Unit Data
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">
                        Load up the data for an existing unit.
                    </span>
                </span>
            </label>
            <select id="unit" class="form-select">
                <option value="">None</option>
            </select>
        </div>
        <div class="col-md-6">
            <label for="creator" class="form-label">
                Card Creator
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">
                        What organization originally produced this unit?
                    </span>
                </span>
            </label>
            <select id="creator" class="form-select">
                <option value="">Custom</option>
                <option value="Heroscape">Heroscape - Hasbro / Wizards of the Coast</option>
                <option value="Renegade">Heroscape - Renegade</option>
                <option value="C3V">C3V - Classic Custom Creators of Valhalla</option>
                <option value="SoV">SoV - Soldiers of Valhalla</option>
                <option value="NGC">NGC - New Generation Customs</option>
                <option value="C3G">C3G - Comic Custom Creators Guild</option>
            </select>
        </div>
        <div class="col-md-6">
            <label for="unitGeneral" class="form-label">
                General
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">
                        Select the general the unit belongs to.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/General.png" alt="Unit General Image">
                    </span>
                </span>
            </label>
            <select id="unitGeneral" class="form-select">
                <option value="Aquilla">Aquilla</option>
                <option value="Einar">Einar</option>
                <option value="Jandar">Jandar</option>
                <option value="Ullar">Ullar</option>
                <option value="Utgar">Utgar</option>
                <option value="Revna">Revna</option>
                <option value="Valkrill">Valkrill</option>
                <option value="Vydar">Vydar</option>
            </select>
        </div>
        <div class="col-md-6">
            <label for="unitName" class="form-label">
                Unit Name
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the name of the unit.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/Unit.pngZ" alt="Unit name image">
                    </span>
                </span>
            </label>
            <input type="text" id="unitName" class="form-control" maxlength="35">
        </div>

        <div class="col-md-6">
            <label for="unitRace" class="form-label">
                Unit Race
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the race of the unit. Such as Human, Marro, Dragon, Kyrie.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/race.png" alt="race image">
                    </span>
                </span>
            </label>
            <input type="text" id="unitRace" class="form-control" maxlength="12">
        </div>

        <div class="col-md-6">
            <label for="unitRole" class="form-label">
                Unit Role
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the role of the unit.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/role.png" alt="role image">
                    </span>
                </span>
            </label>
            <input type="text" id="unitRole" class="form-control" maxlength="12">
        </div>

        <div class="col-md-6">
            <label for="unitPersonality" class="form-label">
                Unit Personality
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the personality of the unit.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/personality.png" alt="personality image">
                    </span>
                </span>
            </label>
            <input type="text" id="unitPersonality" class="form-control" maxlength="12">
        </div>

        <div class="col-md-6">
            <label for="unitPlanet" class="form-label">
                Unit Planet
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the planet of origin for the unit.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/planet.png" alt="planet image">
                    </span>
                </span>
            </label>
            <input type="text" id="unitPlanet" class="form-control" maxlength="12">
        </div>

        <div class="col-md-6">
            <label for="unitRarity" class="form-label">
                Unit Rarity
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Select the rarity of the unit.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/rarity.png" alt="rarity image">
                    </span>
                </span>
            </label>
            <select id="unitRarity" class="form-select">
                <option value="Unique">Unique</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Common">Common</option>
            </select>
        </div>

        <div class="col-md-6">
            <label for="unitType" class="form-label">
                Unit Type
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Select whether the unit is a Hero or a Squad.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/heroOSquad.png" alt="Hero or squad image">
                    </span>
                </span>
            </label>
            <select id="unitType" class="form-select">
                <option value="Hero">Hero</option>
                <option value="Squad">Squad</option>
            </select>
        </div>

        <div class="col-md-6">
            <label for="unitSizeCategory" class="form-label">
                Unit Size Category
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Select the size category of the unit.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/sizecat.png" alt="size category image">
                    </span>
                </span>
            </label>
            <select id="unitSizeCategory" class="form-select">
                <option value="Huge">Huge</option>
                <option value="Large">Large</option>
                <option value="Medium">Medium</option>
                <option value="Small">Small</option>
            </select>
        </div>

        <div class="col-md-6">
            <label for="unitSize" class="form-label">
                Unit Size
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the size of the unit.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/size.png" alt="size image">
                    </span>
                </span>
            </label>
            <input type="number" id="unitSize" class="form-control">
        </div>

        <div class="col-md-6">
            <label class="form-label">
                Abilities
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the abilities of the unit.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/ability.png" alt="ability image">
                    </span>
                </span>
            </label>
            <button type="button" class="btn btn-outline-primary btn-sm" id="addAbilityBtn">Add Ability +</button>
            <div id="abilitiesContainer" class="mt-3 container"></div>
        </div>

        <div class="col-md-6">
            <label for="life" class="form-label">
                Life
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the life value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/life.png" alt="life image">
                    </span>
                </span>
            </label>
            <input type="number" id="life" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="advancedMove" class="form-label">
                Advanced Move
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the advanced move value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/a_move.png" alt="Adv move image">
                    </span>
                </span>
            </label>
            <input type="number" id="advancedMove" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="advancedRange" class="form-label">
                Advanced Range
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the advanced range value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/a_range.png" alt="Adv range image">
                    </span>
                </span>
            </label>
            <input type="number" id="advancedRange" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="advancedAttack" class="form-label">
                Advanced Attack
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the advanced attack value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/a_attack.png" alt="Adv attack image">
                    </span>
                </span>
            </label>
            <input type="number" id="advancedAttack" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="advancedDefense" class="form-label">
                Advanced Defense
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the advanced defense value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/a_defence.png" alt="Adv defense image">
                    </span>
                </span>
            </label>
            <input type="number" id="advancedDefense" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="points" class="form-label">
                Points
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the points value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/points.png" alt="points image">
                    </span>
                </span>
            </label>
            <input type="number" id="points" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="basicMove" class="form-label">
                Basic Move
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the basic move value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/b_move.png" alt="basic move image">
                    </span>
                </span>
            </label>
            <input type="number" id="basicMove" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="basicRange" class="form-label">
                Basic Range
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the basic range value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/b_range.png" alt="basic range image">
                    </span>
                </span>
            </label>
            <input type="number" id="basicRange" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="basicAttack" class="form-label">
                Basic Attack
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the basic attack value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/b_attack.png" alt="basic attack image">
                    </span>
                </span>
            </label>
            <input type="number" id="basicAttack" class="form-control">
        </div>

        <div class="col-md-6">
            <label for="basicDefense" class="form-label">
                Basic Defense
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the basic defense value.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/b_defense.png" alt="basic defense image">
                    </span>
                </span>
            </label>
            <input type="number" id="basicDefense" class="form-control">
        </div>
        <!-- Image Uploads -->
        <div class="col-md-6">
            <label for="hitboxImage" class="form-label">
                Hitbox Image
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">This image will maintain its aspect ratio and will be scaled and centered to fit. It is highly recommended you use a transparent background.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/hitbox.png" alt="hitbox image">
                    </span>
                </span>
            </label>
            <input type="file" id="hitboxImage" class="form-control" accept="image/*">
        </div>
        <div class="col-md-6">
            <label for="unitImageAdvanced" class="form-label">
                Unit Image Advanced
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext advImgTT">
                        <span id="advImgTT"></span>
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/adv_unit_image.png" alt="advanced unit image">
                    </span>
                </span>
            </label>
            <input type="file" id="unitImageAdvanced" class="form-control" accept="image/*">
        </div>
        <div class="col-md-6">
            <label for="unitImageBasic" class="form-label">
                Unit Image Basic
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">To ensure the best quality, please upload a wide rectangular image (aspect ratio 3:2) to avoid distortion, as the image will be scaled to fit the content area. Note that the bottom half of the image will be covered by unit statistics.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/basic_unit_image.png" alt="basic unit image">
                    </span>
                </span>
            </label>
            <input type="file" id="unitImageBasic" class="form-control" accept="image/*">
        </div>
        <!-- Set and Numbers -->
        <div class="col-md-6">
            <label for="set" class="form-label">
                Set
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the set the unit belongs to.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/set.png" alt="set image">
                    </span>
                </span>
            </label>
            <input type="text" id="set" class="form-control">
        </div>
        <div class="col-md-6">
            <label for="unitNumbers" class="form-label">
                Unit number(s)
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the unit number(s).
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/unit_num.png" alt="unit number image">
                    </span>
                </span>
            </label>
            <input type="text" id="unitNumbers" class="form-control">
        </div>
        <div class="col-md-6">
            <label for="numberOfUnitsInSet" class="form-label">
                Number of units in set
                <span class="custom-tooltip">[?]
                    <span class="custom-tooltiptext">Enter the number of units in the set.
                        <br><img src="https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/tooltips/total_units.png" alt="unit in set image">
                    </span>
                </span>
            </label>
            <input type="number" id="numberOfUnitsInSet" class="form-control">
        </div>
        <!-- Submit Button -->
        <div class="col-md-12">
            <button type="submit" class="btn btn-primary">Generate Heroscape Card</button>
            <button id="saveCard" class="btn btn-primary" style="display:none;">Save Card</button>
        </div>
    </form>
    <div id="errorMessages" class="text-danger mt-3"></div>
</div>