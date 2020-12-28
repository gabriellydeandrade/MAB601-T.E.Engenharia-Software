var circles = [];
var circlesQuantity = 0;
var interval = null;
var pause = false;

const minimunRadius = 2;
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
    // Gera um ponto aleatório entre 2 e tamanho maximo - 2. 
    // Como o raio mínimo é 2, os valores possíveis deverão estar nesse intervalo.
    x = Math.floor(Math.random() * (xmax - minimunRadius - 1)) + minimunRadius;
    y = Math.floor(Math.random() * (ymax - minimunRadius - 1)) + minimunRadius;

    return [x, y];
}

function calculateDistance(point){
    var minDistance = 999;

    if (circles.lenght == 0){
        return minDistance;
    }

    for (i=0; i<circles.length; i++){
        distance = Math.sqrt((circles[i][0] - point[0])**2 + (circles[i][1] - point[1])**2)

        // Verifica se está dentro de algum círculo
        if (distance < circles[i][2]){
            return 0;
        }

        distance = distance - circles[i][2]; // Distância menos o raio é igual a distância da borda do círculo mais próximo

        if (distance < minDistance){
            minDistance = distance;
        }
    }

    return minDistance;
}

function generateRandomRadius(x, y, maximunRadius){
    radius = Math.floor(Math.random() * (maximunRadius - minimunRadius)) + minimunRadius;
    
    while ((x - radius < 0) || (x + radius > xmax) || (y - radius < 0) || (y + radius > ymax)){
        radius = Math.floor(Math.random() * (maximunRadius - minimunRadius)) + minimunRadius;
    }

    return radius;
}

function createCircle(left, top, radius, id){

    var circle = document.createElement("div");
    circle.id = "circle-" + id;

    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = getRandomColor();
    circle.style.top = (top - radius) + "px";
    circle.style.left = (left - radius) + "px";
    circle.style.width = radius*2 + "px";
    circle.style.height = radius*2 + "px";
    circle.style.display = "block";
    circle.style.position = "absolute";

    document.getElementById("circle-container").appendChild(circle);
}

function drawCircle(){
    point = generateRandomPoint();
    distance = calculateDistance(point);
    
    if (distance > minimunRadius){

        radius = generateRandomRadius(point[0], point[1], distance);

        circlesQuantity += 1;

        createCircle(point[0], point[1], radius, circlesQuantity);
        
        circles.push([point[0], point[1], radius]);
        document.getElementById("circle-quantity").innerHTML = circlesQuantity;
    }

}


function poll(){
    interval = setInterval(drawCircle, 33);
}

function reset(){
    if (interval) {
        clearInterval(interval);
        interval = null; 
    }
    document.getElementById("circle-container").innerHTML = "";
    document.getElementById("circle-quantity").innerHTML = 0;
    circlesQuantity = 0;
    circles = [];
    pause = false;
}


document.getElementById("start").addEventListener("click", function(){
    reset();
    poll();
});

document.getElementById("pause").addEventListener("click", function(){
    pause = !pause;

    if (pause){
        clearInterval(interval);
        interval = null; 
    }
    else {
        poll();
    }
    
});