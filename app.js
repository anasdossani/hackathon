const auth = firebase.auth();

// Elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");

// Clear message on input
email && email.addEventListener("input", () => message.textContent = "");
password && password.addEventListener("input", () => message.textContent = "");

// Sign Up Function
function signUp() {
  if (!email.value || !password.value) {
    message.textContent = "Please fill in all fields";
    message.style.color = "red";
    return;
  }

  auth.createUserWithEmailAndPassword(email.value, password.value)
    .then(() => {
      message.textContent = "Account created successfully! 🎉";
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    })
    .catch((error) => {
      console.error(error);
      message.textContent = error.message;
      message.style.color = "red";
    });
}

// Sign In Function
function signIn() {
  if (!email.value || !password.value) {
    message.textContent = "Please fill in all fields";
    message.style.color = "red";
    return;
  }

  auth.signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      message.textContent = "Signed in successfully! 🎉";
      message.style.color = "green";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
    })
    .catch((error) => {
      console.error(error);
      message.textContent = "Invalid email or password";
      message.style.color = "red";
    });
}