var circles = [];
var circlesQuantity = 0;
var interval;
var pause = false;

const minimunRadios = 2;
const xmax = 1300;
const ymax = 700;


function getRandomColor() {

    var letters = "0123456789ABCDEF".split("");
    var color = "#";

    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomPoint(){
    x = Math.floor(Math.random() * xmax);
    y = Math.floor(Math.random() * ymax);

    return [x, y];
}

function calculateDistance(point){
    var minDistance = 999;

    if (circles.lenght == 0){
        return Math.floor(Math.random() * minDistance);
    }

    for (i=0; i<circles.length; i++){
        distance = Math.sqrt((circles[i][0] - point[0])**2 + (circles[i][1] - point[1])**2)

        // Verifica se está dentro de algum círculo
        if (distance < circles[i][2]){
            return 0;
        }

        distance = distance - circles[i][2]; // Distância menos o raio é igual a distância do círculo mais próximo

        if (distance < minDistance){
            minDistance = distance;
        }
    }

    return minDistance;
}

function generateRandomRadios(x, y, maximunRadios){

    radios = Math.floor(Math.random() * (maximunRadios - minimunRadios)) + minimunRadios;

    while ((x - radios < 0) || (x + radios > xmax) || (y - radios < 0) || (y + radios > ymax)){
        radios = Math.floor(Math.random() * (maximunRadios - minimunRadios)) + minimunRadios;
    }

    return radios;
}

function createCircle(left, top, radios, id){

    var circle = document.createElement("div");
    circle.id = "circle-" + id;

    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = getRandomColor();
    circle.style.top = (top - radios) + "px";
    circle.style.left = (left - radios) + "px";
    circle.style.width = radios*2 + "px";
    circle.style.height = radios*2 + "px";
    circle.style.display = "block";
    circle.style.position = "absolute";

    document.getElementById("circle-container").appendChild(circle);
}

function drawCircle(){
    point = generateRandomPoint();

    distance = calculateDistance(point);
    if (distance > minimunRadios){

        radios = generateRandomRadios(point[0], point[1], distance);

        circlesQuantity += 1;

        createCircle(point[0], point[1], radios, circlesQuantity);
        
        circles.push([point[0], point[1], radios]);
        document.getElementById("circle-quantity").innerHTML = circlesQuantity;
    }

}


function poll(){
    interval = setInterval(drawCircle, 2000);
}


document.getElementById("start").addEventListener("click", function(){
    clearInterval(interval);
    document.getElementById("circle-container").innerHTML = "";
    document.getElementById("circle-quantity").innerHTML = 0;
    circlesQuantity = 0;
    circles = [];
    poll();
});

document.getElementById("pause").onclick = function(){
    pause = !pause;

    if (pause){
        clearInterval(interval);
        
    }
    else {
        poll();
    }
    
} 