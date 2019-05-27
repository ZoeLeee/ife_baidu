class Staff{
  constructor(name,salary){
    this._id=undefined;
    this._name=name;
    this._salary=salary;
    this._handler=null;
  }
  work(){

  }
  setHandler(h){
    this._handler=h;
  }
}