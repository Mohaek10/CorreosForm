function validarString(elemento, minCaracteres, maxCaracteres, errorElement) {
    let correcto = false;
    let longitud = elemento.value.trim();
    let errorDiv = errorElement.querySelector('.invalid-feedback'); // Cambio aquí para el elemeno incorrecto

    if ((longitud.length >= minCaracteres && longitud.length <= maxCaracteres) && isNaN(elemento.value) === true) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none'; // Oculta el mensaje de error
        correcto = true;

    } else {
        console.info("El nombre " + longitud + " es invalido");
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block'; // Muestra el mensaje de error
    }
    return correcto;
}


// Empres o Nombre
function validarInput(input, otroCampoId) {
    let otroCampo = document.getElementById(otroCampoId);
    otroCampo.disabled = input.value.trim() !== "";
}

//Select Documento
function validarSelect(elemento, errorElement) {
    var correcto = false;
    var errorDiv = errorElement.querySelector('.invalid-feedback'); // Cambio aquí para el elemeno incorrecto

    if (elemento.value !== "") {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none'; // Oculta el mensaje de error
        correcto = true;

    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block'; // Muestra el mensaje de error
    }
    return correcto;

}

// Validar documentacion dni o nie, depende del select
function validarDocumento(elemento, documento, errorElement) {
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    var correctDiv = errorElement.querySelector('.valid-feedback');
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
        correctDiv.style.display = 'block';
    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
        correctDiv.style.display = 'none';
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


//Numero y Piso

function validarNumeroDeVia(elemento, errorElement) {
    var correcto = false;
    var errorDiv = errorElement.querySelector('.invalid-feedback'); // Cambio aquí para el elemeno incorrecto
    let num = parseInt(elemento.value);
    if ((elemento.value !== "") && num > 0 && num < 100) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none'; // Oculta el mensaje de error
        correcto = true;

    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block'; // Muestra el mensaje de error
    }
    return correcto;

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

function validarCodigoPostal(elemento, errorElement) {
    var correcto = false;
    var errorDiv = errorElement.querySelector('.invalid-feedback'); // Cambio aquí para el elemeno incorrecto
    let cp = parseInt(elemento.value);
    if ((elemento.value !== "") && cp > 1000 && cp < 52999) {
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none'; // Oculta el mensaje de error
        correcto = true;

    } else {
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block'; // Muestra el mensaje de error
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
}

document.getElementById('codigoPostal').addEventListener('keyup', actualizarProvinciaEnInput);


// Validar Telefonos

function validarNumeroTelefono(elemento,errorElement){
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    var correctDiv = errorElement.querySelector('.valid-feedback');
    if(!isNaN(elemento.value)&& elemento.value.length===9){
        var indice=elemento.value.substring(0,1);
        if(indice===6|| indice===9 ||indice===7){
            elemento.classList.remove('is-invalid');
            errorDiv.style.display = 'none';
            correctDiv.style.display = 'block';
        }else{
            elemento.classList.add('is-invalid');
            errorDiv.style.display = 'block';
            correctDiv.style.display = 'none';
        }
    }else{
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
        correctDiv.style.display = 'none';
    }
}

// Validar Email
function validarEmail(elemento,errorElement){
    var errorDiv = errorElement.querySelector('.invalid-feedback');
    var correctDiv = errorElement.querySelector('.valid-feedback');
    if(elemento.value.includes("@")&& elemento.value.includes(".")){
        elemento.classList.remove('is-invalid');
        errorDiv.style.display = 'none';
        correctDiv.style.display = 'block';
    }else{
        elemento.classList.add('is-invalid');
        errorDiv.style.display = 'block';
        correctDiv.style.display = 'none';
    }
}