---
layout: default
title: Heroscape 3x5 Index Cards
subSectionTitle: Heroscape 3x5 Index Cards
scripts: 
    - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
    - '/assets/js/upup/upup.min.js'
moduleScripts:
  - '/cardGenerator/assets/js/pdfPage/pdfPage.js'
---
<input id="cardType" type="hidden" value="3x5_Army_Card" />
<button id="download-all">Download All<span class="spinner" id="spinner"></span></button>
<div class="container">
  <div class="row" id="pdf-gallery">
      <!-- Thumbnails will be dynamically added here -->
  </div>
</div>