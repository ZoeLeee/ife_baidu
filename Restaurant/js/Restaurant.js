class Restaurant{
  constructor(option){
    this._id=0;
    this._cash=option.cash||0;
    this._seats=option.seats;
    this._staffs=[];
    this.dishes=new Dishes();
    this._customerList=[];
    appDom.setPrice(this._cash);
  }
  hire(s){
    s._id= this._id++;
    this._staffs.push(s);
  }
  fire(s){
    let index=this._staffs.indexOf(s);
    if(index!==-1)
      this._staffs.splice(index,1);
  }
  comeOn(c){
    this._customerList.push(c);
  }
  async Start(){
    setDomList('list',this._customerList);
    setDomText('cookStatus',"空闲");
    setDomText('waiterStatus',"空闲");
    let cook;
    let waiter;
    for(let s of this._staffs){
      if(s instanceof Cook)
        cook=s;
      else 
        waiter=s;
    }
    cook.setHandler(waiter);
    waiter.setHandler(cook);
    while(this._customerList.length>0){
      let c=this._customerList.shift();
      setDomList('list',this._customerList);
      waiter.setRecieveCustomer(c);
      setDomText('waiterStatus',"工作中");
      let dishList=await c.orderDishes(this.dishes);
      setDishesStatus('cusDishes',dishList);
      console.log("点了",dishList);
      waiter.work(dishList);
      await c.startEat(dishList);
      console.log("吃完换下一个顾客");
    }
    setDomText('waiterStatus',"空闲");
  }
}