var circles = [];
var minimunRadios = 2;
var circlesQuantity = 0;
var interval;
var pause = false;

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
    dmax = 700;

    // if (circles.lenght > 0){
    //     console.log("lista com conteúdo");
    // }
    // else {
    //     console.log("entrei no else");
    //     return Math.floor(Math.random() * dmax);
    // }

    return Math.floor(Math.random() * dmax);

}

function generateRandomRadios(x, y, maximunRadios){

    minimunRadios = 2;

    radios = Math.floor(Math.random() * maximunRadios) + minimunRadios;

    while ((x + radios > xmax) || (y + radios > ymax)){
        radios = Math.floor(Math.random() * maximunRadios) + minimunRadios;
    }

    console.log("raio: " + radios);

    return radios;
}

function createCircle(left, top, width, id){

    var circle = document.createElement("div");
    circle.id = "circle-" + id;

    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = getRandomColor();
    circle.style.top = top + "px";
    circle.style.left = left + "px";
    circle.style.width = width + "px";
    circle.style.height = width + "px";
    circle.style.display = "block";
    circle.style.position = "absolute";

    document.getElementById("circle-container").appendChild(circle);

    console.log(document.getElementById("teste-1"));

}

function drawCircle(){
    point = generateRandomPoint();
    console.log("meu x:" + point[0] + " meu y:" + point[1]);

    distance = calculateDistance(point);
    console.log("fui na distancia " + distance);

    if (distance > minimunRadios){
        // x, y = point[0], point[1]; não entendi por que não pode fazer isso

        radios = generateRandomRadios(point[0], point[1], distance);

        circlesQuantity += 1;

        // Desenha circulo no espaço
        createCircle(point[0], point[1], radios, circlesQuantity);
        // drawCircle(circles[0][0], circles[0][1], circles[0][2]);
        
        circles.push([point[0], point[1], radios]);
        document.getElementById("circle-quantity").innerHTML = circlesQuantity;
    }
    else {
        console.log("distancia pequena");
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