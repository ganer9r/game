var Mole = cc.Node.extend({
    _type:0,
    _curr:1,
    _life:0,
    _score:0,




    ctor: function() //{{{
    {
      this._super();

      this.setLife( Math.floor(Math.random() * 50) + 30 );
    },//}}}




    setType: function(type)//{{{
    {
      this._type = type;
      this._score = _data.mole[type].score;
    },//}}}

    getEmotion: function(emotion)//{{{
    {
      return MoleTextures.get(this._type, emotion);
    },//}}}

    getEmotionDefaultPath: function()//{{{
    {
      return "res/mouse/mole_"+this._type+"1.png";
    },//}}}

    currEmotion: function()//{{{
    {
      return this.getEmotion(this._curr);
    },//}}}

    curr: function() //{{{
    {
      return this._curr;
    },//}}}




    setLife: function(life) //{{{
    {
      this._life = life;
    },//}}}

    addLife: function(num) //{{{
    {
      this._life = this._life + num;
    },//}}}

    isLife: function() //{{{
    {
      if(this._life > 0) return true;

      return false;
    },//}}}

    getType: function()//{{{
    {
      return this._type;
    },//}}}

    getScore: function()//{{{
    {
      if(this._curr == 9)
        return this._score;
    }, //}}}





    hit:function() //{{{
    {
      var audioEngine = cc.AudioEngine.getInstance();
      audioEngine.playEffect("sound/aya.wav");
      this._curr = 9;
      this.setLife(30);
      //return emotion;
    },//}}}

});


Mole.create = function(type, time)//{{{
{
    var item = _data.mole[type];
    if(item){
      var t = eval("new "+item.obj);
      t.setType(type);
      t.setLife(time);
      MoleTextures.make(type);

      return t;
    }

    return false;
}//}}}



