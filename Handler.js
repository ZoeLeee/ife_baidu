class Handler {
  constructor() {
    this.next = null;
  }
  setNext(h) {
    this.next = h;
  }
  handleRequest(m) {

  }
}

class CGBHandler extends Handler {
  handleRequest(money) {
    //处理权限最多10000
    if (money < 10000) {
      console.log('同意');
    } else {
      console.log('金额太大，只能处理一万以内的采购');
      if (this.next) {
        this.next.handleRequest(money);
      }
    }
  }
}
class ZJLHandler extends Handler {
  handleRequest(money) {
    //处理权限最多100000
    if (money < 100000) {
      console.log('10万以内的同意');
    } else {
      console.log('金额太大，只能处理十万以内的采购');
      if (this.next) {
        this.next.handleRequest(money);
      }
    }
  }
}
class DSZHandler extends Handler {
  handleRequest(money) {
    if (money >= 100000) {
      console.log('10万以上的我来处理');
      //处理其他逻辑
    }
  }
}  //处理权限至少100000

class Client{
  constructor(){
    this.CGB=new CGBHandler();
    this.ZJL=new ZJLHandler();
    this.DSZ=new DSZHandler();
    this.CGB.setNext(this.ZJL);
    this.ZJL.setNext(this.DSZ);
  }
}
let client=new Client();

client.CGB.handleRequest(100000)