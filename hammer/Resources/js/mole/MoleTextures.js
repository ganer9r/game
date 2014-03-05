var MoleTextures  = {
  types:{}
};


MoleTextures.make = function(type)//{{{
{
  if(this.types[type]) return true;

  var items = _data.mole[type].emotions;
  var emos = {};
  for(var i=0; i< items.length; i++){
    var key = items[i];
    emos[key] = cc.SpriteBatchNode.create("res/mouse/mole_"+type+key+".png").getTexture();
  }

  this.types[type]  = emos;
}//}}}

MoleTextures.get = function(type, emotion)//{{{
{
  if( this.types[type] == undefined ) return false;
  if( this.types[type][emotion] == undefined ) return false;

  return this.types[type][emotion];
}//}}}

MoleTextures.getAll = function(type)//{{{
{
  if( this.types[type] == undefined ) return false;

  return this.types[type];
}//}}}




