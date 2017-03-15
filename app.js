let mainState = {
    preload: function() {
        game.load.image('bird', 'assets/bird.png');
        game.load.image('obstacle', 'assets/obstacle.png');
    },

    create: function() {
        game.stage.backgroundColor = '#17cf62';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bird = game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        let spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.obstacles = game.add.group();
        this.timer = game.time.events.loop(1500, this.addRowOfObstacles, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
            { font: "30px Arial", fill: "#ff4d68" });
    },

    update: function() {
        game.physics.arcade.overlap(
            this.bird, this.obstacles, this.restartGame, null, this);
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
    },

    jump: function() {
        this.bird.body.velocity.y = -350;
    },

    restartGame: function() {
        game.state.start('app');
    },

    addObstacle:function(x, y) {
        let obstacle = game.add.sprite(x, y, 'obstacle');
        this.obstacles.add(obstacle);
        game.physics.arcade.enable(obstacle);

        obstacle.body.velocity.x = -200;

        obstacle.checkWorldBounds = true;
        obstacle.outOfBoundsKill = true;
    },

    addRowOfObstacles:function() {
        let hole = Math.floor(Math.random() * 5) + 1;

        for (let i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.addObstacle(400, i * 60 + 10);

        this.score += 1;
        this.labelScore.text = this.score;
    }
};

let game = new Phaser.Game(400, 490);
game.state.add('app', mainState);

game.state.start('app');