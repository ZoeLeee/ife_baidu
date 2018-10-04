let obj={name:'zoe'};
let age=15;
Object.defineProperty(obj,'age',{
  enumerable:false,
  configurable:false,
  get(){
    return age;
  },
  set(v){
    console.log("修改了age");
    age=v;
  }
})

class Vue{
  constructor(options={}){
    this.$el=document.querySelector(options.el);
    this.data=options.data;
    Object.keys(this.data).forEach(k=>{
      this.proxyData(k);
    })
    this.methods=options.methods; //时间方法
    this.watcherTask={}; //需要监听得任务列表
    this.observer(this.data); //初始化劫持监听
    // this.compile(this.$el); //解析Dom
  }
  proxyData(k){
    Object.defineProperty(this,k,{
      configurable:false,
      enumerable:true,
      get(){
        return this.data[k];
      },
      set(v){
        this.data[k]=v;
      }
    })
  }
  observer(data){
    for(let i in data){
      let v=data[i];
      this.watcherTask[i]=[];
      Object.defineProperty(data,i,{
        configurable:false,
        enumerable:true,
        get(){
          return v;
        },
        set(newV){
          if(newV!==v){
            v=newV;
            // this.watcherTask[i].forEach(task=>{
            //   // task.update();
            // })
          }
        }
      })

    }
  }
}