class Restaurant {
  constructor(n, property) {
    this.staff = new Set();
    this.waiters = new Set();
    this.chefs = new Set();
    this.customers = new Set();
    this.seats = n;
    this.property = property;
    document.getElementById("property").textContent = "$" + property;
    this.seatsHTML = document.getElementById("seats")
  }
  hire(w) {
    this.staff.add(w);
    if (w.type === "waiter") {
      this.waiters.add(w)
    } else {
      this.chefs.add(w);
    }
  }
  fire(w) {
    this.staff.delete(w);
    if (w.type === "waiter") {
      this.waiters.delete(w)
    } else {
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
    this.isWorking = false;
  }
  work() {

  }
}
class Waiter extends Worker {
  constructor(name, salary) {
    super(name, salary);
    this.type = "waiter";
    this.waiterHtml = document.getElementById("waiter");
  }
  async work(par) {
    this.isWorking = true;
    console.log(typeof par);
    if (Array.isArray(par)) {
      this.waiterHtml.getElementsByClassName("status")[0].innerText = "点菜中";
      //给厨师做
      return new Promise(res => {
        setTimeout(() => {
          this.waiterHtml.getElementsByClassName("pos")[0].innerText = "在厨师那";
          WorkCommand.Command().execute("giveChef", par)
          res();
        }, 500);
      })
    }
    else {
      return new Promise(res => {
        setTimeout(() => {
          console.log("上菜");
          this.waiterHtml.getElementsByClassName("pos")[0].innerText = "在顾客那";
          res(par)
        }, 500);
      })

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
    this.type = "chef";
  }
  async work(ds) {
    this.isWorking = true;

    ShowDishes("chef", ds);
    let chefStatus = document.getElementById("chef").getElementsByClassName("status")[0];
    let dishes = document.getElementById("chef").getElementsByClassName("dishes")[0];
    let times= document.getElementById("chef").getElementsByClassName("time")[0];
    for (let d of ds) {
      chefStatus.innerText = "正在做" + d.name;
      times.innerText="还需要"+d.time+"秒做完";
      await (() => {
        return new Promise(res => {
          setTimeout(()=>{
            res();
          }, d.time * 1000)
        })
      })();
      dishes.removeChild(dishes.firstElementChild);
      WorkCommand.Command().execute("serving", d);
      document.getElementById("waiter").getElementsByClassName("pos")[0].innerText = "在厨师那";
    }
    chefStatus.innerText = "空闲";
    times.innerText="";
    this.isWorking=false;
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
          let dish = Menu.Factory(Dishes[index]);
          dish.owner = this;
          dishes.push(dish);
        }
        console.log("点好了");
        status.innerHTML = "点好了";
        ShowDishes(this.name, dishes)

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

(async () => {
  let dishes = await cus1.orderDishes();
  await WorkCommand.Command().execute("order", dishes);

  // dish = cus2.orderDishes();
})();

