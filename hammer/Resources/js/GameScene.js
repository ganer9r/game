var GameScene = function()//{{{
{
  this.nHoleSize = 50;
  this.space = 5;
  this.startPosition = 480 - 50 - 50;
  this.startXPos = 20;
  
  this._delay = 10;
  this.delay = this._delay;
  this.holeList = [];

  this.sc = 0;

  this.updatetime = 1/60;
  this.times = 60;
  this.now  = 0;

  this.freeze = false;
};//}}}

SharedGame = null;
GameScene.prototype.onDidLoadFromCCB = function()//{{{
{
  SharedGame = this;

  var bg = this.bg.getTexture();
  for(var i=0; i<5; i++){
    var y = this.startPosition - (this.nHoleSize * i);
    var rsp = (i*this.space);

    for(var j=0; j<5; j++){
      var holeLayer = cc.BuilderReader.load("hole2.ccbi");
      this.holeList.push(holeLayer);

      var csp = this.startXPos + (j*this.space);
      var xx = (j*this.nHoleSize)+csp;
      var yy = y-rsp;

      holeLayer.setPosition(cc.p( xx , yy));

      var bgy = yy-this.startPosition+25 + rsp;
      var bgy = -(yy - this.startPosition) + 50;

      var bg1 = cc.Sprite.createWithTexture(bg, cc.rect(xx, bgy, 50, 100)  );
      var bg2 = cc.Sprite.createWithTexture(bg, cc.rect(xx, bgy+50, 50, 50)  );
      holeLayer.setBg(bg1, bg2 );

      this.stage.addChild(holeLayer);
    }
  }

  var audioEngine = cc.AudioEngine.getInstance();
  audioEngine.playMusic('bgm/game.mp3', true);

  Effect.init();


  this.rootNode.setTouchEnabled(true);
  this.rootNode.onTouchesBegan = function( touches, event) {
    this.controller.onTouchesBegan(touches, event);
    return true;
  };   





  this.rootNode.onUpMouse = function(touches, event){
    return this.controller.onUpMouse(touches, event);
  }


  this.rootNode.onUpdate = function(dt){
    return this.controller.onUpdate(dt);
  }



  this.rootNode.schedule(this.rootNode.onUpdate, this.updatetime);
};//}}}


GameScene.prototype.onTouchesBegan = function( touches, event) //{{{
{
  if(this.freeze)
    return false;


  var loc = touches[0].getLocation();
  var hole = null;

  for(var i=0; i<this.holeList.length; i++)
  {
    if(this.holeList[i].isSelected( loc ) )
    {
      hole  = this.holeList[i];
      break;
    }
  }


  //var mole  = this.findMole();
  //this.hitMole(mole);
  //this.actionScore(mole);
  
  try{
    var mole = hole.hit();
  }catch(e){
    var mole = null;
  }

  if(mole){
    var score = mole.getScore();

    if( score )
    {
      this.sc += score;
      this.score.setString(this.sc);
    }

    if( mole.curr() == '9')
      Effect.show( this.rootNode, hole.getPosition() );

    else if( mole.getType() == '03')
    {
      Effect.shake( this.rootNode, hole.getPosition() );
      //Combo.cancle();
    }


    if( mole.getType() != '03')
      this.combo.touch(mole, this.now);

  }

}//}}}

GameScene.prototype.onUpMouse = function(touches, event)//{{{
{
  while(true)
  {
    var n = Math.floor(Math.random() * 25);
    var hole = this.holeList[n];

    if( !hole.isEnabled() )
    {
      hole.create( this.combo.get() );
      break;
    }
  }
  return true;
};//}}}


GameScene.prototype.onUpdate = function(dt)//{{{
{
  if(this.freeze) 
    return false;

  //this.actionMole();
  //this.actionResult();

  for(var i=0; i<25;i++){
    this.holeList[i].move();
  }


  this.delay = this.delay - 1;
  if(this.delay < 1){
    this.delay = this.combo.nextMole();
    cc.log(this.delay);
    this.onUpMouse();
  }

  this.now += dt;
  var t = (this.times - this.now) / this.times;
  this.timevar.setString( Math.ceil(this.times - this.now) );
  this.time.setScaleX(t);

  if(t < 0){
    this.freeze = true;

    var result = cc.BuilderReader.load("Result.ccbi");
    result.setScore( this.sc );
    result.setCombo( this.combo.max() );
    result.setTotal();

    result.setPosition(cc.p(160, 240));
    this.rootNode.addChild(result);

    var audioEngine = cc.AudioEngine.getInstance();
    audioEngine.stopMusic();
    audioEngine.playEffect("sound/complate.mp3");
  }

};//}}}


