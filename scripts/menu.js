let xmlMenu = null;
let xmlLanguage = null;
let subMenu = null;

function cargaXML(callback, url, doc) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (xhr.status===200) {
      const parser = new DOMParser();
      if (doc == 'menu') {
        console.log('---menu-----');
        xmlMenu = parser.parseFromString(xhr.responseText, "application/xml");
      }
      if (doc == 'languaje') {
        console.log('----languaje----');
        xmlLanguage = parser.parseFromString(xhr.responseText, "application/xml");
      }
      callback();
    } else {
      console.error("No puedo cargar");
    }
  }
  xhr.send();
}

function cargarJson (url) {
  const xhr=new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      subMenu = JSON.parse(xhr.responseText);
    }
    else {
      console.error("Error");
    }
  }
  xhr.send();
}

function getLanguaje(idNombre, lang) {
  if(!xmlLanguage) return;
  const items = xmlLanguage.getElementsByTagName("item");
  let translateText = ''

  Array.from(items).forEach(item => {
    const id = item.getAttribute("id");
    if (id == idNombre) {
      translateText = item.getElementsByTagName(lang)[0].textContent;
    }
  });

  return translateText;
}

function generarMenu(lang) {
  if(!xmlMenu) return;

  const items = xmlMenu.getElementsByTagName("item");
  const menu = document.getElementById("main-menu");
  menu.innerHTML = "";

  Array.from(items).forEach(item => {
    const tipo = item.getAttribute("type");
    const idNombre = item.getElementsByTagName('id')[0].textContent;
    const link = item.getElementsByTagName('link')[0].textContent;
    const nameTranslation = getLanguaje(idNombre, lang);
    const subMenuItems = subMenu[idNombre];
    const subMenuHtml = generarSubMenu(subMenuItems, lang);
    if (tipo === 'option') {
      menu.innerHTML += `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown" data-bs-toggle="dropdown" aria-expanded="false" href="${link}">${nameTranslation}</a>
        ${subMenuHtml}
      </li>`;
    }


  });
}

function generarSubMenu (subMenuItems, lan) {

  if( !subMenuItems || subMenuItems?.length == 0 ) return '';
  let subMenuHtml = `<ul class="dropdown-menu">`;

  subMenuItems.forEach(item => {
    console.log(item);

    subMenuHtml += `<li><a class="dropdown-item" href="#">${item.texto[lan]}</a></li>`;
  });

  subMenuHtml += `</ul>`;

  return subMenuHtml;

}

cargaXML(()=>{}, "../data/internacionalizacion.xml", 'languaje');
cargaXML(()=>{generarMenu('es');}, "../data/menuPrincipal.xml", 'menu');
cargarJson('../data/subMenus.json');

document.getElementById('idioma').addEventListener('change', (event)=>{
  generarMenu(event.target.value);
});
