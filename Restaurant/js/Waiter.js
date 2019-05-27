class Waiter extends Staff{
  constructor(name,salary){
    super(name,salary);
    this._customer=null;
  }
  static GetIntance(name){
    if(!this._intance)
      this._intance=new Waiter(name,3000);
    return this._intance;
  }
  setRecieveCustomer(c){
    this._customer=c;
  }
  async work(w){
    if(Array.isArray(w)){
      await wait(0.5*TIME);
      setDomText("waiterPos","在厨师那边");
      await this._handler.work(w);
    }
    else
    {
      await wait(0.5*TIME);
      setDomText("waiterPos","在顾客那边");
      if(!this._customer.readyEat(w)){
        await wait(0.5*TIME);
        setDomText("waiterPos","在厨师那边");
      }
    }
  }
}