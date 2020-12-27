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
    var dmax = 999;
    var minDistance = 999;

    if (circles.lenght == 0){
        console.log("entrei no condicional de circulo");
        return Math.floor(Math.random() * dmax);
    }


    // var minDistance = Math.sqrt((circles[0][0] - point[0])**2 + (circles[1][1] - point[1])**2);

    for (i=0; i<circles.length; i++){
        distance = Math.sqrt((circles[i][0] - point[0])**2 + (circles[i][1] - point[1])**2)

        // Verifica se está dentro de algum círculo
        if (distance < circles[i][2]){
            console.log("DEU CIRCULO JA EXISTENTE: " + i);
            return 0;
        }

        // xValue = (point[0] >= (circles[i][0] - circles[i][2])) && (point[0] <= (circles[i][0] + circles[i][2]));
        // yValue = (point[1] >= (circles[i][1] - circles[i][2])) && (point[1] <= (circles[i][1] + circles[i][2]));

        // if (xValue && yValue) {
        //     console.log("DEU CIRCULO JA EXISTENTE: " + i);
        //     return 0;
        // }


        // // Calcula eixo x
        // if ((point[0] >= (circles[i][0] - circles[i][2])) && (point[0] <= (circles[i][0] + circles[i][2]))) {

        //     console.log("DEU X IGUAL: " + i);
        //     return 0;
        // }

        // // Calcula eixo y
        // if ((point[1] >= (circles[i][1] - circles[i][2])) && (point[1] <= (circles[i][1] + circles[i][2]))) {
        //     console.log("DEU y IGUAL: " + i);
        //     return 0;
        // }

        if (distance < minDistance){
            minDistance = distance;
        }
    }

    console.log("diatancia minima: " + minDistance);

    return minDistance;

    

    // return Math.floor(Math.random() * dmax);

}

function generateRandomRadios(x, y, maximunRadios){

    minimunRadios = 2;

    radios = Math.floor(Math.random() * (maximunRadios - minimunRadios)) + minimunRadios;

    // xInterval = x + radios > xmax;
    // xMinInterval = x - radios < 0;

    // yMaxInterval = y + radios > ymax;
    // yMinInterval = y - radios < 0;

    while ((x - radios*2 < 0) || (x + radios*2 > xmax) || (y - radios*2 < 0) || (y + radios*2 > ymax)){
        radios = Math.floor(Math.random() * (maximunRadios - minimunRadios)) + minimunRadios;
    }

    console.log("raio: " + radios);

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
    interval = setInterval(drawCircle, 1000);
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

    console.log("valor de pause: " + pause);

    if (pause){
        clearInterval(interval);
        
    }
    else {
        poll();
    }
    
} 