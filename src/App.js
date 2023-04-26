import React from "react";
import "./assetss/css/App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import EditarUsuario from "./components/EditarUsuario";
import EditarCargo from "./components/EditarCargo";
import CrearUsuario from "./components/CrearUsuario";
import CrearCargo from "./components/CrearCargo";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/" exact render={props => (<Login{...props} />)}></Route>
          <Route path="/dashboard" exact render={props => (<Dashboard{...props} />)}></Route>
          <Route path="/editar_usuario/:id" exact render={props => (<EditarUsuario{...props} />)}></Route>
          <Route path="/crear_usuario" exact render={props => (<CrearUsuario{...props} />)}></Route>
          <Route path="/crear_cargo" exact render={props => (<CrearCargo{...props} />)}></Route>
          <Route path="/editar_cargo/:id" exact render={props => (<EditarCargo{...props} />)}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
