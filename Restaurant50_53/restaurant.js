class Restaurant {
  constructor(n, k, property) {
    this.cusId = 0;
    this.staff = new Set();
    this.customers = new Set();

    this.waiter = Waiter.GetWaiter();
    this.chef = Chef.GetChef();

    this.seats = n;
    this.queues = [];
    this.maxQueue = k;
    this.property = property;

    document.getElementById("property").textContent = "$" + property;
    this.seatsHTML = document.getElementById("seats");
    this.queuesHTML = document.getElementById("queues");
  }
  Init() {

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
  haveSeat(pos, st, id) {
    let li = document.createElement("li");
    li.style.border = "1px solid #000";
    li.style.margin = "0px;";
    li.id = id
    let img = new Image();
    img.src = "img/customer.png";
    li.appendChild(img);
    let status = document.createElement("span");
    status.className = "status";
    status.textContent = st;

    li.appendChild(status);
    pos.appendChild(li);

    if (pos === this.seatsHTML) {
      let dishes = document.createElement("ul");
      dishes.className = "dishes";
      li.appendChild(dishes);
    }
  }
  async Welcome(n, m) {
    let timer = setInterval(async () => {
      let counts = this.customers.size;
      for (let i = 0; i < m; i++) {
        let cu = new Customer();
        cu.id = "cus" + (this.cusId++);
        if (this.customers.size < this.seats) {
          this.customers.add(cu);
          this.haveSeat(this.seatsHTML, "入座", cu.id);
          cu.status = 0;
        }
        else if (this.queues.length < this.maxQueue) {
          this.queues.push(cu);
          this.haveSeat(this.queuesHTML, "排队", "q" + (this.cusId - 1));
        }
        else {
          clearInterval(timer);
          console.log("不排队了");
          return;
        }
      }


    }, n * 1000)
  }
  async Start() {
    let timer = setInterval(async () => {
      for (let cu of this.customers) {
        if (cu.status < 1) {
          await cu.orderDishes()
        }
      }
      if (this.customers.size > 0) {
        let exit = false;
        for (let cu of this.customers) {
          if (cu.status < 1) {
            exit = true;
            break;
          }
        }
        if (!exit)
          clearInterval(timer);
      }
    }, 3000)
    this.Welcome(3, 1);
  }
}

let restaurant = new Restaurant(3, 3, 10000);
restaurant.Start();