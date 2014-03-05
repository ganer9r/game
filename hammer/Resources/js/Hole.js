var Hole = function()//{{{
{
  this.type = 0;
  this.moveType = 0;
  this.charLayer = null;

}//}}}

Hole.prototype.onDidLoadFromCCB = function()//{{{
{
  //this.rootNode.reorderChild(this.charZone, 11);





  this.rootNode.setBg = function(bg1, bg2){ return this.controller.setBg(bg1, bg2); }
  this.rootNode.create = function(cnt){ return this.controller.create(cnt); }
  this.rootNode.move = function(){ return this.controller.move(); }
  this.rootNode.hit = function(){ return this.controller.hit(); }
  this.rootNode.isSelected = function(loc){ return this.controller.isSelected(loc); }
  this.rootNode.isEnabled = function(loc){ return this.controller.isEnabled(); }

}//}}}



Hole.prototype.create = function(cnt)//{{{
{
  if( this.isEnabled() )  return false;


  this.type = MoleTool.getMole(cnt);
  this.mole = Mole.create( '0'+this.type, MoleTool.getLife(cnt) );
  
  this.charLayer = cc.Sprite.create( this.mole.getEmotionDefaultPath() );
    this.charLayer.setTexture( this.mole.currEmotion() );
    this.charLayer.setScale(0.25);
    this.charLayer.setAnchorPoint( cc.p(0, 0) );
    this.charLayer.setPosition( cc.p(0, -50) );
  this.charZone.addChild(this.charLayer);


  this.moveType = 1;

  return true;
}//}}}

Hole.prototype.setBg = function(bg1, bg2)//{{{
{
  //var a = cc.Sprite.createWithTexture(img, bg1 );
  //var b = cc.Sprite.createWithTexture(img, bg2 );
  bg1.setPosition( cc.p(25,0) );
  bg2.setPosition( cc.p(25,-25) );
  //b.setPosition( cc.p(25,0) );

  //this.rootNode.addChild(a);
  this.rootNode.addChild(bg1, 1);
  this.rootNode.reorderChild(this.bg1, 2);
  this.rootNode.reorderChild(this.charZone, 3);
  this.rootNode.addChild(bg2, 4);
  this.rootNode.reorderChild(this.bg2, 5);

}//}}}

Hole.prototype.hit = function()//{{{
{
    if(!this.isEnabled() || this.mole.curr() == 9 )
      return false;


    this.mole.hit();

    this.charLayer.setTexture( this.mole.currEmotion() );
    this.charLayer.setPosition(0,0);
    return this.mole;
}//}}}

Hole.prototype.isEnabled = function()//{{{
{
    if(this.type < 1)
      return false;

    return true;
}//}}}

Hole.prototype.remove = function()//{{{
{
  this.charZone.removeChild(this.charLayer);
  this.mole = null;
  this.type = 0;

}//}}}

Hole.prototype.move = function()//{{{
{
    if( this.type < 1) return false;


    if(this.moveType == 1){
      var p = this.charLayer.getPosition();
      var y = p.y + 8;

      if( y >= 0 ){
        y = 0;
        this.mole.addLife(-1);
      }
    } else if( this.moveType == 2){
      var p = this.charLayer.getPosition();
      var y = p.y - 8;

      if( y <= -50 ){
        y = -50;
        this.remove();
        return true;
      }

    }


    if( !this.mole.isLife() )
      this.moveType = 2;

    this.charLayer.setPosition( cc.p(0, y));
}//}}}

Hole.prototype.isSelected = function(loc)//{{{
{
  var pos = this.rootNode.getPosition();
  var py  = pos.y - 10;

  if( pos.x <= loc.x && (pos.x+50) >= loc.x &&
      py <= loc.y && (py+50) >= loc.y)
    return true;

  return false;
}//}}}



