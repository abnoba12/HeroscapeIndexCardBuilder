---
layout: default
title: Heroscape Builder
welcome: true
---
<!--bundle exec jekyll serve-->
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
    <div class="col-md-4 card-option">
        <a href="{{ '/cardGenerator/standard/standardCards.html' | relative_url }}" class="text-decoration-none text-dark">
            <img src="{{ '/cardGenerator/assets/images/cardThumbnails/Charos-SQ.png' | relative_url }}" alt="Standard Heroscape Card" class="img-fluid">
            <p class="text-center mt-2">Standard Heroscape Cards</p>
        </a>
    </div>
    <div class="col-md-4 card-option">
        <a href="{{ '/cardGenerator/3x5Index/3x5IndexCards.html' | relative_url }}" class="text-decoration-none text-dark">
            <img src="{{ '/cardGenerator/assets/images/cardThumbnails/Index_3x5_Charos-SQ.png' | relative_url }}" alt="3x5 Heroscape Index Card" class="img-fluid">
            <p class="text-center mt-2">3x5 Heroscape Index Cards</p>
        </a>
    </div>
    <div class="col-md-4 card-option">
        <a href="{{ '/cardGenerator/4x6Index/4x6IndexCards.html' | relative_url }}" class="text-decoration-none text-dark">
            <img src="{{ '/cardGenerator/assets/images/cardThumbnails/Index_4x6_Charos-SQ.png' | relative_url }}" alt="4x6 Heroscape Index Card" class="img-fluid">
            <p class="text-center mt-2">4x6 Heroscape Index Cards</p>
        </a>
    </div>
</section>
<section class="row my-4">
    <div class="offset-md-4 col-md-4 card-option text-center">
        <a href="{{ '/cardGenerator/printing/printing.html' | relative_url }}" class="text-decoration-none text-dark">
            <img src="{{ '/cardGenerator/assets/images/Printing Cards.png' | relative_url }}" alt="Printing" class="img-fluid">
            <p class="mt-2">Printing</p>
        </a>
    </div>
</section>
