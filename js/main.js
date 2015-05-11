enchant();

window.onload = function(){
    var game_ = new Game(320, 320);
    game_.fps = 24;
    game_.preload('./img/start.png', './img/gameover.png', './img/retry_button.png', './img/chara1.png');
    game_.preload('./img/bg1.png', './img/bg2.png');
    game_.preload('./img/hurdle.png', './img/igaguri.png', './img/bird.png');

    game_.onload = function() {

        //タイトル画面
        var createTitleScene = function(){
            var TitleScene = new Scene();
            TitleScene.backgroundColor = '#fcc800';

            var startImg = new Sprite(236, 48);
            startImg.image = game_.assets['./img/start.png'];

            startImg.x = 42;
            startImg.y = 136;

            TitleScene.addChild(startImg);

            var TitleLabel = new Label("Bear's Run!!");
            TitleLabel.textAlign = 'center';
            //TitleLabel.color = '#ffffff';
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

        //ゲーム画面
        var createGameScene = function(){
            var GROUND_LINE = 250;
            var SCROLL_SPEED = 10;
            var score = 0;

            var GameScene = new Scene();
            GameScene.backgroundColor = '#8cc820';

            var first_backGround = new Sprite(320, 320);
            first_backGround.image = game_.assets['./img/bg1.png'];
            first_backGround.x = 0;
            first_backGround.y = 0;

            GameScene.addChild(first_backGround);

            var second_backGround = new Sprite(320, 320);
            second_backGround.image = game_.assets['./img/bg2.png'];
            second_backGround.x = 320;
            second_backGround.y = 0;

            GameScene.addChild(second_backGround);

            var Huedle = new Sprite(50, 100);
            Huedle.image = game_.assets['./img/hurdle.png'];
            Huedle.x = -Huedle.width;
            Huedle.y = GROUND_LINE - Huedle.height;

            GameScene.addChild(Huedle);

            var Mine = new Sprite(42, 31);
            Mine.image = game_.assets['./img/igaguri.png'];
            Mine.x = -Mine.width;
            Mine.y = GROUND_LINE - Mine.height;

            GameScene.addChild(Mine);

            var Bird = new Sprite(64, 44);
            Bird.image = game_.assets['./img/bird.png'];
            Bird.x = -Bird.width;
            Bird.y = 120;

            GameScene.addChild(Bird);

            var charImg = new Sprite(32, 32);
            charImg.image = game_.assets['./img/chara1.png'];
            charImg.x = 40;
            charImg.y = GROUND_LINE - charImg.height;

            GameScene.addChild(charImg);

            var charHit = new Sprite(1, 1);
            //charHit.image =
            charHit.x = charImg.x + (charImg.width / 2);
            charHit.y = charImg.y + (charImg.height / 2);

            GameScene.addChild(charHit);

            var scoreLabel = new Label("");
            scoreLabel.font = '14px sans-serif';
            scoreLabel.x = 20;
            scoreLabel.y = 10;

            GameScene.addChild(scoreLabel);


            GameScene.addEventListener(Event.TOUCH_START, function(e){
                charImg.tl.moveBy(0, -120, 12, enchant.Easing.SIN_EASEOUT);
                charImg.tl.moveBy(0, 120, 12, enchant.Easing.SIN_EASEIN);
            })

            GameScene.addEventListener(Event.ENTER_FRAME, function(e){
                score = score + SCROLL_SPEED;
                scoreLabel.text = "SCORE:" + score.toString();

                first_backGround.x = first_backGround.x - SCROLL_SPEED;
                second_backGround.x = second_backGround.x - SCROLL_SPEED;
                if(first_backGround.x <= -320){
                    first_backGround.x = 320;
                }
                if(second_backGround.x <= -320){
                    second_backGround.x = 320;
                }

                if(score % 640 == 0){
                    Huedle.x = 320;
                }
                if(score % 560 == 0){
                    Mine.x = 320;
                }
                if(score % 3000 == 0){
                    Bird.x = 320;
                }
                if(Huedle.x > -Huedle.width){
                    Huedle.x = Huedle.x - SCROLL_SPEED;
                    if(Huedle.intersect(charHit)){
                        prepareResult();
                    }
                }
                if(Mine.x > -Mine.width){
                    Mine.x = Mine.x - SCROLL_SPEED;
                    if(Mine.intersect(charHit)){
                        prepareResult();
                    }
                }
                if(Bird.x > -Bird.width) {
                    Bird.x = Bird.x - (SCROLL_SPEED * 1.2);
                    if (Bird.frame == 0) {
                        Bird.frame = 1;
                    }
                    else {
                        Bird.frame = 0;
                    }
                    if(Bird.intersect(charHit)){
                        prepareResult();
                    }
                }

                if(charImg.frame < 2){
                    charImg.frame++;
                }
                else if(charImg.frame > 0){
                    charImg.frame--;
                }
                charHit.x = charImg.x + (charImg.width / 2);
                charHit.y = charImg.y + (charImg.height / 2);

                function prepareResult(){
                    scoreLabel.text = "";
                    charImg.frame = 3;
                    game_.pushScene(createResultScene(score));
                }
            })

            return GameScene;
        }

        //リザルト画面
        var createResultScene = function(result){
            var ResultScene = new Scene();
            ResultScene.backgroundColor = 'rgba(0, 0, 0, 0.5)';

            //var gameoverImg = new Sprite(189, 97);
            var gameoverImg = new Sprite(400, 180);

            gameoverImg.image = game_.assets['./img/gameover.png'];
            gameoverImg.scale(0.5, 0.5);
            //gameoverImg.x = 65;
            //gameoverImg.y = 112;
            gameoverImg.x = -50;
            gameoverImg.y = 50;

            ResultScene.addChild(gameoverImg);

            var resultLabel = new Label("SCORE:" + result);
            resultLabel.textAlign = 'center';
            resultLabel.color = '#ffffff';
            resultLabel.x = 0;
            resultLabel.y = 60;
            resultLabel.font = '40px sans-serif';

            ResultScene.addChild(resultLabel);

            var retryLabel = new Label("もう一度遊ぶ");
            retryLabel.color = '#ffffff';
            retryLabel.x = 20;
            retryLabel.y = 280;
            retryLabel.font = '20px sans-serif';

            ResultScene.addChild(retryLabel);

            retryLabel.addEventListener(Event.TOUCH_START, function(e){
                game_.replaceScene(createTitleScene());
            })

            return ResultScene;
        }

        game_.replaceScene(createTitleScene());
    }

    game_.start();
}
