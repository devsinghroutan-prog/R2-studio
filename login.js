const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const switchBtn = document.getElementById("switchBtn");
const formTitle = document.getElementById("formTitle");

let isLogin = true;

// switch login / signup
switchBtn.onclick = () => {
  isLogin = !isLogin;

  if (isLogin) {
    formTitle.innerText = "Login to R2 Studio";
    loginBtn.innerText = "Login";
    switchBtn.innerText = "Sign up";
    switchBtn.previousSibling.textContent = "Don't have an account? ";
  } else {
    formTitle.innerText = "Create your account";
    loginBtn.innerText = "Sign Up";
    switchBtn.innerText = "Login";
    switchBtn.previousSibling.textContent = "Already have an account? ";
  }
};

// submit
loginBtn.onclick = () => {
  if (!email.value || !password.value) {
    alert("Please fill all fields");
    return;
  }

  // fake auth (frontend only)
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userEmail", email.value);

  // redirect
  window.location.href = "index.html";
};
