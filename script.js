function startgame(){
    function makebubble() {
        var clutter = "";
    
        for (var i = 1; i <= 80; i++) {
            var rn = Math.floor(Math.random() * 10);
            clutter += `<div class="bubble">${rn}</div>`;
            //   clutter += "<div class=\"bubble\">" + rn + "</div>";
        }
        document.querySelector(".pbtm").innerHTML = clutter;
    }
    
    var timer = 60;
    function runtimer() {
        var timerint = setInterval(function () {
            if (timer > 0) {
                timer--;
                document.querySelector('#timervalue').textContent = timer;
            }
            else {
                clearInterval(timerint);
                document.querySelector('.pbtm').innerHTML=`<h1>game over</h1>`;
            }
        }, 1000);
    }
    
    var hitrun;
    function hit() {
        hitrun = Math.floor(Math.random() * 10);
        document.querySelector("#hitval").textContent = hitrun;
    }
    
    var score=0;
    function inscore(){
        score+=10;
        document.querySelector('#scoreval').textContent=score;
    }
    document.querySelector('.pbtm').addEventListener("click",function(dets){
    var  clickednum=Number(dets.target.textContent);
    if(clickednum===hitrun){
        inscore();
        makebubble();
        hit();
    }
    
    });
    
    hit();
    runtimer();
    makebubble();
}

document.querySelector('button').addEventListener("click",function(dets){
 startgame();
});