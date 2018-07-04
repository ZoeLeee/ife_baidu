class Restaurant {
  constructor(n, property) {
    this.staff = new Set();
    this.waiters=new Set();
    this.chefs=new Set();
    this.customers = new Set();
    this.seats = n;
    this.property = property;
    document.getElementById("property").textContent = "$" + property;
    this.seatsHTML = document.getElementById("seats")
  }
  hire(w) {
    this.staff.add(w);
    if(w.type==="waiter"){
      this.waiters.add(w)
    }else{
      this.chefs.add(w);
    }
  }
  fire(w) {
    this.staff.delete(w);
    if(w.type==="waiter"){
      this.waiters.delete(w)
    }else{
      this.chefs.add(w);
    }
  }
  haveSeat(c) {
    if (this.customers.size <= this.seats) {
      this.customers.add(c);
      let li = document.createElement("li");
      li.style.border = "1px solid #000";
      li.style.margin = "0px;";
      li.id = c.name;
      let img = new Image();
      img.src = "img/customer.png";
      li.appendChild(img);
      let status = document.createElement("span");
      status.className = "status";
      status.textContent = "入座";

      li.appendChild(status);
      this.seatsHTML.appendChild(li);

      let dishes = document.createElement("ul");
      dishes.className = "dishes";
      li.appendChild(dishes);
    }
  }

}
class Worker {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
    this.isWorking=false;
  }
  work() {

  }
}
class Waiter extends Worker {
  constructor(name, salary) {
    super(name, salary);
    this.type="waiter";
  }
  async work(par) {
    this.isWorking=true;
    console.log(typeof par);
    if (Array.isArray(par)) {
      document.getElementById("waiter").getElementsByClassName("status")[0].innerText="点菜中";
      //给厨师做
      WorkCommand.Command().execute("giveChef",par)
    }
    else {
      console.log("上菜");
      console.log(par);
      return par;
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
    this.type="chef";
  }
  async work(ds) {
    this.isWorking=true;
    document.getElementById("chef").getElementsByClassName("status")[0].innerText="做菜中";
    for(let d of ds){
      new Promise(res=>{
        setTimeout(()=>{
          res(d)
        },d.time)
      }).then(d=>{
        WorkCommand.Command().execute("serving",d);
      })
    }
  }
  static GetChef() {
    if (!this.C) {
      this.C = new Chef("Zoe", 30000)
    }
    return this.C;
  }
}

const CustomerState = {
  HaveSeat: 0,
  Order: 1,
  Eatting: 2,
  Paying: 3
}
class Customer {
  constructor(name) {
    this.name = name;
    this.menu = new Menu();
    this.state = CustomerState.HaveSeat;
  }
  async eating(dish) {
    dish.forEach(e => {
      console.log("顾客再吃" + e);
    });
    console.log("吃完了");
    this.isEatting = false;
  }
  //点菜
  async orderDishes() {
    let dishes = [];
    let status = document.getElementById(this.name).getElementsByClassName("status")[0];

    let is = new Set();
    console.log("正在点菜");
    status.innerHTML = "正在点菜";
    return new Promise(res => {
      setTimeout(() => {
        this.state = Customer.Order;
        let len = Dishes.length;
        let count = GetNumber(0, len - 1);
        console.log('count: ', count);
        for (let i = 0; i <= count; i++) {
          let index = GetNumber(0, len - 1);
          while (is.has(index) && is.size !== len) {
            index = GetNumber(0, len - 1);
          }
          is.add(index)
          let dish=Menu.Factory(Dishes[index]);
          dish.owner=this;
          dishes.push(dish);
        }
        console.log("点好了");
        status.innerHTML = "点好了";
        let frag = document.createDocumentFragment();

        dishes.forEach(d => {
          let li = document.createElement("li");
          li.innerText = d.name;
          frag.appendChild(li);
        })
        document.getElementById(this.name).getElementsByClassName("dishes")[0].appendChild(frag);

         res(dishes);
      }, 3000)
    })

  }
}

let waiter = Waiter.GetWaiter();
let chef = Chef.GetChef();

let restaurant = new Restaurant(10, 10000);

restaurant.hire(waiter);
restaurant.hire(chef);

let cus1 = new Customer("Lee");
restaurant.haveSeat(cus1);
let cus2 = new Customer("Li");
  restaurant.haveSeat(cus2);

(async ()=>{
  let dishes=await cus1.orderDishes();
  await WorkCommand.Command().execute("order",dishes);

  dish = cus2.orderDishes();
})();

