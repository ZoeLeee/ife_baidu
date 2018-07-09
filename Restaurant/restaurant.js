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
  async Start(){
    for(let cus of this.customers){
      let dishes = await cus.orderDishes();
      //叫服务员
      let waiter=await WorkCommand.Command().execute("order", dishes);
      waiter.ServerCus=cus;
      await waiter.work(dishes);
      await chef.work(dishes);
      await cus.eating();
      console.log("下一位");
    }
  }
}

let waiter = Waiter.GetWaiter();
let chef = Chef.GetChef();

let restaurant = new Restaurant(10, 10000);

restaurant.hire(waiter);
restaurant.hire(chef);

let cus1 = new Customer("Lee");
restaurant.haveSeat(cus1);

restaurant.Start();