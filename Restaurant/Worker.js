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
    this.ServerCus=null;
  }
  async work(par) {
    this.isWorking = true;
    
    if (Array.isArray(par)) {
      this.waiterHtml.getElementsByClassName("status")[0].innerText = "点菜中";
      //给厨师做
      return new Promise(res => {
        setTimeout(() => {
          this.waiterHtml.getElementsByClassName("pos")[0].innerText = "在厨师那";
          res();
        }, 500);
      })
    }
    else {
      new Promise(res => {
        setTimeout(() => {
          this.waiterHtml.getElementsByClassName("pos")[0].innerText = "在顾客那";
          res(par)
        }, 500);
      }).then(par=>{
        this.ServerCus.eating(par);
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
    let times = document.getElementById("chef").getElementsByClassName("time")[0];

    for (let d of ds) {
      chefStatus.innerText = "正在做" + d.name;
      times.innerText = "还需要" + d.time + "秒做完";

      let dishStatus = document.getElementsByClassName(d.name+"Status")[0];
      dishStatus.innerText = "正在做"
      await delay(d.time * 1000);
      dishStatus.innerText = "做好了";
      dishes.removeChild(dishes.firstElementChild);
      WorkCommand.Command().execute("serving", d);
      document.getElementById("waiter").getElementsByClassName("pos")[0].innerText = "在厨师那";

    }
    chefStatus.innerText = "空闲";
    times.innerText = "";
    this.isWorking = false;
  }
  static GetChef() {
    if (!this.C) {
      this.C = new Chef("Zoe", 30000)
    }
    return this.C;
  }
}