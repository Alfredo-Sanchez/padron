const form = document.getElementById("form");
const socioName = document.getElementById("name");
const socioNumber = document.getElementById("socio-number");
const socioStatus = document.getElementById("status");
const socioTable = document.getElementById("table");

const limpiarCampos = () => {
  socioName.innerHTML = `<b>Nombre:</b> Socio no encontrado`;
  socioNumber.innerHTML = `<b>Socio N.°:</b>`;
  socioStatus.innerHTML = `<b>Estado:</b>`;
  socioTable.innerHTML = `<b>Servicio:</b>`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let cedula = e.target.ci.value;
  let ci = cedula.replace(/\s+|\-|\./g, "");

  fetch(`http://www.cofudep.coop.py:3000/socio/${ci}`)
    // fetch(`http://localhost:3000/socio/${ci}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status == 404) {
        limpiarCampos();
        throw `No existe el socio con la cédula ${ci}`;
      }
    })
    .then((data) => {
      const socio = data;
      socioName.innerHTML = `<b>Nombre:</b> ${socio[0].socio_nombre}`;
      socioNumber.innerHTML = `<b>Socio N.°:</b> ${socio[0].socio_nro}`;
      socioStatus.innerHTML = `<b>Habilitado:</b> ${socio[0].socio_estado}`;
      socioTable.innerHTML = `<b>Servicio:</b> ${socio[0].socio_mesa}`;
    })
    .catch((e) => {
      return console.log(e);
    });
  e.target.ci.value = "";
});
