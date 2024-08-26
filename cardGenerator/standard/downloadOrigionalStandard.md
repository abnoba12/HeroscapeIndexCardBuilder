---
layout: default
title: Origional Heroscape Cards
subSectionTitle: Origional Heroscape Cards
scripts: 
    - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
    - '/assets/js/upup/upup.min.js'
    - 'https://cdn.jsdelivr.net/npm/aws-sdk/dist/aws-sdk.min.js'
moduleScripts:
  - '/cardGenerator/assets/js/pdfPage/pdfPage.js'
---
<input id="cardType" type="hidden" value="Standard_Army_Card" />
<section>
    <h3>Note: These cards have been obtained from various sources, and some may be of low quality. Additionally, some cards may have 
        been modified before I acquired them. During processing, I have added a △R symbol next to the Hasbro logo to clearly identify 
        these cards as reproductions. This measure helps prevent these cards from being produced and sold as originals. I am seeking 
        high-quality scans at 600 DPI or above. I would greatly appreciate anyone who is willing to scan and share high-quality images 
        of their cards. Please refer to this 
        <a href="https://docs.google.com/spreadsheets/d/1krZZ8-Vqw29URCuTV1TqgFdFICMtGWUQPmpFTLoKcZE/edit?usp=sharing">Google Sheet</a> 
        to see which card scans are still needed. You can contact me through the 
        <a href="https://github.com/abnoba12/HeroscapeIndexCardBuilder/discussions">discussion board on GitHub</a>
    </h3>
</section>
<button id="download-all">Download All<span class="spinner" id="spinner"></span></button>
<div class="container">
  <div class="row" id="pdf-gallery">
      <!-- Thumbnails will be dynamically added here -->
  </div>
</div>