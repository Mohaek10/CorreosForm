function validarStringInside(elemento, minCaracteres, maxCaracteres, errorElement) {
    let cadena = elemento.value.trim();
    let errorDiv = errorElement.querySelector('.invalid-feedback');

    if (validString(cadena, minCaracteres, maxCaracteres)) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none';
    } else {
        console.info("La cadena '" + cadena + "' es inválida");
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
    }
}

function validString(cadena, min, max) { //devuelve true si la cadena es válida
    return isNaN(cadena) && cadena.length >= min && (max === null || cadena.length <= max);
}


// Empres o Nombre
function validarInput(input, otroCampoId) {
    let otroCampo = document.getElementById(otroCampoId);
    otroCampo.disabled = input.value.trim() !== "";
}

//Select Documento
function validarSelectInside(elemento, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback'); // Cambio aquí para el elemeno incorrecto

    if (elemento.value !== "") {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none'; // Oculta el mensaje de error

    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block'; // Muestra el mensaje de error
    }

}

function validSelect(elemento) {
    var correcto = false;
    if (elemento.value !== "") {
        correcto = true;
    }
    return correcto;

}


// Validar documentacion dni o nie, depende del select
function validarDocumento(elemento, documento, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    var correcto = false;
    if (documento.value.toLowerCase() === "nif") {
        console.log("Se ha escodigo NIF")
        if (elemento.value.length === 9) {
            var numero = elemento.value.substring(0, 8);
            var letra = elemento.value.substring(8, 9);
            correcto = isDNI(numero, letra);
        } else {
            correcto = false;
        }
    }
    if (documento.value.toLowerCase() === "nie") {
        console.log("Se ha escodigo NIE")
        if (elemento.value.length === 9) {
            let letra1 = elemento.value.substring(0, 1);
            let numeros = elemento.value.substring(1, 8);
            let letra2 = elemento.value.substring(8.9);
            correcto = isNIE(letra1, numeros, letra2);
        } else {
            correcto = false;
        }
    }
    if (documento.value.toLowerCase() === "cie") {
        //Como tiene el mismo formato del NIE lo voy a validar siempre que cumpla unas categorias
        if (elemento.value.length === 9) {
            let letra1 = elemento.value.substring(0, 1);
            let numeros = elemento.value.substring(1, 8);
            let letra2 = elemento.value.substring(8.9);
            correcto = isCIF(letra1, numeros, letra2);
        } else {
            correcto = false;
        }
    }
    if (documento.value === "null") {
        correcto = false;
    }

    if (correcto === true) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none';
    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
    }

    return correcto;
}

//DNI
function isDNI(numeros, letra) {
    var correcto = false;
    //Validacion para comprobar que se a recibido tanto los 8 numeros como la letra
    if (!isNaN(numeros) && isNaN(letra)) {
        let lettersOrder = 'TRWAGMYFPDXBNJZSQVHLCKET';
        if (lettersOrder[numeros % 23] === letra.toUpperCase()) {
            correcto = true;
            console.log("El NIF es correcto")
        } else {
            console.log("ERROR AL VALIDAR EL DNI / NIF")
            correcto = false;
        }
    }
    return correcto;
}

//Metodo para validar un NIE con el formato X1234567A
function isNIE(letra1, numero, letra2) {
    let dni;
    let primerNumero;
    let correcto = false;
    if (!isNaN(numero) && isNaN(letra1) && isNaN(letra2)) {
        letra1 = letra1.toUpperCase();
        if (letra1 === "X" || letra1 === "Y" || letra1 === "Z") {
            //Si primer valor del NIE es x , se sustituye por 0
            if (letra1 === "X") {
                primerNumero = 0;
                //Concadeno no sumo los valores
                dni = primerNumero + numero;
                correcto = isDNI(dni, letra2);
                console.log(correcto);
            }
            //Si el primer valor del NIE es Y se sustituye por 1
            if (letra1 === "Y") {
                primerNumero = 1;
                dni = primerNumero + numero;
                correcto = isDNI(dni, letra2);
                console.log(correcto)
            }
            //Si el primer valor del NIE es Z se sustituye por 2
            if (letra1 === "Z") {
                primerNumero = 2;
                dni = primerNumero + numero;
                correcto = isDNI(dni, letra2);
                console.log(correcto);
            }
        } else {
            correcto = false;
        }
    } else {
        correcto = false;
    }
    return correcto;
}

//Mismo metodo que para validar el NIE
function isCIF(letra1, numero, letra2) {
    return isNIE(letra1, numero, letra2);
}

//Tipo de Via
// function validarTipoVia(elemento,){
//     var via = elemento.value.trim();
//     via.toLowerCase()
//     if (!(via === 'calle' || via === 'avda' || via === 'plaza' || via === 'camino' || via === 'carretera')) {
//
//     }
// }

//Validar numero entre min y max
function validNumber(elemento, min, max) {

    var correcto = false;
    elemento = parseFloat(elemento.value);
    if (elemento >= min && elemento<= max) {
        correcto = true;
    }
    return correcto;

}
function validarNumeroInside(elemento, min, max, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    if (validNumber(elemento, min, max)) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none'; // Oculta el mensaje de error

    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block'; // Muestra el mensaje de error
    }
}

//Numero y Piso

function validarNumeroDeVia(elemento, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    let num = parseInt(elemento.value);
    if (validNumber(elemento, 1, 100)) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none'; // Oculta el mensaje de error

    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block'; // Muestra el mensaje de error
    }

}

//Codigo Postal y provincia
let cpProvincias = {
    1: "Alava", 2: "Albacete", 3: "Alicante", 4: "Almeria", 5: "Avila",
    6: "Badajoz", 7: "Baleares", 8: "Barcelona", 9: "Burgos", 10: "Caceres",
    11: "Cadiz", 12: "Castellon", 13: "Ciudad Real", 14: "Cordoba", 15: "Coruña",
    16: "Cuenca", 17: "Gerona", 18: "Granada", 19: "Guadalajara", 20: "Guipuzcoa",
    21: "Huelva", 22: "Huesca", 23: "Jaen", 24: "Leon", 25: "Lerida",
    26: "La Rioja", 27: "Lugo", 28: "Madrid", 29: "Malaga", 30: "Murcia",
    31: "Naletra", 32: "Orense", 33: "Asturias", 34: "Palencia", 35: "Las Palmas",
    36: "Pontevedra", 37: "Salamanca", 38: "Santa Cruz de Tenerife", 39: "Cantabria", 40: "Segovia",
    41: "Sevilla", 42: "Soria", 43: "Tarragona", 44: "Teruel", 45: "Toledo",
    46: "Valencia", 47: "Valladolid", 48: "Vizcaya", 49: "Zamora", 50: "Zaragoza",
    51: "Ceuta", 52: "Melilla"
};

function validarCodigoPostalInside(elemento, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback'); // Cambio aquí para el elemeno incorrecto
    let cp = parseInt(elemento.value);
    if (validCodPostal(elemento)) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none'; // Oculta el mensaje de error
        correcto = true;

    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block'; // Muestra el mensaje de error
    }
}

function validCodPostal(elemento) {
    var correcto = false;
    let cp = parseInt(elemento.value);
    if ((elemento.value !== "") && cp > 1000 && cp < 52999) {
        correcto = true;
    }
    return correcto;

}

function obtenerProvincia(codigoPostal) {
    codigoPostal = codigoPostal.replace(/\s/g, '');

    if (codigoPostal.length === 5 && parseInt(codigoPostal) <= 52999 && parseInt(codigoPostal) >= 1000) {
        return cpProvincias[parseInt(codigoPostal.substring(0, 2))] || "---";
    } else {
        return "---";
    }
}

function actualizarProvinciaEnInput() {
    const inputCodigoPostal = document.getElementById('codigoPostal');
    const inputProvincia = document.getElementById('provincia');

    inputProvincia.value = obtenerProvincia(inputCodigoPostal.value);
    document.getElementById('codigoPostal').addEventListener('keyup', actualizarProvinciaEnInput);

}


// Validar Telefonos

function validarNumeroTelefono(elemento, errorElement) {

    var errorDiv = errorElement.querySelector('.invalid-feedback');

    if (validarTelefono(elemento.value)) {
        errorDiv.style.display = 'none';
    } else {
        errorDiv.style.display = 'block';
    }

}

function validarTelefono(cadena) {
    console.log(cadena)
    if ((cadena.length === 0) || (validarNumero(cadena, 9, 9) && (cadena.charAt(0) === '9' || cadena.charAt(0) === '7' || cadena.charAt(0) === '6'))) {
        return true;
    } else {
        return false;
    }
}

function validarNumero(cadena, min, max) {
    if (!isNaN(cadena) && cadena.length >= min && cadena.length <= max) {
        return true;
    } else {
        return false;
    }
}

// Validar Email
function validarEmailInside(elemento, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    if (validEmail(elemento)) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none';
        correcto = true;
    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
    }
}
function validEmail(elemento) {
    let correcto = false;
    if (elemento.value.includes("@") && elemento.value.includes(".")) {
        correcto = true;
    }
    return correcto;
}

//Calcular peso volumetrico
function pesoVolumetrico(alto, largo, ancho, envioPeso) {
    var correcto=false;
    var altoNum = parseFloat(alto.value);
    var largoNum = parseFloat(largo.value);
    var anchoNum = parseFloat(ancho.value);

    if (!isNaN(altoNum) && !isNaN(largoNum) && !isNaN(anchoNum)) {
        correcto=true;
        var altura = altoNum.toFixed(2);
        var longitur = largoNum.toFixed(2);
        var anchura = anchoNum.toFixed(2);
        envioPeso.value = ((altura*longitur*anchura)/5000).toFixed(2);
    }
    console.log("El peso volumetrico es : "+correcto)
    return correcto;
}

function unlock(elemento,desbloquear){
    if(elemento.checked){
        console.log("Desbloqueado")
        desbloquear.disabled=false;
    }else{
        console.log("Bloqueado")
        desbloquear.disabled=true;
    }
}
function validFecha(elemento, fechaLim) {
    var correcto = false;

    // Obtener el valor del elemento
    var fechaTexto = elemento.value;

    // Separar el día, mes y año
    var partesFecha = fechaTexto.split('/');
    var dia = parseInt(partesFecha[0], 10);
    var mes = parseInt(partesFecha[1], 10) - 1; // Restar 1 al mes ya que los meses en JavaScript son 0-indexados
    var anio = parseInt(partesFecha[2], 10);

    // Crear una nueva fecha con los componentes obtenidos
    var fechaValidada = new Date(anio, mes, dia);

    if (validarFechaText(elemento)) {
        console.log("Fecha correcta");

        // Asegurarse de que fechaLim sea una fecha válida
        if (isNaN(fechaLim.getTime())) {
            console.error("La fecha límite no es válida");
            return false;
        }

        fechaValidada.setHours(0, 0, 0, 0);
        fechaLim.setHours(0, 0, 0, 0);

        if (fechaValidada > fechaLim) {
            correcto = true;
        }
    }

    return correcto;
}


function validarFechaText(elemento) {
    var fechaInput = elemento.value;
    var patronFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (patronFecha.test(fechaInput)) {
        var dia = parseInt(fechaInput.substring(0, 2), 10);
        var mes = parseInt(fechaInput.substring(3, 5), 10);
        var ano = parseInt(fechaInput.substring(6, 10), 10);

        if (dia >= 1 && dia < 32 && mes >= 1 && mes < 13 && ano >= 1000) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}



function validarFechaInside(elemento, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    let fechahoy = new Date();

    // Utilizar la función validarFechaText para verificar el formato
    if (validarFechaText(elemento)) {

        if (validFecha(elemento, fechahoy)) {
            elemento.classList.remove('is-invalid');
            errorDiv.style.display = 'none';
        } else {
            elemento.classList.add('is-invalid');
            errorDiv.style.display = 'block';
        }
    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
    }
}
function validarIbanInside(elemento, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    if (validarIban(elemento)) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none';
    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
    }
}
function validarIban(elemento) {
    var iban = elemento.value;
    var correcto = false;
    if (iban.length === 24) {
        var letras = iban.substring(0, 2);
        var numeros = iban.substring(2, 24);
        if (isNaN(letras) && !isNaN(numeros)) {
            correcto = true;
        }
    }
    return correcto;
}

function comprobarMaxTextArea(elemento, maxCaracteres, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    if (validarTamanoTextArea(elemento, maxCaracteres)) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none';
    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
    }
}
function validarTamanoTextArea(elemento,maxCarc){
    var correcto=false;
    if(elemento.value.length<=maxCarc){
        correcto=true;
    }
    return correcto;
}