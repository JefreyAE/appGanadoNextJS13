import React, {Component, useState} from "react";
import LoginService from "../../services/loginService.js";
import Header from "../../layouts/headerComponent/Header.jsx";

export default function Login (props){
    
    contador = 1;
    emailRef = React.createRef();
    passwordRef = React.createRef();
    _loginService = new LoginService();
    password = "";
    email = "";


    let state = {
        message: ""
    } 
    sessionStorage.removeItem('token');    
    

    state = {
        contador: 0,
        user: {}
    };

    // componentDidMount(){
    //     //DOM Elements
    //     this.password = document.getElementById('password');
    //     this.email = document.getElementById('email');

    //     //Listeners

    //     this.password.addEventListener('keydown', (e)=>{
    //         this.setState({message : ""});
    //     });
    //     this.email.addEventListener('keydown', (e)=>{
    //         this.setState({message : ""});
    //     });
    // }

    
    loguear = (e) => {
        //const navigate = useNavigate();
        e.preventDefault();
        /*this.setState({
            contador: this.state.contador
        });*/

        this._loginService.login("",this.emailRef.current.value,this.passwordRef.current.value).then(res=>{
            if(res.data.status ){
                this.setState({message : res.data.message});
                //window.location = '/';
                //sessionStorage.removeItem('token');
            }else{
                console.log(res.data);
                let token = res.data;
                sessionStorage.setItem('token', JSON.stringify(token));
                window.location = '/main';
            }
        }).catch(
            
        )
    }

    return(
        <React.Fragment>
            <Header/>
            <div className="form col-lg-4" id='formLogin'>
                <h2>Ingrese sus credenciales</h2>
                <form onSubmit={this.loguear} id="formLog">
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico:</label>
                        <input className="form-control" ref={this.emailRef} id="email" name='email' type="email" placeholder="@" autoFocus required pattern="[^@\s]+@[^@\s]+\.[^@\s]+"/> 
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input className="form-control" ref={this.passwordRef} id="password" name="password" type="password" placeholder="Contraseña" required maxLength="40" pattern="[a-zA-Z0-9]+"/>
                    </div> 
                    {   this.state.message != "" &&
                        <div className='error'>{this.state.message}</div>
                    }
                    
                    <button type="submit" className="large green button-login " id="btnLogin" >Ingresar</button>  
                </form>
            </div> 
        </React.Fragment>
    );
    

}

