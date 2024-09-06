$(document).ready(async function () {

});

function clickCalc() {
    try {
        var players = $("#players").val();
        var points = $("#points").val();
        var hours = $("#hours").val();
        var mod = $("#speed").val();

        var r = calculate(players, points, hours, mod);
        if (r) {
            $("#players").val(r.players);
            $("#points").val(r.points);
            $("#hours").val(r.hours);
        }
    } catch (e) {
        alert(e);
    }
}

function calculate(players, points, hours, mod) {
    if (!mod) {
        throw "Play speed is required";
    }

    if (players == 1) {
        throw "Why so lonely? You should find others to play with";
    }

    if (points && points < 10) {
        throw "This will not be a fun game with so few points. Lets make a larger army."
    }

    var adj = 750 * mod;

    // Round((~Play Time Hours / Number of players) * 750) = Points per army
    if (!points) {
        if (!players || !hours) {
            throw "You must fill out at least two inputs";
        }

        var calcPoints = Math.round((hours / players) * adj);
        return { players: players, points: calcPoints, hours: hours };
    }

    // (Number of players x Points per army) / 750 = ~Play Time Hours 
    if (!hours) {
        if (!players || !points) {
            throw "You must fill out at least two inputs";
        }

        var calcHours = ((players * points) / adj).toFixed(2);
        return { players: players, points: points, hours: calcHours };
    }

    // (750 x Play Time Hours)/Points Per Army = Number of players
    if (!players) {
        if (!hours || !points) {
            throw "You must fill out at least two inputs";
        }

        var calcPlayers = Math.round((adj * hours) / points);
        return { players: calcPlayers, points: points, hours: hours };
    }

    throw "Please don't fill in all fields. Leave one blank for calculation";
}