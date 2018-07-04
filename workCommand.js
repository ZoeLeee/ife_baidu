class WorkCommand{
  constructor(){
    this.cmdList=new Map();
  }
  register(name,cmd){
    this.cmdList.set(name,cmd);
  }
  async execute(name,...par){
    let cmd=this.cmdList.get(name);
    if(cmd){
      cmd.execute(...par);
    }
    else{
      console.log("命令错误");
    }
  }

  static Command(){
    if(!this._command){
      this._command=new WorkCommand();
    }
    return this._command;
  }

}

class Command{
  constructor(){
  }
  execute(){
    
  }
}

class OrderCommand extends Command{
  execute(...par){
    console.log("点菜");
    for(let waiter of restaurant.waiters){
      if(!waiter.isWorking){
        waiter.work(...par);
        break;
      }
    }
  }
}
class GiveChefCommand extends Command{
  execute(...par){
    console.log("给厨师");
    for(let chef of restaurant.chefs){
      if(!chef.isWorking){
        chef.work(...par);
        break;
      }
    }
  }
}
class ServingCommand extends Command{
  execute(...par){
    console.log("上菜");
    for(let waiter of restaurant.waiters){
      if(waiter.isWorking){
        waiter.work(...par);
        break;
      }
    }
  }
}

WorkCommand.Command().register("order",new OrderCommand());
WorkCommand.Command().register("giveChef",new GiveChefCommand());
WorkCommand.Command().register("serving",new ServingCommand());
