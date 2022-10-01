objects = [];
status = "";
var img = "";
function preload(){
    img = loadImage("pets.jpg");
}
function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    background("white");
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("statusav").innerHTML = "Status :- Detecting Objects";
}
function modelLoaded(){
    status = true;
    objectDetector.detect(img,gotresults);
}
function gotresults(error,results){
    if(error){
        console.error(error);
    }else{
    console.log(results);
    objects = results;
    }
}
function draw(){
    image(img,0,0,500,400);
    if(status != ""){
        for(var i = 0; i < objects.length; i++){
            document.getElementById("statusav").innerHTML = "Status :- Objects Detected";
            document.getElementById("infoav").innerHTML = "There are 2 big objects in the image from which cocossd model has detected " + objects.length + " objects";
            noFill();
            stroke("rgb(255,0,0)");
            textFont("sans-serif");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent+ "%",objects[i].x+15,objects[i].y+15);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}