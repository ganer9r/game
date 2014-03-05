var SharedHome = null;
var HomeScene = function()//{{{
{
  this._showMenu  = false;

};//}}}


HomeScene.prototype.onDidLoadFromCCB  = function()
{
  SharedHome = this;

  var act1 = cc.MoveBy.create(1.5, cc.p(0, -20) );
  var act2 = act1.reverse();
  var act3 = cc.Sequence.create(act1, act2);
  var act = cc.RepeatForever.create( act3);

  this.logo.runAction(act);
  this.menu.setPosition( cc.p(-300, 0) );
  this.dock.setPosition( cc.p(-300, 0) );
  this.rank.setVisible(false);
  this.credit.setVisible(false);
  this.credit.setAnchorPoint( cc.p(0, 0) );
  this.rank.setAnchorPoint( cc.p(0, 0) );
  this.credit.setScale(0);
  this.rank.setScale(0);


  Effect.setMusic();
  var audioEngine = cc.AudioEngine.getInstance();
  audioEngine.playMusic('bgm/home.mp3', true);
  
  this.rootNode.onUpdate = function(dt){
    return this.controller.onUpdate(dt);
  }
  this.rootNode.schedule(this.rootNode.onUpdate, 0.03);
}

HomeScene.prototype.onPlay = function()//{{{
{
  var scene = cc.BuilderReader.loadAsScene('GameScene.ccbi');
    cc.Director.getInstance().replaceScene(scene);

}//}}}

HomeScene.prototype.onPressButton = function(menuItem)//{{{
{
  var tag = menuItem.getTag();

  if(tag == '1'){
    this.tglBtn.setTag(2);
    this._showMenu = true;

  }else if(tag == '2'){
    this.tglBtn.setTag(1);
    this._showMenu = false;

  }else if(tag == '11'){
    var bgm  = sys.localStorage.getItem('bgm')

    if(bgm != 'true') bgm = 'true';
    else            bgm = 'false';

    sys.localStorage.setItem('bgm', bgm);
    Effect.setMusic();

  }else if(tag == '12'){
    this.addition_bg.setVisible(true);
    this.rank.setVisible(true);
    Effect.open(this.rank);

  }else if(tag == '13'){
    this.addition_bg.setVisible(true);
    this.credit.setVisible(true);
    Effect.open(this.credit);
  }


  var audioEngine = cc.AudioEngine.getInstance();
  audioEngine.playEffect("sound/click.ogg");

}//}}}

HomeScene.prototype.onUpdate = function(dt)//{{{
{
  this.actionMenu();

};//}}}

HomeScene.prototype.actionMenu = function()//{{{
{
  var x = this.menu.getPosition().x;
  if( this._showMenu ){
    if(x >= 0) return true;

    var p = -(x) - Math.ceil(( 300 - (x+300)) /3);
    p = (p < 3) ? 0 : p;
    p = cc.p(-p, 0);

    this.menu.setPosition( p );
    this.dock.setPosition( p );
  }else{
    if(x <= -300) return true;

    var p = x - (300+x)/3;
    p = (p < -297) ? -300 : p;
    var p = cc.p(p, 0);

    this.menu.setPosition( p );
    this.dock.setPosition( p );

  }

}//}}}

HomeScene.prototype.onClose = function(type)//{{{
{
  this.addition_bg.setVisible(false);

  if(type == 'credit'){
    Effect.close(this.credit);
    //this.credit.setVisible(false);

  }else{
    Effect.close(this.rank);
    //this.rank.setVisible(false);

  }
}//}}}



