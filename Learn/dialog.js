/*
* config参数
* title头部标签
* content body内容
* footer footer内容
* esc退出
*/

class Dialog{
    constructor(config){
      this._dialogContainer=document.createElement("div");
      this._dialogContainer.className="dialog";
      this._dialogContainer.tabIndex="-1";

      if(config.title){
        let diaHeader=document.createElement("div");
        diaHeader.className="dialog-header";
        diaHeader.innerHTML=config.title;
        this._dialogContainer.appendChild(diaHeader);
      }

      if(config.content){
        let diaBody=document.createElement("div");
        diaBody.className="dialog-body";
        diaBody.innerHTML=config.content;
        this._dialogContainer.appendChild(diaBody);
      }
   
      if(config.footer){
        let diaFooter=document.createElement("div");
        diaFooter.className="dialog-footer";
        diaFooter.innerHTML=config.footer;
        this._dialogContainer.appendChild(diaFooter);
      }

      document.body.appendChild(this._dialogContainer);
      this._dialogContainer.focus();
      document.getElementById('mask').style.display="block";

      this.registerEvent();
    }
    //摧毁dialog
    destroyed() {
      document.getElementById('mask').style.display="none";
      document.body.removeChild(this._dialogContainer);
    }
    //注册事件
    registerEvent(){
      this._dialogContainer.addEventListener("click",e=>{
        if(e.target.nodeName==="BUTTON"){
          this.destroyed();
        }
      })
      this._dialogContainer.addEventListener('keydown',e=>{
        if(e.keyCode===27){
          this.destroyed();
        }
      })
    }
}