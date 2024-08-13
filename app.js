let remplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"]
];
const inputEncriptar = document.getElementById("input__encriptar");
const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const imgVacio = document.getElementById("imgVacio");
const textoFinal = document.getElementById("textoFinal");
const textoInfo = document.getElementById("textoInfo");
const btnCopiar = document.getElementById("btnCopiar");

// ADVERTENCIA DE MAYUSCULAS, ACENTOS Y CARACTERES ESPECIALES
document.getElementById('input__encriptar').addEventListener('input', function(event) {
    const textarea = event.target;
    const originalValue = textarea.value;
    const alerta = document.getElementById('alerta__mayus');
    
    // Expresión regular para permitir solo letras minúsculas y números
    const regex = /^[a-z0-9\sñ°!"#$%&/()<>=?¡'¿¨*+|{},.;:_-]*$/;

    
    if (!regex.test(originalValue)) {
        textarea.value = originalValue.slice(0, -1); 
        alerta.style.visibility = 'visible'; 
        
        
        setTimeout(function() {
            alerta.style.visibility = 'hidden';
        }, 3000);
    } else {
        alerta.style.visibility = 'hidden';
    }
});

// CAMBIO DE TEMAS
let currentStyle = 0;

document.getElementById('toggle').addEventListener('change', function() {
    const existingLink = document.getElementById('additional-stylesheet');
    if (existingLink) {
        existingLink.remove();
    }

    currentStyle = (currentStyle + 1) % 3;

    const link = document.createElement('link');
    link.id = 'additional-stylesheet';
    link.rel = 'stylesheet';

    if (currentStyle === 1) {
        link.href = 'theme2.css'; 
    } else if (currentStyle === 2) {
        link.href = 'theme3.css'; 
    } else {
        link.href = 'style.css'; 3
    }
    document.head.appendChild(link);
});

// ENCRIPTAR
btnEncriptar.addEventListener('click', () => {
    const texto = inputEncriptar.value.toLowerCase();

    if (texto !== "") {
        function encriptar(newtext) {
            for (let i = 0; i < remplazar.length; i++) {
                if (newtext.includes(remplazar[i][0])) {
                    newtext = newtext.replaceAll(remplazar[i][0], remplazar[i][1]);
                }
            }
            return newtext;
        }
        const textoEncriptado = encriptar(texto);
        textoFinal.innerHTML = textoEncriptado;
        imgVacio.classList.add("ocultar");
        textoInfo.classList.add("ocultar");
        btnCopiar.classList.remove("btn__ocultar");
        textoFinal.classList.add("ajustar");

        mostrarAlerta('alerta__encriptar'); // Llamar al popup de encriptado
    } else {
        mostrarAlerta('alerta__mensaje1'); // Mostrar mensaje de texto vacío
    }
});

function mostrarAlerta(id) {
    var alerta = document.getElementById(id);
    alerta.style.visibility = 'visible';
    setTimeout(function() {
        alerta.style.visibility = 'hidden';
    }, 3000);
}
// DESENCRIPTAR
btnDesencriptar.addEventListener('click', () => {
    const texto = inputEncriptar.value.toLowerCase();
    
    if (texto !== "") {
        function desencript(newtext) {
            for (let i = 0; i < remplazar.length; i++) {
                if (newtext.includes(remplazar[i][1])) {
                    newtext = newtext.replaceAll(remplazar[i][1], remplazar[i][0]);
                }
            }
            return newtext;
        }
        const textoDesencriptado = desencript(texto);
        textoFinal.innerHTML = textoDesencriptado;
        imgVacio.classList.add("ocultar");
        textoInfo.classList.add("ocultar");
        btnCopiar.classList.remove("btn__ocultar");
        textoFinal.classList.add("ajustar");

        mostrarAlerta('alerta__desencriptar'); // Llamar al popup de desencriptado
    } else {
        mostrarAlerta('alerta__mensaje2'); // Mostrar mensaje de texto vacío
    }
});

function mostrarAlerta(id) {
    var alerta = document.getElementById(id);
    alerta.style.visibility = 'visible';
    setTimeout(function() {
        alerta.style.visibility = 'hidden';
    }, 3000);
}
// COPIAR
btnCopiar.addEventListener("click", () => {
    textoFinal.select();
    document.execCommand('copy');
    function mostrarAlerta() {
        var alerta = document.getElementById('alerta');
        alerta.style.visibility = 'visible';
        setTimeout(function() {
        alerta.style.visibility = 'hidden';
        }, 3000);
        inputEncriptar.value = '';
    }
    mostrarAlerta();
});

inputEncriptar.addEventListener("input", () => {
    inputEncriptar.style.height = "auto";
    let scHeight = inputEncriptar.scrollHeight;
    inputEncriptar.style.height = `${scHeight}px`;
});
