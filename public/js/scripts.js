const form = document.getElementById('form')
const socioName = document.getElementById('name')
const socioNumber = document.getElementById('socio-number')
const socioAddress = document.getElementById('address')
const socioSectional = document.getElementById('sectional')
const pollingPlace = document.getElementById('polling-place')

const limpiarCampos = () => {
    socioName.innerHTML = `<b>Nombre:</b> Socio no encontrado`;
    socioNumber.innerHTML = `<b>C.I N.°:</b>`;
    socioAddress.innerHTML = `<b>Dirección:</b>`;
    socioSectional.innerHTML = `<b>Seccional:</b>`;
    pollingPlace.innerHTML = `<b>Lugar de votación:</b>`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let cedula = e.target.ci.value;
    let ci = cedula.replace(/\s+|\-|\./g, '')

    fetch(`http://localhost:3000/socio/${ci}`)
        // .then(res => res.ok ? res.json() : limpiarCampos() )
        .then(res => {
            if (res.ok) {
                return res.json()
            } else if (res.status == 404) {
                limpiarCampos();
                throw `No existe el socio con la cédula ${ci}`
            }
        })
        .then(data => {
            const socio = data
            socioName.innerHTML = `<b>Nombre:</b> ${socio[0].pad_nom}`;
            socioNumber.innerHTML = `<b>C.I N.°:</b> ${socio[0].pad_ci}`;
            socioAddress.innerHTML = `<b>Dirección:</b> ${socio[0].pad_dir}`;
            socioSectional.innerHTML = `<b>Seccional:</b> ${socio[0].pad_sec}`;
            pollingPlace.innerHTML = `<b>Lugar de votación:</b> ${socio[0].pad_lug}`;
        })
        .catch(e => {
            return console.log(e)
        })
    e.target.ci.value = ""
})