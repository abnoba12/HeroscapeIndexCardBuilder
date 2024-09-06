---
layout: default
title: Unit Data
subSectionTitle: Unit Data
css:
    - "https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css"
    - "/dataBuilder/assets/css/tables.css"
scripts: 
    - "https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"
    - 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js'
    - 'https://cdn.datatables.net/colreorder/1.5.4/js/dataTables.colReorder.min.js'
moduleScripts:
    - "/dataBuilder/assets/js/unitData.js"
    - '/cardGenerator/assets/js/pdfPage/pdfThumb.js'
---
<div class="container-fluid">
    <div id="accordionStats" class="row accordion">
        <div class="col-md-6 accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSet" aria-expanded="false" aria-controls="collapseSet">                    
                    Stats By Set
                </button>
            </h2>
            <div id="collapseSet" class="accordion-collapse collapse" aria-labelledby="headingTwo">
                <div id="setStats">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Creator</th>
                                <th>Set</th>
                                <th>Owned Units</th>
                                <th>Units in Set</th>
                                <th>Percent Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div> 
            </div> 
        </div>
        <div class="col-md-6 accordion-item">  
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseGeneral" aria-expanded="false" aria-controls="collapseTwo">
                    Stats By General
                </button>
            </h2>        
            <div id="collapseGeneral" class="accordion-collapse collapse" aria-labelledby="headingTwo">   
                <table id="StatsByGeneral" class="table table-striped">
                    <thead>
                        <tr>
                            <th>Creator</th>
                            <th>General</th>
                            <th>Owned</th>
                            <th>Total</th>
                            <th>Percent Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>      
            </div>
        </div>
        <div class="col-md-6 accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUnit" aria-expanded="false" aria-controls="collapseTwo">
                    Unit Stats
                </button>
            </h2>
            <div id="collapseUnit" class="accordion-collapse collapse" aria-labelledby="headingTwo" >
                <div id="unitStats">
                    <table class="table table-striped">
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-md-6 accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTotals" aria-expanded="false" aria-controls="collapseTwo">
                    Totals
                </button>
            </h2>
            <div id="collapseTotals" class="accordion-collapse collapse" aria-labelledby="headingTwo" >
                <div id="totalStats">
                    <table class="table table-striped">
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div id="sidebar" class="col-md-2">
            <button id="toggle-sidebar" class="toggle-btn">☰</button>
            <div id="column-controls-wrapper" class="accordion">
                <div id="column-filter" class="filter accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Show Columns
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="column-controls"></div>
                        </div>
                    </div>
                    <!-- <h5>Show Columns</h5>
                    <div id="column-controls"></div> -->
                </div>
                <div id="creator-filter" class="filter accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Filter by Source
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="creator-controls"></div>
                        </div>
                    </div>
                    <!-- <h5>Filter by Source</h5>
                    <div id="creator-controls"></div> -->
                </div>
                <div id="general-filter" class="filter accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Filter by General
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="general-controls"></div>
                        </div>
                    </div>
                    <!-- <h5>Filter by General</h5>
                    <div id="general-controls"></div> -->
                </div>                
                <div id="set-filter" class="filter accordion-item">
                    <h2 class="accordion-header" id="headingFour">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            Filter by Set
                        </button>
                    </h2>
                    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <div id="set-controls"></div>
                        </div>
                    </div>
                    <!-- <h5>Filter by Set</h5>
                    <div id="set-controls"></div> -->
                </div>
            </div>
        </div>
        <div id="table_content" class="col-md-10">
            <table id="datatable" class="table table-striped"></table>
        </div>
    </div>
</div>
<div id="cellModal" class="modal">
    <div class="modal-content">
        <div class="row">
            <div class="col-md-1 close">&times;</div>
            <div class="col-md-11">
                <h2 id="modal-title"></h2> <!-- Title of the modal -->            
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p id="modal-text"></p> <!-- Content of the modal -->
            </div>
        </div>
    </div>
</div>
