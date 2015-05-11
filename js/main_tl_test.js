enchant();

window.onload = function(){
    var game_ = new Game(320, 320);
    game_.fps = 30;
    game_.preload('./img/chara1.png');

    game_.onload = function() {
        var img = new Sprite(32, 32);

        img.image = game_.assets['./img/chara1.png'];
        img.frame = 4;

        img.x = 144;
        img.y = 0;

        game_.rootScene.backgroundColor = '#ffffff';
        game_.rootScene.addChild(img);

        img.tl.moveTo(174, 30, 10);     // x=174, y=30の地点?まで10フレームかけて移動させる
        img.tl.moveTo(114, 90, 20);     // x=114, y=90の地点?まで20フレームかけて移動させる
        img.tl.moveTo(174, 150, 20);     // x=174, y=150の地点?まで20フレームかけて移動させる
        img.tl.then(function(){
        //    alert("then()を使うとアニメーションの途中に関数を挟められる！");
        });
        img.tl.moveTo(114, 210, 20);     // x=114, y=210の地点?まで20フレームかけて移動させる
        img.tl.moveTo(144, 240, 10);     // x=144, y=240の地点?まで10フレームかけて移動させる
        img.tl.moveTo(144, 0, 10);      // x=144, y=0の地点?まで10フレームかけて移動させる
        img.tl.loop();                 // 全て終わったら初めから繰り返す

/*        // くまがジグザグに移動するアニメーションを登録する
        img.tl.moveTo(174, 30, 10, enchant.Easing.QUAD_EASEINOUT);     // x=174, y=30の地点?まで10フレームかけて移動させる
        img.tl.moveTo(114, 90, 20, enchant.Easing.QUAD_EASEINOUT);     // x=114, y=90の地点?まで20フレームかけて移動させる
        img.tl.moveTo(174, 150, 20, enchant.Easing.QUAD_EASEINOUT);     // x=174, y=150の地点?まで20フレームかけて移動させる
        img.tl.moveTo(114, 210, 20, enchant.Easing.QUAD_EASEINOUT);     // x=114, y=210の地点?まで20フレームかけて移動させる
        img.tl.moveTo(144, 240, 10, enchant.Easing.QUAD_EASEINOUT);     // x=144, y=240の地点?まで10フレームかけて移動させる
        img.tl.moveTo(144, 0, 10, enchant.Easing.QUAD_EASEINOUT);      // x=144, y=0の地点?まで10フレームかけて移動させる
        img.tl.loop();                 // 全て終わったら初めから繰り返す
*/

/*        img.tl.moveTo(174, 30, 30);
        img.tl.moveTo(114, 90, 60);
        img.tl.moveTo(174, 150, 60);
        img.tl.moveTo(114, 210, 60);
        img.tl.moveTo(144, 240, 30);
        img.tl.moveTo(144, 0, 24);
        img.tl.loop();
*/

/*        game_.rootScene.addEventListener(Event.ENTER_FRAME, function() {
            // くまがジグザグに移動するアニメーションを登録する
            img.tl.moveTo(174, 30, 30);     // ?x=174, y=30の地点まで30フレームかけて移動させる
            img.tl.moveTo(114, 90, 60);     // ?x=114, y=90の地点まで60フレームかけて移動させる
            img.tl.moveTo(174, 150, 60);     // ?x=174, y=150の地点まで60フレームかけて移動させる
            img.tl.moveTo(114, 210, 60);     // ?x=114, y=210の地点まで60フレームかけて移動させる
            img.tl.moveTo(144, 240, 30);     // ?x=144, y=240の地点まで30フレームかけて移動させる
            img.tl.moveTo(144, 0, 24);      // ?x=144, y=0の地点まで24フレームかけて移動させる
            img.tl.loop();                 // 全て終わったら初めから繰り返す
        })
*/
    }
    game_.start();
}
