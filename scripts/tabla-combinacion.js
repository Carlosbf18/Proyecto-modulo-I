let tablaEstilos = null;

function cargarJson (callback, url) {
  const xhr=new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      tablaEstilos = JSON.parse(xhr.responseText);
      callback();
    }
    else {
      console.error("Error");
    }
  }
  xhr.send();
}

function generarTabla(lang) {
  if(!xmlMenu) return;

  const contenido = document.getElementById("tabla-contenido");
  contenido.innerHTML = "";


  tablaEstilos.forEach(item => {
    contenido.innerHTML += `
      <tr>
        <th scope="row">${item.id}</th>
        <td>${item.temporada}</td>
        <td>${item.estilo}</td>
        <td>${item.superior}</td>
        <td>${item.inferior}</td>
        <td>${item.zapatos}</td>
        <td>
          <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#myModal" id="bmodificar">Modificar</button>
          <button class="btn btn-danger" id="belimina">Eliminar</button>
        </td>
      </tr>
    `


  });
}



cargarJson(()=>{generarTabla('es');}, '../data/estilos-table.json');

