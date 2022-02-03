import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

const Pacientes = ({citas}) => {
    if (citas.length === 0) {
        return null;
    }
    console.log(citas);
    return(
    <Fragment>
        <h1 className="my-5">Administrador de Pacientes</h1>

        <div className="container mt-5 py-5">
            <div className ="row">
                <div className="col-12 mb-5 d-flex justify-content-center">
                    <Link to={'/nueva'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Crear Pedido</Link>
                </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            {citas.map(cita => (
                                <Link to={`/cita/${cita.id}`} className="p-5 list-group-item list-group-item-action flex-column align-items-start ">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h3 className="mb-3">{cita.nombre}</h3>
                                    </div>
                                    <p className="mb-0">
                                        Email: {cita.email}
                                    </p>
                                    <div className="contacto py-3">
                                        <p>Celular: {cita.cel}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
            </div>
        </div>
    </Fragment>
        );
}

export default Pacientes;