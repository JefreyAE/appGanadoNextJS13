

export const validarAlfaNumerico = (name: string, val: any = ""):boolean => {
    var valor = val.current ? val.current.value : val;
    borrarError(name);

    const patron3 = /^[a-zA-Z0-9,.\s\-\/À-ÿ\u00f1\u00d1]+$/u;
    if (!patron3.test(valor) && valor) {
        mostrarErrorMejorado("input[name=" + name + "]", "El campo debe contener solo números y letras", name);
        return false;
    }
    return true;
}
export const validarAlfaNumericoTextarea = (name: string, val: any = ""):boolean => {
    var valor = val.current ? val.current.value : val;
    borrarError(name);

    const patron3 = /^[a-zA-Z0-9,.\s\-/À-ÿ\u00f1\u00d1]+$/u;
    if (!patron3.test(valor) && valor) {
        mostrarErrorMejorado("textarea[name=" + name + "]", "El campo debe contener solo números y letras", name);
        return false;
    }
    return true;
}

export const validarNumerico = (name: string, val: any = 0):boolean => {
    var valor = val.current ? val.current.value : val;
    borrarError(name);
    // Patron para los correos
    const patron = /^[0-9.0-9]+$/u;
    if (!patron.test(valor) && valor) {
        mostrarErrorMejorado("input[name=" + name + "]", "El campo debe contener solo números", name);
        return false;
    }
    return true;
}

export const validarPasswordMatch = (name: string, val1 = '', val2 = ''):boolean => {
    borrarError(name);
    if (val1 !== val2) {
        mostrarErrorMejorado("input[name=" + name + "]", "Las contraseñas no coinciden", name);
        return false;
    }
    return true;
}

export const validarCorreo = (name: string, val: any = "test@gmail.com"):boolean => {
    var valor = val.current ? val.current.value : val;
    borrarError(name);

    const patron3 = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!patron3.test(valor)) {
        mostrarErrorMejorado("input[name=" + name + "]", "El campo debe contener un correo electrónico.", name);
        return false;
    }
    return true;
}

export const validarPassword = (name: string, val: any = ""):boolean => {

    var valor = val.current ? val.current.value : val;
    borrarError(name);

    const patron3 = /^(([a-zA-Z0-9_$%&#@\-]))+$/u;
    if (!patron3.test(valor)) {
        mostrarErrorMejorado("input[name=" + name + "]", "La constraseña debe ser alfanumérica sin espacios y contener caracteres especiales como: _$%&#@-", name);
        return false;
    }
    return true;
}

export const validarPasswordLogin = (name: string, val: any = ""):boolean => {

    var valor = val.current ? val.current.value : val;
    borrarError(name);

    const patron3 = /^(([a-zA-Z0-9_$%&#@\-]))+$/u;
    if (!patron3.test(valor)) {
        mostrarErrorMejorado("input[name=" + name + "]", "La constraseña no es válida", name);
        return false;
    }
    return true;
}

export const mostrarErrorMejorado = (element: any, error: string, name: string):void => {
    const divError = document.createElement("div");
    divError.setAttribute("class", "error");
    divError.setAttribute("id", "error" + name);
    divError.innerHTML = error;
    let elem = document.querySelector(element);
    if (elem !== null) {
        elem.parentElement.prepend(divError);
    }
}

export const borrarError = (name: string): void => {
    const divList = Array.from(document.querySelectorAll<HTMLDivElement>("div[id=error" + name + "]"));
    divList.forEach(div => div.remove());
};

type ValidationObject = {
    type: string
    name: string;
    value: any
}

const validationSelector = (data: ValidationObject) => {
    switch (data.type) {
        case 'email':
            return validarCorreo(data.name, data.value)
        case 'password':
            return validarPassword(data.name, data.value)
        case 'textarea':
            return validarAlfaNumericoTextarea(data.name, data.value)
        case 'alfanumerico':
            return validarAlfaNumerico(data.name, data.value)
        case 'numerico':
            return validarNumerico(data.name, data.value)
        case 'passwordLogin':
            return validarPasswordLogin(data.name, data.value)

    }
}

export const validateFormInputs = (inputs: ValidationObject[]) => {
    for (const input of inputs) {
        if (!validationSelector(input)) {
            return false;
        }
    }
    return true;
};
