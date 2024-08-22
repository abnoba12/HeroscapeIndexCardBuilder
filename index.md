---
layout: default
title: Heroscape Builder
welcome: true
---
<!--$env:JEKYLL_ENV="development"; bundle exec jekyll serve-->
<section class="welcome mb-4">
    <div class="community-links bg-light p-3 rounded">
        <div class="row">
            <div class="col">
                <p>Join our community and interact with other members:</p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <a href="https://github.com/abnoba12/HeroscapeIndexCardBuilder/discussions" target="_blank" class="btn btn-outline-success btn-sm mb-2">Visit our Discussions Page</a>
            </div>
            <div class="col">
                <a href="https://github.com/abnoba12/HeroscapeIndexCardBuilder/issues" target="_blank" class="btn btn-outline-success btn-sm mb-2">Report Bugs and Issues</a>
            </div>
        </div>
    </div>
</section>
<section class="cards row gy-4">
    <div class="col-md-6 site-area">
        <a href="{{ '/cardGenerator/index.html' | relative_url }}" class="text-decoration-none text-dark">
            <img src="{{ '/cardGenerator/assets/images/cardThumbnails/Charos-SQ.png' | relative_url }}" alt="Heroscape Army Cards" class="img-fluid">
            <p class="text-center mt-2">Heroscape Army Cards</p>
        </a>
    </div>
    <div class="col-md-6 site-area">
        <a href="{{ '/dataBuilder/index.html' | relative_url }}" class="text-decoration-none text-dark">
            <img src="{{ '/databuilder/assets/images/DataBuilderLogo.png' | relative_url }}" alt="Heroscape Data" class="img-fluid">
            <p class="text-center mt-2">Heroscape Data</p>
        </a>
    </div>    
</section>