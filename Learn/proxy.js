
const createArray=()=>{
  return new Proxy([],{
    set(target,key,value,reciver){
      console.log(reciver,value);
      return Reflect.set(target,key,value,reciver);
    }
  })
}

let obj={
  a:1,
  b:"2",
  c:createArray(),
  d:{
    e:1
  }
}

let proxy=new Proxy(obj,{
  get(target,key,reciver){
    console.log(123);
    if(key==='target')
      return target;
    return Reflect.get(target,key,reciver);
  },
  set(target,key,value,reciver){
    console.log('set');
    if(!target.hasOwnProperty(key)){
      console.warn("不存在");
      return true;
    }
    return Reflect.set(target,key,value,reciver);
  }
})

proxy.c.push(1)
console.log(proxy.c);
// console.log(proxy.a);
// proxy.a=2;
// console.log(proxy.a);
// console.log(obj.a);
// proxy.q="haha";
// console.log(proxy.q);
// console.log('proxy.c: ', proxy.c);
// proxy.c.push(1);
// console.log('proxy.c: ', proxy.c);
 let arr=new Proxy([1,2,3,4],{
   get(target,key){
      return Reflect.get(target,key);
   },
   set(target,key,value){
     console.log('value: ', value);
    target[key]=value;
    return true;
   }
 })
// arr.push(5);
// arr[arr.length]=5;
// arr.push(6);

// arr.push(1,2,3);
// console.log(arr);

Object.defineProperty(obj,'ab',{
  // get(){
  //   console.log('get');
  //   return this.b
  // },
  set(v){
    console.log('set');
    this.a=v;
  },
  configurable : true
})

obj.ab=2
console.log(proxy.target.a);