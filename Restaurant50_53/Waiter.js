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
