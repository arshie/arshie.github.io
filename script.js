(function (){

    var list = document.getElementById('list');
    var likes = [].slice.apply(list.children).map(function(elem, i) {
        if (i !== 0){
            list.removeChild(elem);
        }
        return elem.textContent;
    });
    var newLike = list.children[0];
    var old = document.createElement('span');
    old.className = 'old';
    list.appendChild(old);
    
    var current = 0, l = likes.length;
    var animRunning = false;
    var curText = likes[current];
    var oldText = '';

    var fillI = 0, remI = 0;
    var fillStep = function (){
        newLike.textContent = curText.slice(0, fillI);
        fillI++;
    };
    var remStep = function (){
        old.textContent = oldText.slice(remI);
        remI++;
        if (remI > oldText.length && fillI > curText.length) {
            animRunning = false;
            remI = fillI = 0;
        }
    };

    var loop = function (){
        fillStep();
        remStep();

        if (animRunning === true){
            setTimeout(loop, 100/6);
        }
    };
    setInterval(function (){
        oldText = curText;
        current++;
        if (current >= likes.length){
            current = 0;
        }
        curText = likes[current];
        animRunning = true;
        loop();
    }, 5000);

    
})();