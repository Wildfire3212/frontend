import React ,{Fragment, useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Cita = (props) => {
    const[cliente, guardarCliente] = useState([]);
    const {id} = useParams();
    let navigate = useNavigate();

    useEffect( ()=>{
        async function consultarAPI(){
            const respuesta = await clienteAxios.get('/cliente/'+id);
            guardarCliente(respuesta.data.cliente);
            };
            consultarAPI();
    },[id], [cliente]);

    // //Elimina un registro
    // const eliminarCita = id =>{
    //           Swal.fire({
    //             title: 'Estás Seguro?',
    //             text: "Una cita eliminada no se puede recuperar!",
    //             icon: 'warning',
    //             showCancelButton: true,
    //             confirmButtonColor: '#3085d6',
    //             cancelButtonColor: '#d33',
    //             confirmButtonText: 'Si eliminar',
    //             cancelButtonText: 'Cancelar'
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               Swal.fire(
    //                 //alerta de eliminado
    //                 'Borrado!',
    //                 'Se ha borrado la cita',
    //                 'success'
    //               )
    //             clienteAxios.delete('/pacientes/'+id)
    //             .then(respuesta =>{
    //                 props.guardarConsultar(false);
    //                 navigate('/')
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //             });
    //             }
    //           })
    // }


    return(
        <Fragment>
            <h1>Nombre de Cliente: {cliente.nombre}</h1>
            <div className="container mt-5 py-5">
                <div className ="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                                <div className="d-flex w-100 justify-content-between">
                                    {typeof cliente !== 'undefined' && typeof cliente.pedidos !== 'undefined' ? cliente.pedidos.length > 0 ? cliente.pedidos.map(pedido => (
                                        <Link to={`/pedidos/${pedido.id}`} className="p-5 list-group-item list-group-item-action flex-column align-items-start ">
                                            <div className="d-flex w-100 justify-content-between">
                                                <h3 className="mb-3">{pedido.kg} Kg</h3>
                                            </div>
                                            <p className="mb-0">
                                                Nombre Destinatario: {pedido.nombre_destinatario}
                                            </p>
                                            <div className="contacto py-3">
                                                <p>Direccion destinatario: {pedido.direccion_destinatario}</p>
                                                {pedido.comentarios !== null ? <p>comentarios: {pedido.direccion_destinatario}</p> : <p>Sin comentarios</p>}
                                            </div>
                                        </Link> )) : <h2>No tiene pedidos</h2> : <h2>Cargando...</h2>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Cita;