import React from 'react'
import '../assetss/css/Login.css';
import { Apiurl } from '../services/apisrest';
import axios from 'axios';

class CrearUsuario extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        form: {
            "nombre": "",
            "apellido": "",
            "dni": "",
            "cedula": "",
            "direccion": "",
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

    crearUsuario = () => {
        let url = Apiurl + "usuarios";
        axios.post(url, this.state.form)
            .then(response => {
                if (response.data.status === "ok") {
                    this.props.history.push("/dashboard");
                } else {
                    this.setState({ error: true, errorMsg: "response.data.result.error_msj" })
                }
            }).catch(error => {
                console.log(error);
                this.setState({ error: true, errorMsg: "Error" })
            })
    }

    salir = () => {
        this.props.history.push('/dashboard')
    }


    render() {
        return (
            <React.Fragment >
                <div className='container'>
                    <br /><br />
                    <h4>Crear Usuario</h4>
                    <br />
                    <form className='form-horizontal' onSubmit={this.manejadorSubmit}>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Nombre</label>
                            <input type="text2" className="form-control" name="nombre" placeholder="Ingresa tu nombre"
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Apellido</label>
                            <input type="text2" className="form-control" name="apellido" placeholder="Ingresa tu apellido"
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Dni</label>
                            <input type="text2" className="form-control" name="dni" placeholder="Ingresa tu dni"
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Cedula</label>
                            <input type="text2" className="form-control" name="cedula" placeholder="Ingresa tu cédula"
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Dirección</label>
                            <input type="text2" className="form-control" name="direccion" placeholder="Ingresa tu dirección"
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="row">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Salario</label>
                            <input type="text2" className="form-control" name="salario" placeholder="Ingresa tu salario"
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
                            <button type="submit" className="btn btn-primary" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.crearUsuario()}>Crear</button>
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

export default CrearUsuario;