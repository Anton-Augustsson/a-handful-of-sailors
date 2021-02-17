
function createItem(name, info, stats){
  var newItem = `
        <div class="item">
            <div class="name"><p>${name}</p></div>
            <div class="info"><p>${info}</p></div>
            <div class="stats"><p>${stats}</p></div>
        </div>`;
  return newItem;
}

function setItem(idParent, name, info, stats){
  var itemElement = document.createElement('div');
  var itemBody = document.getElementById(idParent);
  var newItem = createItem(name, info, stats);
  itemElement.innerHTML= newItem;
  itemBody.append(itemElement);
}
