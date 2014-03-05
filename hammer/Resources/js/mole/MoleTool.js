
var MoleTool = {
  set: function(cnt)
  {
    this.cnt;
  },

  getMole: function(cnt)
  {
    var a = [1,2,3];

    if(cnt < 10)
      a = [1];
    else if(cnt < 20)
      a = [1,3];

    var idx = Math.floor(Math.random() * a.length);
    return a[idx];
  },

  getLife: function(cnt)
  {
    if(cnt < 10)
      return Math.floor(Math.random() * 30) + 100;
    else if(cnt < 20)
      return Math.floor(Math.random() * 30) + 70;
    else
      return Math.floor(Math.random() * 30) + 30;

  }


}


