enchant();

window.onload = function(){
    var game_ = new Game(320, 320);
    game_.fps = 24;
    game_.preload('./img/chara1.png');

    game_.onload = function(){
        var img = new Sprite(32, 32);

        img.image = game_.assets['./img/chara1.png'];
        img.frame = 4;

        img.x = 144;
        img.y = 0;

        game_.rootScene.backgroundColor = '#ffffff';
        game_.rootScene.addChild(img);

        var vectol_x = 1;
        var vectol_y = 1;

        game_.rootScene.addEventListener(Event.ENTER_FRAME, function(e){
            if(vectol_y == 1){
                if(vectol_x == 0){
                    img.x--;

                    if(img.x < 114){
                        img.x = 114;
                        vectol_x = 1;
                    }
                }
                else{
                    img.x++;
                    if(img.x > 174){
                        img.x = 174;
                        vectol_x = 0;
                    }
                }

                img.y++;

                if(img.y > 240){
                    img.y = 240;
                    vectol_y = 0;
                }
            }
            else{
                img.y = img.y - 10;
                if(img.y < 0){
                    img.y = 0;
                    vectol_y = 1;
                }
            }
        })
    }
    game_.start();
}


/*
//sample_code3//

window.onload = function(){
    var game_ = new Game(320, 320);
    game_.fps = 24;
    game_.preload('./img/chara1.png', './img/start.png', './img/gameover.png');

    game_.onload = function(){

        var createTitleScene = function(){
            var TitleScene = new Scene();
            TitleScene.backgroundColor = '#fcc800';

            var startImg = new Sprite(236, 48);
            startImg.image = game_.assets['./img/start.png'];

            startImg.x = 42;
            startImg.y = 136;

            TitleScene.addChild(startImg);

            var TitleLabel = new Label("サンプルゲーム！");
            TitleLabel.textAlign = 'center';
            TitleLabel.color = '#ffffff';
            TitleLabel.x = 0;
            TitleLabel.y = 96;

            TitleScene.addChild(TitleLabel);

            var subTitleLabel = new Label("タップでゲーム開始");
            subTitleLabel.textAlign = 'center';
            subTitleLabel.x = 0;
            subTitleLabel.y = 196;
            subTitleLabel.font = '14px sans-serif';

            TitleScene.addChild(subTitleLabel);

            startImg.addEventListener(Event.TOUCH_START, function(e){
                game_.replaceScene(createGameScene());
            })

            return TitleScene;
        }

        var createGameScene = function(){
            var score = 0;
            var time = 240;
            var speed = 0;

            var GameScene = new Scene();
            GameScene.backgroundColor = '#fcc8f0';

            var scoreLabel = new Label("SCORE:" + score);
            scoreLabel.font = '14px sans-serif';

            GameScene.addChild(scoreLabel);

            var timeLimitLabel = new Label("TIME:" + time);
            timeLimitLabel.font = '14px sans-serif';
            timeLimitLabel.x = 0;
            timeLimitLabel.y = 20;

            GameScene.addChild(timeLimitLabel);

            var kumaImg = new Sprite(32, 32);
            kumaImg.image = game_.assets["./img/chara1.png"];

            function startup() {
                kumaImg.x = Math.random() * 288;
                kumaImg.y = Math.random() * 288;

                GameScene.addChild(kumaImg);

                speed = Math.random() * 8 - 4;
                if (speed > 0) {
                    kumaImg.scaleX = 1;
                }
                else {
                    kumaImg.scaleX = -1;
                }
            }

            startup();

            GameScene.addEventListener(Event.ENTER_FRAME, function(){
                time--;
                timeLimitLabel.text = "TIME:" + time;

                if(time <= 0){
                    game_.replaceScene(createScoreScene(score));
                }

                kumaImg.x = kumaImg.x + speed;

                if(kumaImg.x > 320){
                    kumaImg.x = -32;
                }
                else if(kumaImg.x < -32){
                    kumaImg.x = 320;
                }

                if(kumaImg.frame < 2){
                    kumaImg.frame++;
                }
                else if(kumaImg.frame >0){
                    kumaImg.frame--;
                }
            })

            kumaImg.addEventListener(Event.TOUCH_START, function(e){
                score++;
                scoreLabel.text = "SCORE:" + score;
                startup();
            })

            return GameScene;
        }

        var createScoreScene = function(result){
            var ScoreScene = new Scene();
            ScoreScene.backgroundColor = '#303030';

            var gameoverImg = new Sprite(189, 97);

            gameoverImg.image = game_.assets['./img/gameover.png'];
            gameoverImg.x = 65;
            gameoverImg.y = 112;

            ScoreScene.addChild(gameoverImg);

            var resultLabel = new Label("SCORE:" + result);
            resultLabel.textAlign = 'center';
            resultLabel.color = '#ffffff';
            resultLabel.x = 0;
            resultLabel.y = 60;
            resultLabel.font = '40px sans-serif';

            ScoreScene.addChild(resultLabel);

            var retryLabel = new Label("もう一度遊ぶ");
            retryLabel.color = '#ffffff';
            retryLabel.x = 0;
            retryLabel.y = 300;
            retryLabel.font = '20px sans-serif';

            ScoreScene.addChild(retryLabel);

            retryLabel.addEventListener(Event.TOUCH_START, function(e){
                game_.replaceScene(createTitleScene());
            })

            return ScoreScene;
        }

        game_.replaceScene(createTitleScene());
    }

    game_.start();
}
*/


/*
//sample_code2//
window.onload = function(){

    var game_ = new Game(320, 320);
    game_.fps = 24;
    game_.onload = function(){

        //TitleScene
        var createTitleScene = function(){
            var TitleScene = new Scene();
            var TitleLabel = new Label("Title Scene");

            TitleScene.addChild(TitleLabel);
            TitleScene.backgroundColor = 'rgba(100, 100, 100, 1)';

            TitleScene.addEventListener(Event.TOUCH_START, function(e){
                game_.replaceScene(createGameScene());
            });

            return TitleScene;
        }

        //GameScene
        var createGameScene = function(){
            var GameScene = new Scene();
            var GameLabel = new Label("Game Scene");

            GameScene.addChild(GameLabel);
            GameScene.backgroundColor = 'rgba(255, 255, 255, 1)';


            GameScene.addEventListener(Event.TOUCH_START, function(e){
                game_.pushScene(createGameoverScene());
            })

            return GameScene;
        }

        //Gameover Scene
        var createGameoverScene = function(){
            var GameoverScene = new Scene();
            var GameoverLabel = new Label("Game Over");

            GameoverScene.addChild(GameoverLabel);
            GameoverScene.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            GameoverLabel.x = 100;
            GameoverLabel.y = 100;

            GameoverScene.addEventListener(Event.TOUCH_START, function(e){
                game_.popScene()
            })

            return GameoverScene;
        }

        game_.replaceScene(createTitleScene());

    }

    game_.start();

}
*/

/*
//sample_code1//

window.onload = function () {

    var game = new Game(320, 320);
    game.fps = 24;

    game.preload("./img/chara1.png");

    game.onload = function () {


        var img = new Sprite(32, 32);

        img.image = game.assets["./img/chara1.png"];
        img.x = 100;
        img.y = 100;
        game.rootScene.backgroundColor = "#ffaaaa";
        game.rootScene.addChild(img);


        var speed = 0;

        img.addEventListener(Event.ENTER_FRAME, function () {
            if (img.frame != 0) {
                img.frame = img.age % 2 + 1;
            }
            //this.moveBy(5, 0);
            img.x = img.x + speed;
        })

        game.rootScene.addEventListener(Event.TOUCH_START, function (e) {
            if (e.x > img.x) {
                img.frame = 1;
                img.scaleX = 1;
                speed = 1;
            }
            else {
                img.frame = 1;
                img.scaleX = -1;
                speed = -1;
            }
        })
    }

    game.start();
}
*/