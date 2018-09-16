function GetNumber(n1, n2) {
  return Math.round(Math.random() * (n2 - n1)) + n1;
}
function ShowDishes(id,dishes,isShow=false) {
  let frag = document.createDocumentFragment();

  dishes.forEach(d => {
    let li = document.createElement("li");
    li.className=d.name
    li.innerText = d.name;
    if(isShow){
      let span=document.createElement("span");
      span.className=d.name+"Status";
      span.innerText="还没做"
      li.appendChild(span);
    }
    frag.appendChild(li);
  })

  document.getElementById(id).getElementsByClassName("dishes")[0].appendChild(frag);
}

function delay(s) {
  return new Promise(res=> {
      setTimeout(res, s);
  })
}