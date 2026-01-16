const loginBtn = document.getElementById("loginBtn");
if(loginBtn){
  loginBtn.innerText = localStorage.getItem("loggedIn") ? "Logout" : "Login";
}



// show email
const email = localStorage.getItem("userEmail");
if(email){
  userEmail.innerText = email;
}

// logout
logoutBtn.onclick = ()=>{
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
  location.href = "login.html";
};
sidebar.onclick = (e)=> e.stopPropagation();
