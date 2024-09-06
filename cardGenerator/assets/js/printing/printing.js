import { downloadAllAsZip } from '../cardMaker/fileHelper.js';

const standardAssets = [
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Aquilla/AoA-Aquilla.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Aquilla/AquillaBack_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Aquilla/AquillaFront_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Aquilla/AquillaCover.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Einar/AoA-Einar.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Einar/EinarBack_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Einar/EinarFront_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Einar/EinarCover.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Jandar/AoA-Jandar.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Jandar/JandarBack_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Jandar/JandarFront_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Jandar/JandarCover.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Revna/AoA-Revna.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Ullar/AoA-Ullar.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Ullar/UllarBack_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Ullar/UllarFront_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Ullar/UllarCover.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Utgar/AoA-Utgar.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Utgar/UtgarBack_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Utgar/UtgarFront_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Utgar/UtgarCover.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Valkrill/ValkrillBack_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Valkrill/ValkrillFront_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Valkrill/ValkrillCover.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Vydar/AoA-Vydar.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Vydar/VydarBack_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Vydar/VydarFront_EW.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Vydar/VydarCover.png',
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
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Aquilla/AquillaBack_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Aquilla/AquillaFront_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Einar/EinarBack_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Einar/EinarFront_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Jandar/JandarBack_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Jandar/JandarFront_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Ullar/UllarBack_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Ullar/UllarFront_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Utgar/UtgarBack_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Utgar/UtgarFront_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Valkrill/ValkrillBack_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Valkrill/ValkrillFront_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Vydar/VydarBack_3x5.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Vydar/VydarFront_3x5.png',
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
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Aquilla/AquillaBack_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Aquilla/AquillaFront_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Einar/EinarBack_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Einar/EinarFront_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Jandar/JandarBack_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Jandar/JandarFront_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Ullar/UllarBack_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Ullar/UllarFront_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Utgar/UtgarBack_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Utgar/UtgarFront_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Valkrill/ValkrillFront_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Valkrill/ValkrillBack_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Vydar/VydarBack_4x6.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Vydar/VydarFront_4x6.png',
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
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/UncommonSquad.webp',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/CommonHero.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/CommonSquad.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Huge.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Large.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Medium.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Small.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/Tier.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/UncommonHero.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/UniqueHero.png',
    'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/object/public/card_blanks/UniqueSquad.png'
]

// Add event listener to the "Download All" button
$('#download-4x6-assets').on('click', function () {
    var $spinner = $(this).find('.spinner');
    $spinner.css('display', 'inline-block');

    downloadAllAsZip(fourBySixAssets, `4x6ImageAssets.zip`).finally(function () {
        $spinner.css('display', 'none');
    });
});