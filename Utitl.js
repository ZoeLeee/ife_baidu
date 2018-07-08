function GetNumber(n1, n2) {
  return Math.round(Math.random() * (n2 - n1)) + n1;
}
function ShowDishes(name,dishes) {
  let frag = document.createDocumentFragment();

  dishes.forEach(d => {
    let li = document.createElement("li");
    li.innerText = d.name;
    frag.appendChild(li);
  })
  document.getElementById(name).getElementsByClassName("dishes")[0].appendChild(frag);
}