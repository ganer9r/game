var Rank = function()//{{{
{

}//}}}


Rank.prototype.onDidLoadFromCCB = function()
{
  this.displayScore();
}


Rank.prototype.onTouchClose = function(menuItem)//{{{
{
  SharedHome.onClose('rank');
}//}}}


Rank.prototype.displayScore = function()
{
  var list  = Score.get();
  var len = list.length;

  if(len > 0)
  {
    for(var i=0; i<len; i++)
    {
      var rank   = cc.LabelTTF.create((i+1), 'Arial-BoldMT', 14); 
      var score   = cc.LabelTTF.create(list[i].score, 'Arial-BoldMT', 14); 
      var combo   = cc.LabelTTF.create(list[i].combo, 'Arial-BoldMT', 14); 
      var date   = cc.LabelTTF.create(list[i].date, 'Arial-BoldMT', 14); 
      var time   = cc.LabelTTF.create(list[i].time, 'Arial-BoldMT', 13); 

      var y = 130 - (30*i);

      rank.setPosition( cc.p(-115, y) );
      score.setPosition( cc.p(-50, y) );
      combo.setPosition( cc.p(20, y) );
      date.setPosition( cc.p(90, y+5) );
      time.setPosition( cc.p(90, y-8) );


      rank.setColor( cc.c4b(100,100,100, 255) );
      score.setColor( cc.c4b(100,100,100, 255) );
      combo.setColor( cc.c4b(100,100,100, 255) );
      date.setColor( cc.c4b(100,100,100, 255) );
      time.setColor( cc.c4b(150,150,150, 255) );

      this.rootNode.addChild(rank);
      this.rootNode.addChild(score);
      this.rootNode.addChild(combo);
      this.rootNode.addChild(date);
      this.rootNode.addChild(time);
    }


  }

}
