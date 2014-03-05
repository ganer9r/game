var Mole03 = Mole.extend({

    ctor:function() {
      this._super();

    },

    hit: function() //{{{
    {
      var audioEngine = cc.AudioEngine.getInstance();
      audioEngine.playEffect('sound/what.mp3');
    }, //}}}

});
