import React from 'react'
import '../assetss/css/Login.css';
import { Apiurl } from '../services/apisrest';
import axios from 'axios';

class CrearCargo extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        form: {
            "nombre": ''
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

    crearCargo = () => {
        let bodyFormData = new FormData();
        bodyFormData.append('nombre', this.state.form.nombre);
        axios({
            method: "post",
            url: Apiurl + "cargos",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => {
                this.props.history.push("/dashboard");

            }).catch(error => {
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
                    <h4>Crear Cargo</h4>
                    <br />
                    <form className='form-horizontal' onSubmit={this.manejadorSubmit}>
                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Nombre</label>
                            <input type="text2" className="form-control" name="nombre" placeholder="Ingresa el nombre del cargo"
                                onChange={this.manejadorChange}
                            />
                        </div>

                        <br />

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.crearCargo()}>Crear</button>
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

export default CrearCargo;