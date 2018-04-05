var controller = {
    generateGame: function() {
        view.generateBg();
        model.generateGameObjects();
        model.generateHangMan();
        model.generateRandom();
        model.showQuestion();
        model.generateWord();
    },
    letterInput: function() {
        var input = document.querySelector('.game__input');

        input.addEventListener('input', function(e) {
             
            
            if (model.gameParams.status !== 'finished') {
                var value = e.target.value;

                if (controller.isLetter(value)) {
                    this.value =  e.data;
                    controller.findMatches(e.data);
                    model.clearInput();
                } else {
                    this.value = '';
                    return false;
                } 
                model.isWordGuessed();   
            } else {
                model.clearInput();
            }
        });
    },
    isLetter: function(str) {
        return /[а-я]+/.test(str);
    },
    findMatches: function(symbol) {
        var word = model.gameParams.word.toLowerCase().split(''),
            pos = 0,
            letters = document.querySelectorAll('.game__word-letter')
            wasNotMatched = true;

        for (var i = 0; i < word.length; i++) {
            var currentLetter = word[i];

            if (symbol === currentLetter) {
                view.showMatchedLetter(i);
                wasNotMatched = false;  
            }
        }
        if (wasNotMatched) {
            view.drawHangmanPart();
        }
    },
    resetGame: function() {
        var btnReset = document.querySelector('.game__bg-change');

        btnReset.onclick = function() {
            location = location;
        }
    }
};