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