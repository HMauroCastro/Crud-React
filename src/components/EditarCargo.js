import React from 'react'
import { Apiurl } from '../services/apisrest';
import axios from 'axios';

class EditarCargo extends React.Component {

    state = {
        form: {
            "id": "",
            "nombre": ""
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
        let cargoId = this.props.match.params.id;
        let url = Apiurl + "cargos/" + cargoId;
        axios.get(url)
            .then(response => {
                this.setState({
                    form: {
                        id: response.data.id,
                        nombre: response.data.nombre,
                    }
                })
            });
    }

    borrar = () => {
        let cargoId = this.props.match.params.id;
        let url = Apiurl + "cargos/" + cargoId;
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
        let cargoId = this.props.match.params.id;
        let url = Apiurl + "cargos/" + cargoId;
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
                    <h4>Editar Cargo</h4>
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
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Nombre</label>
                            <input type="text2" className="form-control" name="nombre" placeholder="Ingresa nombre cargo"
                                value={form.nombre}
                                onChange={this.manejadorChange}
                            />
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

export default EditarCargo;