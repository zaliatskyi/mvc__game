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