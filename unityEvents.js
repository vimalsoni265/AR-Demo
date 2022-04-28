var markerFound = 0;
AFRAME.registerComponent('button', {
    init: function () {
        var elem = document.documentElement;
        var marker = document.querySelector("#marker");
        var fullbutton = document.querySelector("#fullscreen");
        var button = document.querySelector("#mutebutton");
        var downloadbutton = document.querySelector("#viddownload");
        var Video_0 = document.querySelector("#Video_Asset_0");

        marker.addEventListener("markerFound", function (evt) {
            markerFound = 1;
            console.log("marker found");
            downloadbutton.style.visibility = "visible"
            downloadbutton.style.display = "block"
            Video_0.play();
        });

        marker.addEventListener("markerLost", function (evt) {
            markerFound = 0;
            console.log("marker lost");
            downloadbutton.style.visibility = "hidden"
            downloadbutton.style.display = "none"
            //Video_0.pause();
        });

        button.addEventListener("click", function(evt){
            console.log("button clicked")
            if(Video_0.muted==true){
                button.innerHTML="Mute";
                Video_0.muted=false;
            }else{
                button.innerHTML="Unmute";
                Video_0.muted=true;
            }
        });

        fullbutton.addEventListener("click", function (evt) {
            if (fullscreen == 0) {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                        /* Firefox */
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                        /* Chrome, Safari and Opera */
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                        /* IE/Edge */
                    elem.msRequestFullscreen();
                }
                fullbutton.setAttribute("src", "exit_fullscreen.png");
                fullscreen = 1;
            } 
            else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                fullbutton.setAttribute("src", "fullscreen.png");
                fullscreen = 0;
            }
        });
    },
    tick: function (totalTime, deltaTime) {
        var dTime = deltaTime / 1000;
        if (markerFound == 1) {}
        function bezierEvaluate(p0, p1, p2, p3, t) {
            var u = (1 - t);                
            var uu = u * u;                
            var uuu = u * u * u;               
            var tt = t * t;               
            var ttt = t * t * t;               
            //B(t) = (1-t)^3*P0 3*(1-t)^2*t*P1 3*(1-t)*t^2*P2 t^3*P3 , 0 < t < 1               
            return (uuu * p0 + 3 * uu * t * p1 + 3 * u * tt * p2 + ttt * p3);          
        }          
        function bezierPath(p0, p1, p2, p3, t) {               
            return new THREE.Vector3(                   
                bezierEvaluate(p0.x, p1.x, p2.x, p3.x, t),                   
                bezierEvaluate(p0.y, p1.y, p2.y, p3.y, t),                   
                bezierEvaluate(p0.z, p1.z, p2.z, p3.z, t)               
            );           
        }     
    }
});