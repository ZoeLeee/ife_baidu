class Customer {
  constructor(name) {
    this.name=name;
    this.eatList = [];
    this.dishList =undefined;
    this.time = null;
    this.eated = [];
    this.hadUpCount = 0;
  }
  async orderDishes(dishes) {
    setDomText("waiterPos", "在顾客那");
    setDomText('cusStatus',"点菜中");
    let ds = await dishes.order();
    this.dishList = ds;
    return ds.slice();
  }
  readyEat(dish) {
    this.eatList.push(dish);
    this.hadUpCount++;
    if (this.hadUpCount === this.dishList.length) {
      return true;
    }
    return false;
  }
  async startEat() {
    let isEating = false;
    return new Promise(res => {
      let timeId = setInterval(async () => {
        if (this.eatList.length > 0 && !isEating) {
          let d = this.eatList.shift();
          d.status=1;
          setDishesStatus('cusDishes',this.dishList,3);
          isEating = true;
          for(let i=1;i<=3;i++){
            await wait(1 * TIME);
            setDishesStatus('cusDishes',this.dishList,3-i);
          }
          this.eated.push(d);
          d.status=2;
          setDishesStatus('cusDishes',this.dishList);
          isEating = false;
          if (this.eated.length === this.dishList.length) {
            clearInterval(timeId);
            res();
          }
        }
      }, 1000)
    }).then(() => {
      setDishesStatus('cusDishes',[]);
      console.log("付钱");
    })
  }
}