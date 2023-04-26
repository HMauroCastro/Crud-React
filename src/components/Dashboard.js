import React from 'react';
import { Apiurl } from '../services/apisrest';
import axios from 'axios';

class Dashboard extends React.Component {

    state = {
        usuarios: [],
        cargos: []
    }

    clickUsuario(id) {
        this.props.history.push('/editar_usuario/' + id)
    }

    clickCargo(id) {
        this.props.history.push('/editar_cargo/' + id)
    }

    componentDidMount() {
        let url = Apiurl + "usuarios"
        axios.get(url)
            .then(response => {
                this.setState({
                    usuarios: response.data
                })
            });

        let url2 = Apiurl + "cargos"
        axios.get(url2)
            .then(response => {
                this.setState({
                    cargos: response.data
                })
            })
    }

    crearUsuario = () => {
        this.props.history.push('/crear_usuario')
    }

    crearCargo = () => {
        this.props.history.push('/crear_cargo')
    }

    render() {
        return (
            <React.Fragment>

                <div className='container'>
                    <br /><br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.crearUsuario()}>Crear usuario</button>
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.crearCargo()}>Crear Cargo</button>
                    </div>
                    <br />
                    <h4>Usuarios</h4>
                    <table className="table table-responsive table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Dni</th>
                                <th scope="col">Cédula</th>
                                <th scope="col">Dirección</th>
                                <th scope="col">Salario</th>
                                <th scope="col">Cargo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.usuarios.map((value, index) => {
                                    return (
                                        <tr key={index} onClick={() => this.clickUsuario(value.id)}>
                                            <td>{value.id}</td>
                                            <td>{value.nombre}</td>
                                            <td>{value.apellido}</td>
                                            <td>{value.dni}</td>
                                            <td>{value.cedula}</td>
                                            <td>{value.direccion}</td>
                                            <td>{value.salario}</td>
                                            <td>{value.cargo.nombre}</td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>

                <div className='container'>
                    <br /><br />
                    <h4>Cargos</h4>
                    <table className="table table-responsive table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cargos.map((value, index) => {
                                    return (
                                        <tr key={index} onClick={() => this.clickCargo(value.id)}>
                                            <td>{value.id}</td>
                                            <td>{value.nombre}</td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;