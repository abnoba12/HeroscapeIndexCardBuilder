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
<meta http-equiv="Cache-Control" content="max-age=31536000, public">
<ul id="pdfList" style="display: none;">
  {% for file in site.static_files %}
    {% if file.path contains '/cardGenerator/3x5Index/PDFs' %}
      <li><a href="{{ file.path | relative_url }}">{{ file.path | relative_url }}</a></li>
    {% endif %}
  {% endfor %}
</ul>
<button id="download-all">Download All<span class="spinner" id="spinner"></span></button>
<div class="container">
  <div class="row" id="pdf-gallery">
      <!-- Thumbnails will be dynamically added here -->
  </div>
</div>