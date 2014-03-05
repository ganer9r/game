var Mole02 = Mole.extend({
    hp:2,

    ctor:function() //{{{
    {
      this._super();
    },//}}}

    hit:function() //{{{
    {
      this.hp--;
      var audioEngine = cc.AudioEngine.getInstance();

      if(this.hp > 0)
      {
        audioEngine.playEffect('sound/hit.mp3');
        this._curr = 5;
      }
      else
      {
        audioEngine.playEffect('sound/aya.wav');
        this._curr = 9;
        this.setLife(30);
      }
    },//}}}


});
