class CarMarker{
  drive(){
    console.log("have"+this.doors);
  }
  static Factory(type){
    if(CarMarker[type]){
      return new CarMarker[type]();
    }else 
    return new CarMarker();
  }
}
CarMarker.Compact=class Compact extends CarMarker{
  constructor(){
    super();
    this.doors=4;
  }
}
CarMarker.Suv=class Suv extends CarMarker{
  constructor(){
    super();
    this.doors=8;
  }
}


let suv=CarMarker.Factory("Suv");

console.log(suv);
suv.drive();

