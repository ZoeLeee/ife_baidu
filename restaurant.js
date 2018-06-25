class Restaurant {
  constructor(n) {
    this.staff = new Set();
    this.customers = new Set();
    this.seats = n;
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

class Customer {
  constructor(name) {
    this.name = name;
    this.menu = new Menu();
    this.isEatting = true;
  }
  eating(dish) {
    dish.forEach(e => {
      console.log("顾客再吃" + e);
    });
    console.log("吃完了");
    this.isEatting = false;
  }
  //点菜
  orderDishes(name) {
    return this.menu.chooseDishes(name);
  }
}

class Menu {
  constructor() {
    this.dishes = new Map([["fish", 30], ["carrot", 10]]);
  }
  chooseDishes(name) {
    let price = this.dishes.get(name)
    if (price) {
      return { name, price }
    }
  }
}

let waiter = Waiter.GetWaiter();
let chef = Chef.GetChef();

let restaurant = new Restaurant(1);
restaurant.hire(waiter);
restaurant.hire(chef);
let customer1 = new Customer("Lee");

restaurant.haveSeat(customer1);
console.log(restaurant.customers);

let dish = customer1.orderDishes("fish");
console.log('dish: ', dish);

let dishes = waiter.work([dish.name]);
console.log('dishes: ', dishes);

let doDishes = []
for (let d of dishes) {
  doDishes.push(chef.work(d));
}
console.log('doDishes: ', doDishes);

waiter.work(dishes[0]);

customer1.eating(doDishes);

if(!customer1.isEatting){
  restaurant.customers.delete(customer1);
}
console.log(restaurant.customers);
