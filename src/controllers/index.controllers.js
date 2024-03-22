
const controller = {}
const path = require('path')

//database conexion
const pool = require('../database/databases')

controller.index = (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'))
}

controller.socios = async (req, res) => {
    try {
       const response =  await pool.query('SELECT * FROM public.asamblea2024');

       res.send(response)
        
    } catch (error) {
        console.log(error)
    }
}
controller.getSocio = async (req, res)=>{
  const id =   req.params.id;
  try {
      const response = await pool.query('SELECT * FROM public.asamblea2024 WHERE socio_ci = $1', [id])
      if(response.rows.length !== 0){
          res. send(response.rows)
      }else {
        // res.json({message: `No existe la cedula ${id} en este padrón. `})
        res.status(404).send({error: `Socio con cedula ${id} no encontrado`})
      } 
  } catch (error) {
      console.log(error)
  }

}
module.exports = controller;