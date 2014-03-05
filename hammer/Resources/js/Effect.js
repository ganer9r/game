var EffectList  = {};

var Effect = {
  init: function()
  {
    EffectList  = {};
  },

  show: function(node, pos)//{{{
  {

    var key = '_'+pos.x+'_'+pos.y;
    if(!EffectList[key])
    {
      var sp = cc.Sprite.create("res/effect/pang.png");
      sp.setPosition(cc.p(pos.x+25, pos.y+25));

      EffectList[key] = sp;
      node.addChild(sp); 
      sp.setOpacity(0);
    }

    var sp = EffectList[key];
    sp.setScale(0.1);
    sp.setOpacity(1);

    var act1 = cc.ScaleTo.create(0.2, 0.5, 0.5);
    var act2 = cc.FadeOut.create(0.3);
    sp.runAction( cc.Spawn.create(act1, act2) );


  }, //}}}

  shake: function(node, pos)//{{{
  {
    var act1 = cc.MoveBy.create(0.05, cc.p(20, 0));
    var act2 = cc.MoveBy.create(0.1, cc.p(-40, 0));
    var act3 = cc.MoveBy.create(0.1, cc.p(40, 0));
    var act4 = cc.MoveBy.create(0.05, cc.p(-20, 0));
    var act = cc.Sequence.create(act1, act2, act3, act4);
    node.runAction(act);

  },//}}}

  combo: function(node, pos)//{{{
  {
    var act0 = cc.ScaleTo.create(0.1, 0.5, 1);
    var act1 = cc.ScaleBy.create(0.1, 1.2, 1.2);
    var act2 = act1.reverse();

    var act = cc.Sequence.create(act0, act1, act2, act1, act2, act1, act2);
    node.runAction(act);
  },//}}}

  close: function(node)//{{{
  {
    var act1 = cc.ScaleTo.create(0.15, 0, 0);
    var act2 = cc.ScaleTo.create(0.15, 0.3, 0.3);

    var act = cc.Sequence.create(act1, act2, act1) ;
    node.runAction(act);
  },//}}}

  open: function(node)//{{{
  {
    var act0 = cc.ScaleTo.create(0.01, 0, 0);
    var act1 = cc.ScaleTo.create(0.15, 1, 1);
    var act2 = cc.ScaleTo.create(0.1, 0.7, 0.7);
    var act = cc.Sequence.create(act0, act1, act2, act1);
    node.runAction(act);
  },//}}}


  setMusic: function()//{{{
  {
    var audioEngine = cc.AudioEngine.getInstance();
    var bgm = sys.localStorage.getItem('bgm')

    if( bgm != 'true') {
      audioEngine.setMusicVolume(0);
      audioEngine.setEffectsVolume(0);
    } else {
      audioEngine.setMusicVolume(0.8);
      audioEngine.setEffectsVolume(1);

    }

  },//}}}

}



