const signupForm = document.querySelector('.signup-container');
const loginForm = document.querySelector('.signin-container');
const loginOutBtn = document.querySelector('.signin-btn');
const signUpBtn = document.querySelector('.signup-btn');

auth.onAuthStateChanged(function(user) {
    if (user) {
        loginOutBtn.textContent = "Logout";
    } else {
        loginOutBtn.textContent = "Login";
    }
})

loginOutBtn.addEventListener('click', (e) => {
    if (loginOutBtn.textContent === "Logout") {
        auth.signOut().then(() => {
            console.log('logged out');
        });
    } else {
        openForm(e.target.getAttribute('data'));
    }
})

signUpBtn.addEventListener('click', (e) => {
    openForm(e.target.getAttribute('data'));
})

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userSignUp();
    signupForm.reset();
    closeForm(signupForm.parentElement.classList);
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userLogin();
    loginForm.reset();
    closeForm(loginForm.parentElement.classList);
})

function userSignUp() {
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;

    console.log(email, password);

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
    })
}

function userLogin() {
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
    })
}

function openForm(formToOpen) {
    document.querySelector(`.${formToOpen}`).style.display = "block";
    document.querySelector('.library-container').classList.add('popup-selected');
    document.querySelector('.header-container').classList.add('popup-selected');
    document.querySelector('.nav').classList.add('popup-selected');
}

function closeForm(formToClose) {
    document.querySelector(`.${formToClose}`).style.display = "none";
    document.querySelector('.library-container').classList.remove('popup-selected');
    document.querySelector('.header-container').classList.remove('popup-selected');
    document.querySelector('.nav').classList.remove('popup-selected');
}