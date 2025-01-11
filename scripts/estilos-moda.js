let jsonEstilos = null;

function cargarJson (callback, url) {
  const xhr=new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      jsonEstilos = JSON.parse(xhr.responseText);
      callback();
    }
    else {
      console.error("Error");
    }
  }
  xhr.send();
}

function generarMenu(lang) {
  if(!xmlMenu) return;

  const contenido = document.getElementById("contenido");
  contenido.innerHTML = "";


  jsonEstilos.forEach(item => {
    const cards = generarCards(item.contenido);
    contenido.innerHTML += `
      <h1>${item.titulo}</h1>
      <div class="d-flex">
        ${cards}
      </div>
    `


  });
}

function generarCards(cards){
  console.log('&&&', cards);

  let cardItems = '';
  cards.forEach(card=> {
    cardItems += `
      <div class="card mr-3" style="width: 15rem; height: 18rem;">
        <img src="${card}" class="card-moda card-img-top" alt="...">
      </div>
    `
  })
  return cardItems;
}

cargarJson(()=>{generarMenu('es');}, '../data/jsonEstilos.json');

