
export default class Validations{

    validarAlfaNumerico(name, val) {
      
        var valor = val.current.value;
        this.borrarError(name);

        const patron3 = /^[a-zA-Z0-9,.\s\-\/À-ÿ\u00f1\u00d1]+$/u;
        if (! patron3.test(valor) && valor) {
            this.mostrarErrorMejorado("input[name=" + name + "]", "El campo debe contener solo números y letras", name);      
            return false;   
        }
        return true;
        
    }
    validarAlfaNumericoTextarea(name, val) {
       
        var valor = val.current.value;
        this.borrarError(name);

        const patron3 = /^[a-zA-Z0-9,.\s\-/À-ÿ\u00f1\u00d1]+$/u;
        if (! patron3.test(valor) || valor == "") {
            this.mostrarErrorMejorado("textarea[name=" + name + "]", "El campo debe contener solo números y letras", name);
        }
    }

    validarNumerico(name, val) {
 
        var valor = val.current.value;
        this.borrarError(name);
        // Patron para los correos
        const patron = /^[0-9.0-9]+$/u;
        if (! patron.test(valor) && valor) {
            this.mostrarErrorMejorado("input[name=" + name + "]", "El campo debe contener solo números", name);
            return false;
        }   
        return true;
    }

    validarCorreo(name, val) {
        var valor = val.current.value;
        this.borrarError(name);

        const patron3 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (! patron3.test(valor)) {
            this.mostrarErrorMejorado("input[name=" + name + "]", "El campo debe contener un correo electrónico.", name);
        }
    }

    validarPassLogin(name, val) {
      
        var valor = val.current.value;
        this.borrarError(name);

        const patron3 = /^(([a-zA-Z-0-9]))+$/u;
        if (! patron3.test(valor)) {
            this.mostrarErrorMejorado("input[name=" + name + "]", "La constraseña debe ser alfanumérica.", name);
        }     
    }

    mostrarErrorMejorado = (element, error, name) => {
        const divError = document.createElement("div");
        divError.setAttribute("class", "error");
        divError.setAttribute("id", "error" + name);
        divError.innerHTML = error;
        let elem = document.querySelector(element);
        if(elem !== null){
            elem.parentElement.prepend(divError);
        }
    }

    borrarError = (name) => { // const div = document.querySelector("div[id=error"+name+"]");
        for (let div of document.querySelectorAll("div[id=error" + name + "]")) {
            div.remove();
        }

    }
}