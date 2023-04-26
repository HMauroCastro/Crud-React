import React from 'react'
import { Apiurl } from '../services/apisrest';
import '../assetss/css/Login.css';
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
        cargos: [],
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
                        cargo: response.data.cargo?.id
                    }
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

    borrar = () => {
        let usuarioId = this.props.match.params.id;
        let url = Apiurl + "usuarios/" + usuarioId;
        axios.delete(url)
            .then(response => {
                this.props.history.push("/dashboard");
            }).catch(error => {
                this.setState({ error: true, errorMsg: "Error" })
            })

    }

    actualizar = () => {
        let usuarioId = this.props.match.params.id;
        let bodyFormData = new FormData();

        bodyFormData.append('nombre', this.state.form.nombre);
        bodyFormData.append('apellido', this.state.form.apellido);
        bodyFormData.append('dni', this.state.form.dni);
        bodyFormData.append('cedula', this.state.form.cedula);
        bodyFormData.append('direccion', this.state.form.direccion);
        bodyFormData.append('salario', this.state.form.salario);
        bodyFormData.append('cargo', this.state.form.cargo);

        if (this.state.form.salario < 0) {
            this.setState({ error: true, errorMsg: "El salario no puede ser negativo" })
        } else {
            axios({
                method: "put",
                url: Apiurl + "usuarios/" + usuarioId,
                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(response => {
                    this.props.history.push("/dashboard");

                }).catch(error => {
                    this.setState({ error: true, errorMsg: "Error" })
                })
        }
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
                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Id</label>
                            <input type="text2" className="form-control input-sm" name="id" placeholder="Id" disabled
                                value={form.id}
                                onChange={this.manejadorChange}
                            />
                        </div>

                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Fecha_creación</label>
                            <input type="text2" className="form-control" name="fechaCreacion" placeholder="Fecha creación" disabled
                                value={form.fechaCreacion}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Nombre</label>
                            <input type="text2" className="form-control" name="nombre" placeholder="Ingresa tu nombre"
                                value={form.nombre}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Apellido</label>
                            <input type="text2" className="form-control" name="apellido" placeholder="Ingresa tu apellido"
                                value={form.apellido}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Dni</label>
                            <input type="text2" className="form-control" name="dni" placeholder="Ingresa tu dni"
                                value={form.dni}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Cedula</label>
                            <input type="text2" className="form-control" name="cedula" placeholder="Ingresa tu cédula"
                                value={form.cedula}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Dirección</label>
                            <input type="text2" className="form-control" name="direccion" placeholder="Ingresa tu dirección"
                                value={form.direccion}
                                onChange={this.manejadorChange}
                            />
                        </div>
                        <div className="col-md-10 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Salario</label>
                            <input min="0" type="Number" className="form-control" name="salario" placeholder="Ingresa tu salario"
                                value={form.salario}
                                onChange={this.manejadorChange}
                            />
                        </div>

                        <div className="col-md-5 control-label">
                            <label className="col-md-2 control-label" style={{ fontWeight: 'bold' }}>Cargo</label>
                            <select className="form-control" name="cargo" onChange={this.manejadorChange}>
                                <option value>Seleccione una opción</option>
                                {this.state.cargos.map((value, index) => {
                                    return (
                                        <option key={index} value={value.id}>
                                            {value.nombre}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        <br />

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.actualizar()}>Guardar</button>
                            <button type="submit" className="btn btn-danger" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.borrar()}>Eliminar</button>
                            <button type="submit" className="btn btn-secondary" style={{ marginRight: "10px", marginBottom: "10px" }} onClick={() => this.salir()}>Salir</button>
                        </div>

                        {this.state.error === true &&
                            <div className="col-md-10 control-label">
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