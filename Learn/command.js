class Command{
  execute(){

  }
}
class CloseDoorCommand extends Command{
  execute(){
    console.log("closedoor")
  }
}
class OpenPCCommand extends Command{
  execute(){
    console.log("open PC");
  }
}
class OpenQQCommand extends Command{
  execute(){
    console.log("login qq");
  }
}

class MacroCommand{
  constructor(){
    this.commandList=[];
    this.cmdList=new Map();
  }
  add(command){
    this.commandList.push(command);
  }
  execute(){
    this.commandList.forEach(c=>c.execute());
  }
  registerCommand(name,command){
    this.cmdList.set(name,command);
  }
  executeCommand(cmd){
    this.cmdList.get(cmd)();
  }
}

let macroCommand=new MacroCommand();
macroCommand.add(new CloseDoorCommand());
macroCommand.add(new OpenPCCommand());
macroCommand.add(new OpenQQCommand());

// macroCommand.execute();

