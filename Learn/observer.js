class Event{
  constructor(){
    this.EventList=new Map();
  }
  listen(type,fn){
    let event=this.EventList.get(type);
    if(!event){
      this.EventList.set(type,new Set([fn]));
    }else
      event.add(fn);
  }
  trigger(type,par){
    let events=this.EventList.get(type);
    if(events && events.size>0){
      events.forEach(fn => {
        fn(par);
      });
    }

  }
  remove(key,fn){
    let events=this.EventList.get(key);
    if(events){
      if(!fn){
        this.EventList.delete(key)
      }else{
        if(events.has(fn))
          events.delete(fn)
      }
    }
  }
}

let event=new Event();
event.listen("某公众号",(data)=>{
  console.log(data+"的推送消息....");
})

event.trigger("某公众号","2016");

event.remove("某公众号")