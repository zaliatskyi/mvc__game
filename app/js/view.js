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