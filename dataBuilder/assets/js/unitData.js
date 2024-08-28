import { createThumbnail } from '/cardGenerator/assets/js/pdfPage/pdfThumb.js'

$(document).ready(async function () {
    var armyCards = await fetchArmyCards();
    await addImagePlaceholders(armyCards);
    armyCards.forEach(item => {
        item.Name = item.Name.toUpperCase();
        item.Set = item?.Set?.name;
        if (Array.isArray(item.army_card_abilities)) {
            item.army_card_abilities = item.army_card_abilities
                .map(ability => `${ability.abilityname}: ${ability.ability}`)
                .join('<br /><br />'); // Join with line breaks
        }
    });
    await generateTable(armyCards);

    const $sidebar = $('#sidebar');
    const $content = $('#table_content');
    const $toggleBtn = $('#toggle-sidebar');

    $toggleBtn.on('click', function () {
        $sidebar.toggleClass('collapsed');
        $content.toggleClass('expanded');
    });

    addModalCellClick();

    await addImages(armyCards);
});

async function fetchArmyCards() {
    return await cacheHelper.manageCache('data-cache', `UnitData-fetchArmyCards`, async () => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `https://dnqjtsaxybwrurmucsaa.supabase.co/rest/v1/army_card?select=Creator,General,Name,AdvAttack,AdvDefense,AdvMove,AdvRange,BasicAttack,BasicDefense,BasicMove,BasicRange,Life,Personality,Planet,
                    Points,Race,Rarity,Role,Size,SizeCategory,Type,UnitNumbers,UnitsInSet,Set(*),army_card_abilities(*),army_card_files(*)&order=Name`,
                method: 'GET',
                headers: {
                    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucWp0c2F4eWJ3cnVybXVjc2FhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMzA2ODMsImV4cCI6MjAzODYwNjY4M30.sgt6aQlrLAnPWoTx4LY6qIGu4YYGEoSQJHfz0tzBBwE',
                    'Content-Type': 'application/json'
                }
            })
                .done(data => resolve(data))
                .fail((jqXHR, textStatus, errorThrown) => reject(new Error(`Request failed: ${textStatus}, ${errorThrown}`)));
        });
    }, new Date(new Date().setDate(new Date().getDate() - 1)));
}

function generateTable(data) {
    return new Promise((resolve, reject) => {
        const $table = $('#datatable');
        const $columnControls = $('#column-controls');
        const hidden = ['army_card_files', 'AdvAttack', 'AdvDefense', 'AdvMove', 'AdvRange', 'BasicAttack', 'BasicDefense', 'BasicMove', 'BasicRange', 'Life', 'Personality', 'Planet',
            'Race', 'Rarity', 'Role', 'Size', 'SizeCategory', 'Type', 'UnitNumbers', 'UnitsInSet', 'Set', 'Origional', 'ThreeByFive', 'FourBySix'];
        //'Points',

        var ColumnOrder = ["Creator", "General", "Name", "Thumb", "AdvAttack", "AdvDefense", "AdvMove", "AdvRange", "BasicAttack", "BasicDefense", "BasicMove", "BasicRange", "Life", "Personality", "Planet", "Points",
            "Race", "Rarity", "Role", "Set", "Size", "SizeCategory", "Type", "UnitNumbers", "UnitsInSet", "army_card_abilities", "Origional", "ThreeByFive", "FourBySix", "army_card_files"];

        for (var i = 0; i < data.length; i++) {
            var d = data[i];
            var OrderedData = {};
            ColumnOrder.forEach(key => {
                if (d.hasOwnProperty(key)) {
                    OrderedData[key] = d[key];
                }
            });
            data[i] = OrderedData;
        }

        // Create the table header and prepare column definitions for DataTables
        const headers = Object.keys(data[0]);
        const columns = headers.map((key, index) => ({
            title: key?.charAt(0)?.toUpperCase() + key.slice(1),
            data: key,
            visible: !hidden.includes(key),
        }));

        // Initialize DataTable
        const table = $table.DataTable({
            colReorder: true, // Enable colReorder extension
            columnDefs: [
                { className: "wide-column", targets: [2] },  // Apply class to important columns
            ],
            order: [[2, 'asc']],
            pageLength: 25,
            data: data,
            columns: columns,
            autoWidth: true, // Disable automatic column width calculation
            responsive: true, // Disable responsive table behavior
            scrollX: false, // Enable horizontal scrolling if needed
            scrollCollapse: false // Don't shrink table, allow it to extend beyond viewport
        });
        var tableWidth = $(table).outerWidth();
        $('body').css('width', tableWidth);

        table.on('draw', async function () {
            await addImages(data);
        });

        // Generate checkboxes for each column
        headers.forEach((key, index) => {
            const checked = !hidden.includes(key) ? 'checked' : '';
            if (key != 'army_card_files') {
                const $checkbox = $(`<label><input type="checkbox" class="col-toggle" data-column-index="${index}" ${checked}> ${key?.charAt(0)?.toUpperCase() + key.slice(1)}</label>`);
                $columnControls.append($checkbox);
            }
        });

        // Handle column visibility based on checkbox state
        $('.col-toggle').change(function () {
            const columnIndex = $(this).data('column-index');
            const column = table.column(columnIndex);
            column.visible($(this).is(':checked'));
            table.draw();
        });

        // Generate checkboxes for each creator
        data.map(u => u.Creator).filter((value, index, self) => self.indexOf(value) === index).sort().forEach((key) => {
            const $checkbox = $(`<label><input type="checkbox" class="creator-toggle" value="${key}"> ${key?.charAt(0)?.toUpperCase() + key.slice(1)}</label>`);
            $('#creator-controls').append($checkbox);
        });

        // Generate checkboxes for each general
        data.map(u => u.General).filter((value, index, self) => self.indexOf(value) === index).sort().forEach((key, index) => {
            const $checkbox = $(`<label><input type="checkbox" class="general-toggle" value="${key}"> ${key?.charAt(0)?.toUpperCase() + key.slice(1)}</label>`);
            $('#general-controls').append($checkbox);
        });

        // Generate checkboxes for each set
        data.map(u => u.Set)?.filter((value, index, self) => self.indexOf(value) === index).sort().forEach((key) => {
            const $checkbox = $(`<label><input type="checkbox" class="set-toggle" value="${key}"> ${key?.charAt(0)?.toUpperCase() + key.slice(1)}</label>`);
            $('#set-controls').append($checkbox);
        });

        $.fn.dataTable.ext.search.push(
            function (settings, data, dataIndex) {
                var selectedGenerals = [];
                var selectedCreators = [];
                var selectedSets = [];

                // Get selected generals
                $('.general-toggle:checked').each(function () {
                    selectedGenerals.push($(this).val());
                });

                // Get selected creators
                $('.creator-toggle:checked').each(function () {
                    selectedCreators.push($(this).val());
                });

                // Get selected sets
                $('.set-toggle:checked').each(function () {
                    selectedSets.push($(this).val());
                });

                var creator = data[ColumnOrder.indexOf("Creator")]; // The "Creator" column data
                var general = data[ColumnOrder.indexOf("General")]; // The "General" column data
                var set = data[ColumnOrder.indexOf("Set")]; // The "Set" column data

                if (
                    (selectedGenerals.length === 0 || selectedGenerals.indexOf(general) !== -1) &&
                    (selectedCreators.length === 0 || selectedCreators.indexOf(creator) !== -1) &&
                    (selectedSets.length === 0 || selectedSets.indexOf(set) !== -1)
                ) {
                    return true; // Include this row
                }
                return false; // Exclude this row
            }
        );

        // Event listener for checkbox change
        $('.general-toggle, .creator-toggle, .set-toggle').on('change', function () {
            table.draw(); // Redraw the table with the new filter
        });

        resolve();
    });
}

async function addImagePlaceholders(armyCards) {
    for (var x = 0; x < armyCards.length; x++) {
        var files = armyCards[x].army_card_files;
        armyCards[x].Thumb = "";
        armyCards[x].Origional = "";
        armyCards[x].ThreeByFive = "";
        armyCards[x].FourBySix = "";

        for (var y = 0; y < files.length; y++) {
            if (files[y].file_purpose == "Card_3x5_Advanced_Image") {
                armyCards[x].Thumb = `<div id="${files[y].file_path.replace(/[^a-zA-Z0-9\-_]/g, '')}"></div>`;
            }

            if (files[y].file_purpose == "Standard_Army_Card") {
                armyCards[x].Origional = `<div id="${files[y].file_path.replace(/[^a-zA-Z0-9\-_]/g, '')}"></div>`;
            }

            if (files[y].file_purpose == "3x5_Army_Card") {
                armyCards[x].ThreeByFive = `<div id="${files[y].file_path.replace(/[^a-zA-Z0-9\-_]/g, '')}"></div>`;
            }

            if (files[y].file_purpose == "4x6_Army_Card") {
                armyCards[x].FourBySix = `<div id="${files[y].file_path.replace(/[^a-zA-Z0-9\-_]/g, '')}"></div>`;
            }
        }
    };
}

async function addImages(armyCards) {
    await Promise.all(armyCards.map(armyCard => {
        armyCard.army_card_files.map(async (file) => {
            var ele = $(`#${file.file_path.replace(/[^a-zA-Z0-9\-_]/g, '')}`);
            if (ele.is(':empty')) {
                if (file.file_path.includes(".pdf")) {
                    ele.append(await createThumbnail(file.file_path, false));
                } else {
                    var imgSrc = await cacheHelper.manageCacheImage('thumbnail-cache', file.file_path);
                    var $img = $(`<img src="${imgSrc}" width="75" height="75"/>`)
                    ele.append($img);
                }
            }
        });
    }));
}

function addModalCellClick() {
    // Get the modal
    var modal = $('#cellModal');
    var modalContent = $('#modal-text');
    var modalTitle = $('#modal-title'); // Assume you have a modal title element with this ID
    var closeBtn = $('.close');
    var excludeColumns = ["Thumb", "Origional", "ThreeByFive", "FourBySix"]; // Columns to exclude
    var table = $('#datatable').DataTable();

    // When the user clicks on a table cell, open the modal and display the cell's content
    $('#datatable tbody').on('click', 'td', function () {
        var cell = table.cell(this);
        var colIndex = cell.index().column; // Get the original column index
        console.log(`Column Index: ${colIndex}`);

        var columnHeader = table.column(colIndex).header(); // Get the column header element
        var columnTitle = $(columnHeader).text(); // Get the text of the header

        // Check if the original column index is in the exclude list
        if (!excludeColumns.includes(columnTitle)) {
            var cellContent = cell.data(); // Get the cell's content
            modalTitle.text(columnTitle); // Set the modal title with the column header text
            modalContent.html(cellContent); // Set the modal content with the HTML content
            modal.show(); // Show the modal
        } else {
            $(this).css('cursor', 'default');
        }
    });

    // When the user clicks on the close button, close the modal
    closeBtn.on('click', function () {
        modal.hide();
    });

    // When the user clicks anywhere outside of the modal content, close the modal
    $(window).on('click', function (event) {
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    });
}
