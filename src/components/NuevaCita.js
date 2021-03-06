import React, {Fragment, useState, useEffect,} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import clienteAxios from '../config/axios';
import qs from 'qs';

const NuevaCita = (props) => {
    let history = useNavigate();
	const [clientes, guardarClientes] = useState([]);
    useEffect(()=>{
        const consultarAPI = () => {
            clienteAxios.get('/cliente')
              .then(respuesta =>{
                guardarClientes(respuesta.data.clientes);
              })
              .catch(error => {
                console.log(error)
              });
            }
            consultarAPI();
    },[]);
    //Generar state como objeto
    const [cita, guardarCita] = useState({
        kg: '',
        id_remitente_fk: 0,
        nombre_destinatario: '',
        direccion_destinatario: '',
        comentarios: ''
    });

    //Lea los datos del Formulario

    const actualizarState = (e) =>{
        guardarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Enviar Peticion al API

		const crearNuevaCita = e => {
        e.preventDefault();
		let params = new URLSearchParams()
		const pedidos = JSON.stringify(cita);
		params.append("json" , pedidos);
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
        clienteAxios.post('/pedidos', params, config)
            .then(respuesta =>{
                props.guardarConsultar(true);
				console.log(respuesta);
            })
        // Redireccionar
        history('/');
    }
    
    return(
        <Fragment>
            <h1 className="my-5">Crear Nueva Cita</h1>
            <div className="container mt-5 py-5">
                <div className ="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <form 
                            onSubmit={crearNuevaCita}
                            className="bg-white p-5 bordered">
                            <div className="form-group">
                                <label htmlFor="nombre">Kg del paquete</label>
                                <input 
                                    type="number" 
                                    className="form-control form-control-lg" 
                                    id="kg" 
                                    name="kg" 
                                    placeholder="Kg del paquete"
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="propietario">Destinatario</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="nombre_destinatario" 
                                    name="nombre_destinatario" 
                                    placeholder="Destinatario"
                                    onChange={actualizarState} 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="propietario">Direccion de Destinatario</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="direccion_destinatario" 
                                    name="direccion_destinatario" 
                                    placeholder="Direccion"
                                    onChange={actualizarState} 
                                />
                            </div>

                            <div className="form-group">
                                <select className="form-select" id="id_remitente_fk" name="id_remitente_fk" onChange={e => {actualizarState(e)}} aria-label="Default select example">
                                    {clientes.map(cliente =>(
                                        <option 
                                        value={cliente.id}
                                        key ={cliente.id}
                                        type= "cliente"
                                        className="form-control"
                                        >{cliente.nombre} : {cliente.email} </option>
                                   ))};
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="sintomas">Comentarios</label>
                                <textarea 
                                    className="form-control" 
                                    name="comentarios" 
                                    rows="6"
                                    onChange={actualizarState}
                                ></textarea>
                            </div>
                            <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Crear Cita"  />
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default NuevaCita;