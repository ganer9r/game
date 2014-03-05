var Combo = function()
{
  this.cnt  = 0;
  this.lasttime = 0;
  this.isCombo  = false;
  this.maxCombo = 0;

  this.combotime  = 0;
}

Combo.prototype.onDidLoadFromCCB = function()//{{{
{

  this.rootNode.get = function(){
    return this.controller.get();
  }
  this.rootNode.touch = function(mole, time){
    return this.controller.touch(mole, time);
  }
  this.rootNode.max = function(){
    return this.controller.max();
  }
  this.rootNode.nextMole = function(){
    return this.controller.nextMole();
  }
}//}}}

Combo.prototype.touch = function(mole, time)//{{{
{
  var lt = this.lasttime;
  this.lasttime = time;

  if(lt != 0 && time - lt > 3)
    this.cnt = 0;

  this.showCombo(mole);
}//}}}

Combo.prototype.showCombo = function(mole)//{{{
{
  if( mole.curr() == '9')
  {
    this.cnt++;
    if(this.cnt > this.maxCombo)
      this.maxCombo = this.cnt;

    var str = this.cnt+" Combo";
    this.txt.setString(str);
    Effect.combo( this.txt );
  }
}//}}}

Combo.prototype.max = function()//{{{
{
  return this.maxCombo;
}//}}}

Combo.prototype.get = function()//{{{
{
  return this.cnt;
}//}}}

Combo.prototype.nextMole = function()//{{{
{
  var delaytime  = 50 - (this.cnt * 2);
  if(delaytime <= 8) delaytime = 8;

  this.combotime = delaytime/8;
  if(this.combotime > 3)
    this.combotime = 3;

  return delaytime;
}//}}}



