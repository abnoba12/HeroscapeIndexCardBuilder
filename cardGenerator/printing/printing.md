---
layout: default
title: Printing Cards
subSectionTitle: Printing Cards
scripts:
    - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js'
    - 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
moduleScripts:
    - '/cardGenerator/assets/js/printing/printing.js'
css:
    - '/assets/css/markdown-styles.css'
---
## List of Services and Prices

Details about services and prices.

**Service:** [Best Value Copy](https://www.bestvaluecopy.com/color-copies.html)

**Recomended Print settings for cards:**
- **Coloration:** Color
- **Sides:** Double Sided
- **Page Size:** Letter
- **Paper:** 100# Coated Silk Cover
- **Everything Else:** None

## Formatting Tips and Recommendations

Details about formatting tips and recommendations.

Based on measurements of the Heroscape cards, they are approximately 300 GSM or 110 lb Cover Weight.

## Downloads

### Image Assets

Image assets to assist you in creating your own custom Heroscape cards.

- <a id="download-standard-assets" href="#">Download Standard Army Card Image Assets<span class="spinner"></span></a>
- <a id="download-3x5-assets" href="#">Download 3x5 Army Card Image Assets<span class="spinner"></span></a>
- <a id="download-4x6-assets" href="#">Download 4x6 Army Card Image Assets<span class="spinner"></span></a>

### [Download executables for formatting and compressing PDFs](./PDFUils.zip)

#### Note:
All files are designed for use on Windows.

- BuildDoubleSidedPrints_Orig.exe
  - **Purpose:** This script is designed to process PDFs formatted as standard army cards (each PDF should be exactly 2 pages).
  - **Usage:** Place this script in a folder containing ONLY the relevant PDFs. The script will combine all PDFs in the folder into a single `compressed_combined.pdf` file.
  - **Output:** The resulting PDF is formatted, compressed, and optimized for printing standard cards on letter-size paper, with two cards per page. Pages are laid out for double-sided printing and can be cut apart using a paper cutter following the provided cut lines. This script is also compatible with 4x6 index cards if two cards per page are desired.
  - **Note:** The original PDFs are not modified, but any existing `compressed_combined.pdf` file in the folder will be overwritten.
- BuildDoubleSidedPrints_3x5.exe
  - **Purpose:** This script is intended for PDFs formatted as 3x5 index cards (each PDF should be exactly 2 pages, each page measuring 3.25 x 5.25 inches to allow for bleed).
  - **Usage:** Place this script in a folder containing ONLY the relevant PDFs. The script will combine all PDFs into a single `master.pdf` file.
  - **Output:** The resulting PDF is formatted, compressed, and optimized for printing 3x5 index cards on letter-size paper, with four cards per page. Pages are laid out for double-sided printing and can be cut apart using a paper cutter following the provided cut lines.
  - **Note:** The original PDFs are not modified, but any existing `master.pdf` file in the folder will be overwritten.
- CombineAndCompress_4x6.exe
  - **Purpose:** This script is designed for PDFs formatted as 4x6 index cards (each PDF should be exactly 2 pages, each page measuring 4.25 x 6.25 inches to allow for bleed).
  - **Usage:** Place this script in a folder containing ONLY the relevant PDFs. The script will combine all PDFs into a single `compressed_combined.pdf` file.
  - **Output:** The resulting PDF is formatted, compressed, and optimized for printing 4x6 index cards. This script only combines the PDFs into a single file without placing multiple cards on a single page, allowing direct printing on 4x6 paper without cutting.
  - **Note:** The original PDFs are not modified, but any existing `compressed_combined.pdf` file in the folder will be overwritten.
- CompressPDFs.exe
  - **Purpose:** This script is designed to compress and optimize PDFs for printing.
  - **Usage:** Place this script in a folder containing at least one PDF. The script will compress and optimize all PDFs in the folder.
  - **Note:** This process WILL modify all PDFs in the folder. If uncompressed versions are needed, ensure you save copies elsewhere.
