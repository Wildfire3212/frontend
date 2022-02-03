import React ,{Fragment, useEffect, useState} from 'react';
import { useParams, Link} from 'react-router-dom';
import clienteAxios from '../config/axios';

const Pedido = () => {
    const[pedido, guardarPedido] = useState([]);
    const {id} = useParams();

    useEffect( ()=>{
        async function consultarAPI(){
            const respuesta = await clienteAxios.get('/pedidos/'+id);
            guardarPedido(respuesta.data.pedido);
            };
            consultarAPI();
            console.log(pedido);
    },[id], [pedido]);
    return(
    <Fragment>
        {typeof pedido !== 'undefined' && typeof pedido.cliente !== 'undefined' ? <h1 className="my-5">Pedido {pedido.id} del {pedido.cliente.nombre} </h1> : <h1>Cargando Pedidos</h1>}
        <div className="container mt-5 py-5">
            <div className ="row">
                <div className="col-12 mb-5 d-flex justify-content-center">
                    <Link to={'/pedidos'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver a Pedidos</Link>
                </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                                        {typeof pedido !== 'undefined' ? 
                                        <div className="p-5 list-group-item list-group-item-action flex-column align-items-start ">
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
                                        </div> : <h2>Cargando...</h2>}
                        </div>
                    </div>
            </div>
        </div>
    </Fragment>
        );
}

export default Pedido;