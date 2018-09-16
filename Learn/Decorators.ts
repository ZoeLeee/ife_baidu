// 

function der(target) {
  target["_store"]=null;
  target["Store"]=()=>{
    if(!target["_store"]){
      target["_store"]=new target();
    }
    return target["_store"];
  }
}
// function classDecorator<T>(constructor:{new():T}) {

// }
class A{
  method(){
    console.log("123");
  }
}
class B{
  f1(){
    console.log("f1");
  }
}

