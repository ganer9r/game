var ScoreData = null;

var Score = {

  add: function(score, combo)//{{{
  {
    var d = new Date();
    var date  = d.getFullYear() +"-"+ (d.getMonth() + 1) +"-"+ d.getDate();
    var time  = d.getHours() +":"+ d.getMinutes() +":"+ d.getSeconds();

    var data  = {
      'score': score,
      'combo': combo,
      'date': date,
      'time': time,
    };


    var list  = Score.get();
    if(list.length > 0)
    {
      var newList = [];
      var tmp = data;
      for(var i=0; i<list.length; i++)
      {
        if(tmp.score < list[i].score )
        {
          newList.push(list[i]);
        }
        else
        {
          newList.push(tmp);
          tmp = list[i];
        }
      }

      newList.push(tmp);
      list  = newList.slice(0, 10);
    }
    else
    {
      list.push(data);
    }

    var str = JSON.stringify(list);
    sys.localStorage.setItem('rank', str);
    ScoreData = null;
  },//}}}

  get: function()//{{{
  {
    if( !ScoreData )
    {
      var data  = sys.localStorage.getItem('rank');
      if(data)
        ScoreData = JSON.parse(data);
      else
        ScoreData = [];
    }

    return ScoreData;
  },//}}}


}



