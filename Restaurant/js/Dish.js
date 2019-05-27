function getRandom(max,min=0){
  return Math.floor(Math.random()*(max-min+1)+min);
}

class Dish {
  constructor(option) {
    this.name = option.name;
    this._cost = option.cost;
    this._price = option.price;
    this.time=option.time;
    this.status=0;
  }
}

class Dishes {
  constructor() {
    this._dishList = new Map();
    this.init();
  }
  init() {
    let str="abcdefghijklmnopqrstuvdxyz";
    let str1="ABCDEFGHIJKLMNOPKRSGUVWXYZ";
    for(let i=0;i<20;i++){
      let cost=getRandom(100);
      let d=new Dish({
        name:str1[getRandom(25)]+str[getRandom(25)]+str[getRandom(25)],
        cost,
        price:cost+getRandom(20),
        time:getRandom(5)
      });
      this._dishList.set(d.name, d);
    }

  }
  async order() {
    let dishList=[...this._dishList.values()];
    let dishes=[];
    setDomText('cusTime',"还剩3s");
    for(let i=1;i<=3;i++){
      await wait(1*TIME);
      setDomText('cusTime',"还剩"+(3-i)+"s");
      let dishCount=getRandom(2,0);
      for(let i=0;i<=dishCount;i++){
        dishes.push(dishList[getRandom(this._dishList.size-1)]);
      }
    }
    setDomText('cusTime',"");
    return dishes;
  }
}