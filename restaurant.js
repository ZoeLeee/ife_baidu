class Restaurant{
  constructor(n){
    this.staff=new Set();
    this.costomers=new Set();
    this.seats=n;
  }
  hire(w){
    this.staff.add(w);
  }
  fire(w){
    this.staff.delete(w);
  }

}
class Worker{
  static id=0;
  constructor(name,salary){
    this.name=name;
    this.salary=salary;
  }
  work(){

  }
}
class  Waiter extends Worker{
  work(par){
    if(Array.isArray(arr)){
      console.log("点菜"+par);
    }
    else
    {
      console.log("上菜");
    }
  }
}
class Chef extends Worker{
  work(){
    console.log("制作食物");
  }
}

class Customer{
  eating(){

  }
  //点菜
  orderDishes(){

  } 
}
