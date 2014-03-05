var Result = function()//{{{
{
  this._score  = 0;
  this._combo  = 0;
  this._total  = 0;

}//}}}


Result.prototype.onDidLoadFromCCB = function()//{{{
{

  this.rootNode.setScore = function(score){
    return this.controller.setScore(score);
  }
  this.rootNode.setCombo = function(combo){
    return this.controller.setCombo(combo);
  }
  this.rootNode.setTotal = function(){
    return this.controller.setTotal();
  }
}//}}}

Result.prototype.onResult = function()//{{{
{
  var scene = cc.BuilderReader.loadAsScene('GameScene.ccbi');
    cc.Director.getInstance().replaceScene(scene);

}//}}}

Result.prototype.onHome = function()//{{{
{
  var scene = cc.BuilderReader.loadAsScene('HomeScene.ccbi');
    cc.Director.getInstance().replaceScene(scene);

}//}}}



Result.prototype.setScore = function(score)//{{{
{
  this._score = score;
}//}}}

Result.prototype.setCombo = function(combo)//{{{
{
  this._combo  = combo;
}//}}}

Result.prototype.setTotal  = function()//{{{
{
  this.score.setString(this._score);
  this.combo.setString(this._combo);

  var total = this._score + (this._score * (this._combo * 0.05) )
  total = parseInt(total, 10);
  this.total.setString(total);

  Score.add(total, this._combo);
}//}}}


