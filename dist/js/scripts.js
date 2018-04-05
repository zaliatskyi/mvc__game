var view = {
    generateBg: function() {
        var bg = document.querySelector('.game__bg'),
            max = 150,
            min = 50,
            colors = [];
        
        for (var i = 0; i < 3; i++) {
            var color = Math.floor(Math.random() * (max - min) + min);
            colors.push(color);
        }
        bg.style.backgroundColor = 'rgb(' + colors.join(',') + ')';
    },
    generateHangMan: function() {
        var hangMan = document.createElement('div');

        hangMan.classList.add('game__hangman');

        hangMan.innerHTML = `
            <div class="game__hangman-base">
                <div class="game__hangman-person">
                    <div class="game__hangman-head not-drawed"></div>
                    <div class="game__hangman-body not-drawed"></div>
                    <div class="game__hangman-hand game__hangman-hand--left not-drawed"></div>
                    <div class="game__hangman-hand game__hangman-hand--right not-drawed"></div>
                    <div class="game__hangman-leg game__hangman-leg--left not-drawed"></div>
                    <div class="game__hangman-leg game__hangman-leg--right not-drawed"></div>
                </div>
            </div>
        `;
        // archer.appendChild('.game__archer-head');
        document.querySelector('.game__container').appendChild(hangMan);
    },
    deleteHangMan: function() {
         document.querySelectorAll('.game__hangman').remove();
    },
    generateGameObjects: function() {
        var gameContainer = document.createElement('div');

        gameContainer.classList.add('game__container');
        document.querySelector('.game__bg').appendChild(gameContainer);
        
        var gameStructure = `
            <div class="game__question"></div>
            <div class="game__input-block">
                <input class="game__input">
            </div>
        `;

        document.querySelector('.game__container').innerHTML = gameStructure;
    },
    generateWord: function() {
        var wordContainer = document.createElement('div');

        wordContainer.classList.add('game__word');
        document.querySelector('.game__container').appendChild(wordContainer);
    },
    generateLetters: function(val) {
        var wordLetter = document.createElement('div');
        
        wordLetter.classList.add('game__word-letter');

        var wordLetterVal = document.createElement('div');
        
        wordLetterVal.classList.add('game__word-letter-val');
        wordLetter.appendChild(wordLetterVal);
        wordLetterVal.innerHTML = val;
        document.querySelector('.game__word').appendChild(wordLetter);
    },
    showMatchedLetter: function(index) {
        var letters =  document.querySelectorAll('.game__word-letter');

        if (letters[index].classList.contains('guessed')) {
            return false;
        }
        letters[index].classList.add('guessed');
    },
    drawHangmanPart: function() {
        var partsToDraw = document.querySelectorAll('.not-drawed');

        if (partsToDraw.length > 0) {
            partsToDraw[0].classList.remove('not-drawed');
        }
    },
    showMessage: function(status) {
        var message = document.createElement('div');

        message.classList.add('game__message');
        message.innerHTML = '';

        
        if (status === 'game-finished') {
            message.innerHTML = 'Поздравляю! Вы угадали слово!';
        } else {
            message.innerHTML = 'Вы проиграли! Попробуйте еще раз!';
        }
        document.querySelector('.game__container').appendChild(message);
    },
    deleteWord: function() {
        if (document.querySelectorAll('.game__word').length > 0) {
            document.querySelector('.game__word').remove();
        }
    },
    deleteGameObjects: function() {
        if (document.querySelectorAll('.game__container').length > 0) {
            document.querySelector('.game__container').remove();
        }
    }
};
var model = {
    gameParams: {

    },
    words: [
        {
            'Тип государства': 'Империя'
        }, 
        {
            'Воронка после падения метеорита': 'Кратер'
        },
        {
            'С помощью чего держат корабль на месте?': 'Якорь'
        },
        {
            'Овощной салат': 'Винегрет'
        },
        {
            'предмет кухонной утвари в виде маленькой кастрюли или ковша с отверстиями на дне': 'Дуршлаг'
        },
        {
            'Небольшой пушистый грызун': 'Шиншилла'
        },
        {
            'Способ мышления, склад ума': 'Менталитет'
        },
        {
            'Процесс, в результате которого один этнос лишается своих отличительных черт и заменяется чертами другого общества': 'Ассимиляция'
        },
        {
            'Человек-амфибия': 'Ихтиандр'
        },
        {
            'Вид декоративно-прикладного искусства': 'Оригами'
        }
    ],
    generateRandom: function() {
        var from = 0,
            to = model.words.length;
        var randomNumber = Math.floor(Math.random() * (to - from) + from);

        for (var question in model.words[randomNumber]) {
            this.gameParams.question = question;
            this.gameParams.word = model.words[randomNumber][question];
        }
    },
    generateLetters: function() {
        var word = this.gameParams.word,
            wordLength = word.length,
            wordLetters = word.toLowerCase().split(''),
            wordContainer = document.querySelector('.game__word');

        for (var i = 0; i < wordLength; i++) {
            var letterValue = wordLetters[i];

            view.generateLetters(letterValue);
        }
    },
    generateHangMan: function() {
        view.generateHangMan();
    },
    generateWord: function() {
        this.deleteWord();
        view.generateWord();
        this.generateLetters();
    },
    generateGameObjects: function() {
        this.deleteGameObjects();
        view.generateGameObjects();
    },
    showQuestion: function() {
        document.querySelector('.game__question').innerHTML = this.gameParams.question;
    },
    clearInput : function() {
        var input = document.querySelector('.game__input');

        setTimeout(function() {
            input.value = '';
        }, 1000);
    },
    isWordGuessed: function() {
        var guessedLetters = document.querySelectorAll('.guessed'),
            hangmanNotDrawed = document.querySelectorAll('.not-drawed');
        
        if (model.gameParams.word.length == guessedLetters.length) {
            view.showMessage('game-finished');
            model.gameParams.status = 'finished';

            setTimeout(() => {
                location = location
            }, 4000);
        }
        if (hangmanNotDrawed.length == 0) {
            view.showMessage();
            model.gameParams.status = 'finished';

            setTimeout(() => {
                location = location
            }, 4000);
        }
    },
    deleteGameObjects: function() {
        view.deleteGameObjects();
    },
    deleteWord: function() {
        view.deleteWord();
    },
    deleteHangMan: function() {
        view.deleteHangMan();
    },
};
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
(function() {
  
	var start = {
		init: function () {
			this.main();
			this.control();
		},
		main: function () {

		},
		control: function () {
			controller.generateGame();
			controller.letterInput();
            controller.resetGame();
		}
	};

	start.init();

}());