circles = [];
minimunRadios = 2;


function getRandomColor() {

    var letters = "0123456789ABCDEF".split("");
    var color = "#";

    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomPoint(xmax, ymax){
    x = Math.floor(Math.random() * xmax);
    y = Math.floor(Math.random() * ymax);

    return [x, y];
}

function calculateDistance(point){
    dmax = 700;

    if (circles.lenght > 0){
        console.log("lista com conteúdo");
    }
    else {
        console.log("entrei no else");
        return Math.floor(Math.random() * dmax);
    }

}

function generateRandomRadios(x, y, maximunRadios){
    
    radios = Math.floor(Math.random() * (maximunRadios - minimunRadios) - minimunRadios);

    // TODO falta fazer validação se o círculo ta dentro do quadrado
    return radios;
}

function drawCircle(top, left, width){

    const circle = document.createElement("div");

    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = getRandomColor();
    circle.style.top = top + "px";
    circle.style.left = left + "px";
    circle.style.width = width + "px";
    circle.style.height = width + "px";
    circle.style.display = "block";

    document.getElementById("circle-container").appendChild(circle);
}

document.getElementById("start").onclick = function(){
    console.log("inicio");

    // Valores máximos são representados pelo tamanho da div
    point = generateRandomPoint(1300, 700);
    console.log("meu x:" + point[0] + " meu y:" + point[1]);

    distance = calculateDistance(point);
    console.log("fui na distancia " + distance);

    if (distance > minimunRadios){
        // x, y = point[0], point[1]; não entendi por que não pode fazer isso

        radios = generateRandomRadios(point[0], point[1], distance);

        // Desenha circulo no espaço
        drawCircle(point[1], point[0], radios);

        circles.push([point[0], point[1], radios]);


    }
}