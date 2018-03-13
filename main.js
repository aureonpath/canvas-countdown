
function isCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

var con = console;
var context;
var can = isCanvasSupported();
var countdown = document.getElementById('countdown');

if (can) {
    var c = document.createElement('canvas');
    c.width = 400;
    c.height = 100;
    context = c.getContext('2d');

    countdown.insertBefore(c, countdown.firstChild)
}

var end = new Date(new Date().getUTCFullYear(), 11, 25, 0, 0);

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;

function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {
        clearInterval(timer);
        countdown.innerHTML = 'Event closed!';
        return;
    }
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    if (can) {

        context.fillStyle = "rgba(0,0,0,0.08)";
        context.fillRect(0, 0, 400, 400);

        splitDigit(0, days);
        splitDigit(3, hours);
        splitDigit(6, minutes);
        splitDigit(9, seconds);



    } else {
        countdown.innerHTML = days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + 'secs';
    }
    //clearInterval(timer);
}

var timer = setInterval(showRemaining, 10);

function splitDigit(position, unit) {
    unit = String(unit);
    if (unit.length == 1) unit = "0" + unit;
    var d = unit.split("");
    drawDigit(position, d[0]);
    drawDigit(position + 1, d[1]);
}

var digits = [
    //"0000001",
    "1110111", //0
    "0010010", //1
    "1011101", //2
    "1011011", //3
    "0111010", //4
    "1101011", //5
    "1101111", //6
    "1010010", //7
    "1111111", //8
    "1111011"  //9
];

for (var p = 0; p < digits.length; p++) {
    var digit = digits[p];

    var binary = parseInt(digit, 2);
    var zeros = binary;
    var b = parseInt(String(binary).split('').reverse().join(''), 2);
    con.log(digit, binary, zeros, b);
}


function drawBlip(x, y, r, colour) {

    //con.log("drawBlip", x, y);

    var w = 8, h = 3, c = 3;

    context.save();
    context.translate(x, y);
    context.rotate(r ? 0 : Math.PI / 2);
    context.fillStyle = colour;
    context.beginPath();
    context.moveTo(-1 * w - c, 0);
    context.lineTo(-1 * w, -1 * h);
    context.lineTo(1 * w, -1 * h);
    context.lineTo(1 * w + c, 0);
    context.lineTo(1 * w, 1 * h);
    context.lineTo(-1 * w, 1 * h);
    context.closePath();
    context.fill();

    context.restore();
}





function drawDigit(position, num) {
    var w = 20;
    var h = 40;
    var digit = digits[num];
    var chr = digit.split("");
    for (var i = 0; i < chr.length; i++) {
        var x =
            i == 0 ? 1 :
                i == 1 ? 0 :
                    i == 2 ? 2 :
                        i == 3 ? 1 :
                            i == 4 ? 0 :
                                i == 5 ? 2 :
                                    i == 6 ? 1 : 1;
        var y =
            i == 0 ? 0 :
                i == 1 ? 1 :
                    i == 2 ? 1 :
                        i == 3 ? 2 :
                            i == 4 ? 3 :
                                i == 5 ? 3 :
                                    i == 6 ? 4 : 4;
        var c = chr[i];
        drawBlip(
            35 + position * 33 + x * 12,
            25 + y * 12,
            (y % 2 == 0),
            c == 1 ? "rgba(255,0,0,0.6)" : "rgba(255,0,0,0.01)"
        );
    }
}
