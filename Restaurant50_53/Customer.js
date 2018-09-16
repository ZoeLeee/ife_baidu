const CustomerState = {
  HaveSeat: 0,
  Order: 1,
  Eatting: 2,
  Paying: 3
}
class Customer {
  constructor(name) {
    this.name = name;
    this.id=0;
    this.menu = new Menu();
    this.state = CustomerState.HaveSeat;
    this.dishes=[];
    this.eatedDishes=new Set();
    this.price=0;
    //0入座，1点菜，2.吃菜，3.付款4离开，-1，排队
    this.status=-1;
  }
  async eating(dish) {
    if(dish){
      new Promise(res=>{
        let timer=setInterval(()=>{
          if(this.eatedDishes.size===this.dishes.length){
            console.log("全吃完了");
            clearInterval(timer);
            res();
          }
        },500)
      })
      let dishStatus = document.getElementsByClassName(dish.name+"Status")[0];
        dishStatus.innerText = "正在吃";
        await delay(3000);
        dishStatus.innerText = "吃完了";
        this.eatedDishes.add(dish);
    }
  }
  //点菜
  async orderDishes() {
    this.status=1;
    let status = document.getElementById(this.id).getElementsByClassName("status")[0];
    let is = new Set();
    status.innerHTML = "正在点菜";
    return new Promise(res => {
      setTimeout(() => {
        this.state = Customer.Order;
        let len = Dishes.length;
        let count = GetNumber(0, len - 1);
        for (let i = 0; i <= count; i++) {
          let index = GetNumber(0, len - 1);
          while (is.has(index) && is.size !== len) {
            index = GetNumber(0, len - 1);
          }
          is.add(index)
          let dish = Menu.Factory(Dishes[index]);
          dish.owner = this;
          this.dishes.push(dish);
          this.price+=dish.price;
        }
        
        status.innerHTML = "点好了";
        ShowDishes(this.id, this.dishes, true)
        res(this.dishes);
      }, 3000)
    })

  }
}