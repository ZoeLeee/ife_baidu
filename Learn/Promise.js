function sleep(time, cb) {  
  if (cb) {
      setTimeout(cb, time);
  } else {
      return new Promise(resolve => {
          setTimeout(resolve, time);
      });
  }
};

let times=[100,150,200,250,1000];
console.time("01")
Promise.all(times.map(t=>sleep(t))).then(()=>{
  console.timeEnd("01")
});


times = [100, 150, 200, 250, 300];

async function test(){
  console.log('sleep start');
  console.time('es7 all in');
  console.log();
  // for await (let s of times.map(t => sleep(t))) {
  //   console.log();
  // }
  console.timeEnd('es7 all in');
  console.log('sleep complete');
}

(async ()=>{
  console.time("03");
  for(let t of times){
    console.time("04");
    await sleep(t);
    console.timeEnd("04");
  }
  console.timeEnd("03");
})();