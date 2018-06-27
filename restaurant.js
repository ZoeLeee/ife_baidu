class Restaurant {
  constructor(n, property) {
    this.staff = new Set();
    this.customers = new Set();
    this.seats = n;
    this.property = property;
    document.getElementById("property").textContent = "$" + property;
  }
  hire(w) {
    this.staff.add(w);
  }
  fire(w) {
    this.staff.delete(w);
  }
  haveSeat(c) {
    if (this.customers.size <= this.seats)
      this.customers.add(c);
  }

}
class Worker {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }
  work() {

  }
}
class Waiter extends Worker {
  constructor(name, salary) {
    super(name, salary);
  }
  work(par) {
    if (Array.isArray(par)) {
      console.log("点菜");
      return par;
    }
    else {
      console.log("上菜");
    }
  }

  static GetWaiter() {
    if (!this.W) {
      this.W = new Waiter("Joe", 3000)
    }
    return this.W;
  }
}
class Chef extends Worker {
  constructor(name, salary) {
    super(name, salary);
  }
  work(d) {
    console.log("做好了");
    return d;
  }
  static GetChef() {
    if (!this.C) {
      this.C = new Chef("Zoe", 30000)
    }
    return this.C;
  }
}

const CustomerState={
  HaveSeat:0,
  Order:1,
  Eatting:2,
  Paying:3
}
class Customer {
  constructor(name) {
    this.name = name;
    this.menu = new Menu();
    this.state=CustomerState.HaveSeat;
  }
  eating(dish) {
    dish.forEach(e => {
      console.log("顾客再吃" + e);
    });
    console.log("吃完了");
    this.isEatting = false;
  }
  //点菜
  orderDishes() {
    let dishes=[];
    let is=new Set();
    console.log("正在点菜");
    new Promise(res=>{
      setTimeout(()=>{
        this.state=Customer.Order;
        let len=Dishes.length;
        let count=GetNumber(0,len-1);
        for(let i=0;i<=count;i++){
          let index=GetNumber(0,len-1);
          while(is.has(index)||is.size!==len){
            index=GetNumber(0,len-1);
          }
          is.add(index)
          dishes.push(Menu.Factory(Dishes[index]));
        }
        res(dishes);
      },3000)
    })
    .then(d=>{
      console.log("点好了");
      return d;
    })
  }
}

let waiter = Waiter.GetWaiter();
let chef = Chef.GetChef();

let restaurant = new Restaurant(10, 10000);

restaurant.hire(waiter);
restaurant.hire(chef);
let customer1 = new Customer("Lee");

restaurant.haveSeat(customer1);

let dish = customer1.orderDishes();


// let doDishes = []
// for (let d of dishes) {
//   doDishes.push(chef.work(d));
// }
// console.log('doDishes: ', doDishes);

// waiter.work(dishes[0]);

// customer1.eating(doDishes);

// if (!customer1.isEatting) {
//   restaurant.customers.delete(customer1);
// }
// console.log(restaurant.customers);
