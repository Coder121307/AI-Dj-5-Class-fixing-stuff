leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
LeftWristScore = 0;
RightWristScore = 0;
song="";


function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is initilized');
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        LeftWristScore = results[0].pose.keypoints[9].score;
        RightWristScore = results[0].pose.keypoints[10].score;
        console.log("LeftWristScore ="+ LeftWristScore + "RightWristScore ="+ RightWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWrist = results[0].pose.rightWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY = "+ leftWristY + "rightWristX = "+ rightWristX + "rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("FF0000");
    stroke("FF0000");
    if(RightWristScore > 0.2){

  
    circle(rightWristX,rightWristY,20)
    if(rightWristY >0 && rightWristY<=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWristY>400){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}
    if(LeftWristScore > 0.2){
    
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimal = floor(InNumberleftWristY);
    volume = remove_decimal/500;
    document.getElementById("volume").innerHTML = "volume = "+ volume;
    song.setVolume(volume);

    
    }
}

function play_sound(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
