import React from 'react'
import '../assetss/css/Login.css';
import logo from '../assetss/img/logo.png';
import { Apiurl } from '../services/apisrest';
import axios from 'axios';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        form: {
            "usuario": "",
            "password": ""
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

    manejadorBoton = () => {
        let url = Apiurl + "auth"
        axios.post(url, this.state.form)
            .then(response => {
                if (response.data.status === "ok") {
                    localStorage.setItem("token", response.data.result.token);
                    this.props.history.push("/dashboard");
                } else {
                    this.setState({ error: true, errorMsg: "response.data.result.error_msj" })
                }
            }).catch(error => {
                this.setState({ error: true, errorMsg: "Error" })
            
            })
    }


    render() {
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <br /><br />
                            <img src={logo} width="100px" alt="User Icon" />
                            <br /><br />
                        </div>

                        <form onSubmit={this.manejadorSubmit}>
                            <input type="text" className="fadeIn second" name="usuario" placeholder="Usuario" onChange={this.manejadorChange} />
                            <input type="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange} />
                            <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton} />
                        </form>

                        {this.state.error === true &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMsg}
                            </div>
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;