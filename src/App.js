import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import clienteAxios from './config/axios';

//Componentes

import Pacientes from './components/Pacientes';
import NuevaCita from './components/NuevaCita';
import Cita from './components/Cita';
import Pedido from './components/Pedido';
import Pedidos from './components/Pedidos';

function App() {

  const[citas, guardarCitas] = useState([]);
  const [consultar, guardarConsultar] = useState(true);
  console.log()

  useEffect( ()=>{
      const consultarAPI = () => {
        clienteAxios.get('/cliente')
          .then(respuesta =>{
            guardarCitas(respuesta.data.clientes);
            //deshabilitar la consulta
            guardarConsultar(false);
          })
          .catch(error => {
            console.log(error)
          });
      }
      consultarAPI();
  }, [consultar], [])

    return ( 
      <Router>
        <Routes>
          <Route
            exact path="/"
            element= {<Pacientes citas = {citas}/>}
          />
          <Route
            exact path="/nueva"
            element={<NuevaCita guardarConsultar = {guardarConsultar} />}
          />
          <Route
            exact path="/cita/:id"
            element={<Cita guardarConsultar = {guardarConsultar}/>}
          />
          <Route
            exact path="/pedidos"
            element={<Pedidos />}
          />
          <Route
            exact path="/pedidos/:id"
            element={<Pedido />}
          />
        </Routes>
      </Router>
    );
}

export default App;
