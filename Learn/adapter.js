class Adaptee{
  specificRequset(){
    //do something
  }
}

class Adapter{
  constructor(adaptee){
    this.adaptee=adaptee;
  }
  request(){
    //do sth
    this.adaptee.specificRequset();
  }
}

let ada=new Adaptee();
let tar=new Adapter(ada);
tar.request();

class Shipping{
  request(zipStart,zipEnd,weight){
    console.log("处理中");
    return weight;
  }
}

class AdvancedShipping{
  login(cre){
    console.log("验证密钥"); 
  }
  setStart(start){
    console.log("设置start");
  }
  setDestination(des){
    console.log("设置des");
  }
  calculate(weight){
    console.log("计算重量");
    return weight;
  }
}

class ShippingAdapter{
  constructor(cre){
    this.shapping=new AdvancedShipping();
    this.shapping.login(cre);
  }
  request(zipStart,zipEnd,weight){
    this.shapping.setStart(zipStart);
    this.shapping.setDestination(zipEnd);
    return this.shapping.calculate(weight);
  }
}

class Log{
  constructor(){
    this.log="";
  }
  static add(msg){
    let l=new Log();
    l.log+=msg;
    console.log(l.log);
  }
  static show(){
    let l=new Log();
    console.log(l.log);
    l.log="";
  }
}

(()=>{
  let shipping=new Shipping();
  let cre={token:"0x000"};
  let adapter=new ShippingAdapter(cre);
  let cost=shipping.request("78701","10010","21bs")
  Log.add(cost);

  cost=adapter.request("78701","10010","21bs");
  Log.add(cost);
  
  Log.show();
})();