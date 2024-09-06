---
layout: default
title: Game Play Calculator
subSectionTitle: Game Play Calculator
css:
- '/dataBuilder/assets/css/gameplaycalc.css'
scripts: 
- '/dataBuilder/assets/js/gameplaycalc.js'
# moduleScripts:
---
<div class="container">
    <form>
        <div class="row">
            <div class="col-md-12">
                <p>
                    Use this tool to calculate key metrics for your game. Leave one field blank, and the calculator will determine its value. You can calculate the required number of players for a given point total and play time, the optimal point total for a set number of players and time, or estimate the game duration based on the number of players and points. Adjust the play speed modifier to account for your group's pacing: a value of 1 represents average speed, while 0.5 and 2 represent half and double the average speed, respectively. This doesn't include setup time.
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label for="playrs">Number of Players</label>
                <input id="players" type="number" />
            </div>
            <div class="col-md-3">
                <label for="points">Points</label>
                <input id="points" type="number" />
            </div>        
            <div class="col-md-3">
                <label for="hours">Play Time (Hours)</label>
                <input id="hours" type="number" />
            </div>
            <div class="col-md-3">
                <label for="speed">Play Speed Multiplyer</label>
                <input id="speed" type="number" value="1"/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <button class="btn btn-primary" type="button" onclick="clickCalc()">Calculate</button>
            </div>
        </div>
    </form>
</div>