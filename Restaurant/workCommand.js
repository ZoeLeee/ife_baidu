class WorkCommand{
  constructor(){
    this.cmdList=new Map();
  }
  register(name,cmd){
    this.cmdList.set(name,cmd);
  }
  execute(name,...par){
    let cmd=this.cmdList.get(name);
    if(cmd){
      return cmd.execute(...par);
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
    for(let waiter of restaurant.waiters){
      if(!waiter.isWorking){
       return waiter;
      }
    }
  }
}
class GiveChefCommand extends Command{
  async execute(...par){
    for(let chef of restaurant.chefs){
      if(!chef.isWorking){
        await chef.work(...par);
        break;
      }
    }
  }
}
class ServingCommand extends Command{
  execute(...par){
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
