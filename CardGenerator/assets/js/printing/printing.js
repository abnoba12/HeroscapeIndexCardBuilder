import { downloadAllAsZip } from '../cardMaker/fileHelper.js';

const standardAssets = [
    '/cardGenerator/assets/images/blanks/Aquilla/AoA-Aquilla.png',
    '/cardGenerator/assets/images/blanks/Aquilla/AquillaBack_EW.png',
    '/cardGenerator/assets/images/blanks/Aquilla/AquillaFront_EW.png',
    '/cardGenerator/assets/images/blanks/Aquilla/AquillaCover.png',
    '/cardGenerator/assets/images/blanks/Einar/AoA-Einar.png',
    '/cardGenerator/assets/images/blanks/Einar/EinarBack_EW.png',
    '/cardGenerator/assets/images/blanks/Einar/EinarFront_EW.png',
    '/cardGenerator/assets/images/blanks/Einar/EinarCover.png',
    '/cardGenerator/assets/images/blanks/Jandar/AoA-Jandar.png',
    '/cardGenerator/assets/images/blanks/Jandar/JandarBack_EW.png',
    '/cardGenerator/assets/images/blanks/Jandar/JandarFront_EW.png',
    '/cardGenerator/assets/images/blanks/Jandar/JandarCover.png',
    '/cardGenerator/assets/images/blanks/Revna/AoA-Revna.png',
    '/cardGenerator/assets/images/blanks/Ullar/AoA-Ullar.png',
    '/cardGenerator/assets/images/blanks/Ullar/UllarBack_EW.png',
    '/cardGenerator/assets/images/blanks/Ullar/UllarFront_EW.png',
    '/cardGenerator/assets/images/blanks/Ullar/UllarCover.png',
    '/cardGenerator/assets/images/blanks/Utgar/AoA-Utgar.png',
    '/cardGenerator/assets/images/blanks/Utgar/UtgarBack_EW.png',
    '/cardGenerator/assets/images/blanks/Utgar/UtgarFront_EW.png',
    '/cardGenerator/assets/images/blanks/Utgar/UtgarCover.png',
    '/cardGenerator/assets/images/blanks/Valkrill/ValkrillBack_EW.png',
    '/cardGenerator/assets/images/blanks/Valkrill/ValkrillFront_EW.png',
    '/cardGenerator/assets/images/blanks/Valkrill/ValkrillCover.png',
    '/cardGenerator/assets/images/blanks/Vydar/AoA-Vydar.png',
    '/cardGenerator/assets/images/blanks/Vydar/VydarBack_EW.png',
    '/cardGenerator/assets/images/blanks/Vydar/VydarFront_EW.png',
    '/cardGenerator/assets/images/blanks/Vydar/VydarCover.png',
    '/cardGenerator/assets/images/logos/C3G_dark.png',
    '/cardGenerator/assets/images/logos/C3G.png',
    '/cardGenerator/assets/images/logos/C3V_dark.png',
    '/cardGenerator/assets/images/logos/C3V.png',
    '/cardGenerator/assets/images/logos/Heroscape_dark.png',
    '/cardGenerator/assets/images/logos/Heroscape.png',
    '/cardGenerator/assets/images/logos/NGC_dark.png',
    '/cardGenerator/assets/images/logos/NGC.png',
    '/cardGenerator/assets/images/logos/Renegade_dark.png',
    '/cardGenerator/assets/images/logos/Renegade.png',
    '/cardGenerator/assets/images/logos/SoV_dark.png',
    '/cardGenerator/assets/images/logos/SoV.png',
    '/cardGenerator/assets/images/borders/Aquilla_Cut_Line_Single.png',
    '/cardGenerator/assets/images/borders/CutMarks.png',
    '/cardGenerator/assets/images/borders/Einar_Cut_Line_Single.png',
    '/cardGenerator/assets/images/borders/Jandar_Cut_Line_Single.png',
    '/cardGenerator/assets/images/borders/Ullar_Cut_Line_Single.png',
    '/cardGenerator/assets/images/borders/Utgar_Cut_Line_Single.png',
    '/cardGenerator/assets/images/borders/Varkrill_Cut_Line_Single.png',
    '/cardGenerator/assets/images/borders/Vydar_Cut_Line_Single.png'
]

// Add event listener to the "Download All" button
$('#download-standard-assets').on('click', function () {
    var $spinner = $(this).find('.spinner');
    $spinner.css('display', 'inline-block');

    downloadAllAsZip(standardAssets, `StandardImageAssets.zip`).finally(function () {
        $spinner.css('display', 'none');
    });
});

const threeByFiveAssets = [
    '/cardGenerator/assets/images/blanks/Aquilla/AquillaBack_3x5.png',
    '/cardGenerator/assets/images/blanks/Aquilla/AquillaFront_3x5.png',
    '/cardGenerator/assets/images/blanks/Einar/EinarBack_3x5.png',
    '/cardGenerator/assets/images/blanks/Einar/EinarFront_3x5.png',
    '/cardGenerator/assets/images/blanks/Jandar/JandarBack_3x5.png',
    '/cardGenerator/assets/images/blanks/Jandar/JandarFront_3x5.png',
    '/cardGenerator/assets/images/blanks/Ullar/UllarBack_3x5.png',
    '/cardGenerator/assets/images/blanks/Ullar/UllarFront_3x5.png',
    '/cardGenerator/assets/images/blanks/Utgar/UtgarBack_3x5.png',
    '/cardGenerator/assets/images/blanks/Utgar/UtgarFront_3x5.png',
    '/cardGenerator/assets/images/blanks/Valkrill/ValkrillFront_3x5.png',
    '/cardGenerator/assets/images/blanks/Valkrill/ValkrillBack_3x5.png',
    '/cardGenerator/assets/images/blanks/Vydar/VydarBack_3x5.png',
    '/cardGenerator/assets/images/blanks/Vydar/VydarFront_3x5.png',
    '/cardGenerator/assets/images/logos/C3G_dark.png',
    '/cardGenerator/assets/images/logos/C3G.png',
    '/cardGenerator/assets/images/logos/C3V_dark.png',
    '/cardGenerator/assets/images/logos/C3V.png',
    '/cardGenerator/assets/images/logos/Heroscape_dark.png',
    '/cardGenerator/assets/images/logos/Heroscape.png',
    '/cardGenerator/assets/images/logos/NGC_dark.png',
    '/cardGenerator/assets/images/logos/NGC.png',
    '/cardGenerator/assets/images/logos/Renegade_dark.png',
    '/cardGenerator/assets/images/logos/Renegade.png',
    '/cardGenerator/assets/images/logos/SoV_dark.png',
    '/cardGenerator/assets/images/logos/SoV.png'
]

// Add event listener to the "Download All" button
$('#download-3x5-assets').on('click', function () {
    var $spinner = $(this).find('.spinner');
    $spinner.css('display', 'inline-block');

    downloadAllAsZip(threeByFiveAssets, `3x5ImageAssets.zip`).finally(function () {
        $spinner.css('display', 'none');
    });
});

const fourBySixAssets = [
    '/cardGenerator/assets/images/blanks/Aquilla/AquillaBack_4x6.png',
    '/cardGenerator/assets/images/blanks/Aquilla/AquillaFront_4x6.png',
    '/cardGenerator/assets/images/blanks/Einar/EinarBack_4x6.png',
    '/cardGenerator/assets/images/blanks/Einar/EinarFront_4x6.png',
    '/cardGenerator/assets/images/blanks/Jandar/JandarBack_4x6.png',
    '/cardGenerator/assets/images/blanks/Jandar/JandarFront_4x6.png',
    '/cardGenerator/assets/images/blanks/Ullar/UllarBack_4x6.png',
    '/cardGenerator/assets/images/blanks/Ullar/UllarFront_4x6.png',
    '/cardGenerator/assets/images/blanks/Utgar/UtgarBack_4x6.png',
    '/cardGenerator/assets/images/blanks/Utgar/UtgarFront_4x6.png',
    '/cardGenerator/assets/images/blanks/Valkrill/ValkrillFront_4x6.png',
    '/cardGenerator/assets/images/blanks/Valkrill/ValkrillBack_4x6.png',
    '/cardGenerator/assets/images/blanks/Vydar/VydarBack_4x6.png',
    '/cardGenerator/assets/images/blanks/Vydar/VydarFront_4x6.png',
    '/cardGenerator/assets/images/logos/C3G_dark.png',
    '/cardGenerator/assets/images/logos/C3G.png',
    '/cardGenerator/assets/images/logos/C3V_dark.png',
    '/cardGenerator/assets/images/logos/C3V.png',
    '/cardGenerator/assets/images/logos/Heroscape_dark.png',
    '/cardGenerator/assets/images/logos/Heroscape.png',
    '/cardGenerator/assets/images/logos/NGC_dark.png',
    '/cardGenerator/assets/images/logos/NGC.png',
    '/cardGenerator/assets/images/logos/Renegade_dark.png',
    '/cardGenerator/assets/images/logos/Renegade.png',
    '/cardGenerator/assets/images/logos/SoV_dark.png',
    '/cardGenerator/assets/images/logos/SoV.png',
    '/cardGenerator/assets/images/blanks/UncommonSquad.webp',
    '/cardGenerator/assets/images/blanks/CommonHero.png',
    '/cardGenerator/assets/images/blanks/CommonSquad.png',
    '/cardGenerator/assets/images/blanks/Huge.png',
    '/cardGenerator/assets/images/blanks/Large.png',
    '/cardGenerator/assets/images/blanks/Medium.png',
    '/cardGenerator/assets/images/blanks/Small.png',
    '/cardGenerator/assets/images/blanks/Tier.png',
    '/cardGenerator/assets/images/blanks/UncommonHero.png',
    '/cardGenerator/assets/images/blanks/UniqueHero.png',
    '/cardGenerator/assets/images/blanks/UniqueSquad.png'
]

// Add event listener to the "Download All" button
$('#download-4x6-assets').on('click', function () {
    var $spinner = $(this).find('.spinner');
    $spinner.css('display', 'inline-block');

    downloadAllAsZip(fourBySixAssets, `4x6ImageAssets.zip`).finally(function () {
        $spinner.css('display', 'none');
    });
});