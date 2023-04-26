import React from 'react'
import { Apiurl } from '../services/apisrest';
import axios from 'axios';

class EditarUsuario extends React.Component {

    state = {
        form: {
            "id": "",
            "nombre": "",
            "apellido": "",
            "dni": "",
            "cedula": "",
            "direccion": "",
            "fechaCreacion": "",
            "salario": "",
            "cargo": ""
        },
        error: false,
        errorMsg: ""
    }

    manejadorSubmit = e => {
        e.preventDefault();
    }

    manejadorChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    componentDidMount() {
        let usuarioId = this.props.match.params.id;
        let url = Apiurl + "usuarios/" + usuarioId;
        axios.get(url)
            .then(response => {
                this.setState({
                    form: {
                        id: response.data.id,
                        nombre: response.data.nombre,
                        apellido: response.data.apellido,
                        dni: response.data.dni,
                        cedula: response.data.cedula,
                        direccion: response.data.direccion,
                        fechaCreacion: response.data.fechaCreacion,
                        salario: response.data.salario,
                        cargo: response.data.cargo?.nombre
                    }
                })
            });
    }

    borrar = () => {
        let usuarioId = this.props.match.params.id;
        let url = Apiurl + "usuarios/" + usuarioId;
        axios.delete(url)
            .then(response => {
                if (response.data.status === "ok") {
                    this.props.history.push("/dashboard");
                } else {
                    this.setState({ error: true, errorMsg: "Error" })
                }
            }).catch(error => {
                this.setState({ error: true, errorMsg: "Error" })
            })

    }

    actualizar = () => {
        let usuarioId = this.props.match.params.id;
        let url = Apiurl + "usuarios/" + usuarioId;
        axios.put(url, this.state.form)
            .then(response => {
                if (response.data.status === "ok") {
                    this.props.history.push("/dashboard");
                } else {
                    this.setState({ error: true, errorMsg: "Error" })
                }
            }).catch(error => {
                this.setState({ error: true, errorMsg: "Error" })
            })
    }

    salir = () => {
        this.props.history.push('/dashboard')
    }

    render() {
        const form = this.state.form
        return (
            <React.Fragment >
                <div className='container'>
                    <br /><br />
                    <h4>Editar Usuario</h4>
                    <br />
                    <form className='form-horizontal' onSubmit={this.manejadorSubmit}>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Id</label>
                            <input type="text2" className="form-control input-sm" name="id" placeholder="Id" disabled
                                value={form.id}
                                onChange={this.manejadorChange}
                            />
                        </div>

                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Fecha_creación</label>
                            <input type="text2" className="form-control" name="fechaCreacion" placeholder="Fecha creación" disabled
                                value={form.fechaCreacion}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Nombre</label>
                            <input type="text2" className="form-control" name="nombre" placeholder="Ingresa tu nombre"
                                value={form.nombre}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Apellido</label>
                            <input type="text2" className="form-control" name="apellido" placeholder="Ingresa tu apellido"
                                value={form.apellido}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Dni</label>
                            <input type="text2" className="form-control" name="dni" placeholder="Ingresa tu dni"
                                value={form.dni}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Cedula</label>
                            <input type="text2" className="form-control" name="cedula" placeholder="Ingresa tu cédula"
                                value={form.cedula}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Dirección</label>
                            <input type="text2" className="form-control" name="direccion" placeholder="Ingresa tu dirección"
                                value={form.direccion}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Salario</label>
                            <input type="text2" className="form-control" name="salario" placeholder="Ingresa tu salario"
                                value={form.salario}
                                onChange={this.manejadorChange}
                            />
                        </div>

                        <div className="col-md-5 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Cargo</label>
                            <select className="form-control" name="Select1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>

                        <br />

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.actualizar()}>Guardar</button>
                            <button type="submit" className="btn btn-danger" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.borrar()}>Eliminar</button>
                            <button type="submit" className="btn btn-secondary" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.salir()}>Salir</button>
                        </div>

                        {this.state.error === true &&
                            <div className="col-md-5 control-label">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errorMsg}
                                </div>
                            </div>
                        }
                    </form>
                </div >
            </React.Fragment >
        );
    }
}

export default EditarUsuario;