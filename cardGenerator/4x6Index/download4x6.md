---
layout: default
title: Heroscape 4x6 Index Cards
subSectionTitle: Heroscape 4x6 Index Cards
scripts: 
    - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
    - 'https://cdn.jsdelivr.net/npm/aws-sdk/dist/aws-sdk.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js'
moduleScripts:
  - '/cardGenerator/assets/js/pdfPage/pdfPage.js'
---
<input id="cardType" type="hidden" value="4x6_Army_Card" />
<!-- <button id="download-all">Download All<span class="spinner" id="spinner"></span></button> -->
<button id="download" class="btn btn-primary" data-size="4x6">Download PDF for Print<span class="spinner" id="spinner"></span></button>
<div class="container">
  <div class="row" id="pdf-gallery">
      <!-- Thumbnails will be dynamically added here -->
  </div>
</div>