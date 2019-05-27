class Cook extends Staff{
  constructor(name,salary){
    super(name,salary);
  }
  static GetIntance(name){
    if(!this._intance)
      this._intance=new Cook(name,3000);
    return this._intance;
  }
  async work(ds){
    appDom.setCookDishList(ds);
    while(true){
      let d=ds.shift();
      appDom.setCookDishList(ds);
      setDomText('cookStatus',"正在做"+d.name);
      setDomText('cookTime',"还剩"+d.time+"s");
      for(let i=0;i<d.time;i++){
        await wait(1);
        setDomText('cookTime',"还剩"+(d.time-i-1)+"s");
      }
      setDomText('cookStatus',"做好了"+d.name);
      this._handler.work(d);
      if(ds.length===0)
        break;
    }
    setDomText('cookStatus',"空闲");
    setDomText('cookTime',"");
  }
}