
class AppDom{
  constructor(){
    this.priceEl=document.getElementById('price');
    this.cookStatusEl=document.getElementById('cookStatus');
    this.cookTimeEl=document.getElementById('cookTime');
    this.cookDishesEl=document.getElementById('dishLish');
  }
  setPrice(num){
    this.priceEl.textContent=num;
  }
  setCookStatus(txt){
    this.cookStatusEl.innerText=txt;
  }
  setCookTime(t){
    this.cookTimeEl.textContent=t;
  }
  setCookDishList(list){
    let frag=document.createDocumentFragment();
    for(let d of list){
      let li=document.createElement('li');
      li.textContent=d.name;
      frag.append(li);
    }
    this.cookDishesEl.innerHTML="";
    this.cookDishesEl.append(frag);
  }
}

const appDom=new AppDom();

function setDomText(id,txt){
  document.getElementById(id).innerText=txt;
}

function setDomList(id, list){
  let frag=document.createDocumentFragment();
    for(let l of list){
      let li=document.createElement('li');
      li.textContent=l.name;
      frag.append(li);
    }
    let el=document.getElementById(id);
   el.innerHTML="";
   el.append(frag);
}

function setDishesStatus(id, dishesLish,time){
  let frag=document.createDocumentFragment();
    for(let l of dishesLish){
      let li=document.createElement('li');
      li.textContent=l.name;
      let span=document.createElement('span');
      if(l.status===0){
        span.innerText="还未上";
      }
      else if(l.status===1){
        span.innerText="正在吃,还剩"+time+"s吃完";
      }
      else{
        span.innerText="已经吃完";
      }
      li.append(span);
      frag.append(li);
    }
    let el=document.getElementById(id);
   el.innerHTML="";
   el.append(frag);
}