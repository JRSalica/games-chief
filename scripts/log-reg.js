// CAMBIO DE FORMULARIO LOG A REG Y VICEVERSA

const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link");
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
});

// DATOS DE FORMULARIO DE REGISTRO
const userRegisterForm = document.getElementById('user-register')
const loginSection = document.getElementById('loginSection')
const logoutSection = document.getElementById('logout')
let user;

checkIsAuth();

function checkIsAuth() {
    user = JSON.parse(localStorage.getItem('currentUser'))
    if (user) {
        loginSection.classList.add('d-none');
        logoutSection.classList.remove('d-none');
        const welcomeHTML = document.querySelector('.welcome');
        welcomeHTML.textContent = `Bienvenido ${user.fullname}`
    } else {
        loginSection.classList.remove('d-none');
        logoutSection.classList.add('d-none')
    }
}

const formEl = userRegisterForm.elements;
const errorMSG = document.getElementById('form-error');
const usersList = document.querySelector('#users-list')

let users = JSON.parse(localStorage.getItem('users')) || [];

console.log(users)
renderUser();

function registrarUsuario(ev) {
    ev.preventDefault();
    const elemento = ev.target.elements;
    const email = elemento.email.value;

    const emailExist = users.some(usr => email === usr.email)

    if (emailExist) {
        showErrorMsg('El correo ya existe', errorMSG)
        return;
    }

    if (elemento.password.value !== elemento.password2.value) {
        showErrorMsg('Las contraseñas no coinciden', errorMSG)
        return;
    }

    if (elemento.age.valueAsNumber < 18) {
        showErrorMsg('Debe ser mayor de 18 años para registrarse', errorMSG, 5000)
        return;
    }


    console.log(ev)
    const user = {
        fullname: elemento.fullname.value,
        username: elemento.username.value,
        email: elemento.email.value,
        age: elemento.age.valueAsNumber,
        gen: elemento.gen.value,
        password: elemento.password.value,
        id: Date.now(),
        createdAt: new Date(),
        role: 'CLIENT',
    }

    users.push(user)
    console.log(users);
    localStorage.setItem('users', JSON.stringify(users))
    renderUser()
}

function showErrorMsg(message, element, time = 2000) {
    element.innerText = message;
    setTimeout(() => {
        element.innerText = ''
    }, time)
}

// OBTENER REFERENCIA AL FORMULARIO DE LOGIN
const loginForm = document.getElementById('login');
const formLoginError = document.getElementById('formLoginError')
// Detectar cuando se dispara el evento Submit
// Obtener valores de email y password en el input
loginForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputEmail = loginForm.elements.email.value;
    const inputPassword = loginForm.elements.password.value;
    const user = users.find(usr => {
        return usr.email === inputEmail
    });
    console.log('user', user)

    if (!user || user.password !== inputPassword) {
        showErrorMsg('Credenciales incorrectas', formLoginError)
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user))
    loginForm.reset()
    checkIsAuth();
    // window.location.href = '/index.html'
    setTimeout(() => window.location.href = '/pages/log-reg.html', 3000)
})

function logout() {
    localStorage.removeItem('currentUser');
    checkIsAuth();
    setTimeout(() => window.location.href = '/pages/log-reg.html', 3000)

}

window.onload = () => console.log('Recargo')