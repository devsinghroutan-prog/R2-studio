const loginBtn = document.getElementById("loginBtn");
if(loginBtn){
  loginBtn.innerText = localStorage.getItem("loggedIn") ? "Logout" : "Login";
}

// get search input (top bar)
const searchInput = document.querySelector(".center input");

// stop if no search bar
if(searchInput){
  searchInput.addEventListener("input", ()=>{
    const query = searchInput.value.toLowerCase();

    // all video cards on page
    const cards = document.querySelectorAll(".video-card");

    cards.forEach(card=>{
      const title = card.querySelector("h4")?.innerText.toLowerCase() || "";
      const channel = card.querySelector("p")?.innerText.toLowerCase() || "";

      if(title.includes(query) || channel.includes(query)){
        card.style.display = "block";
      }else{
        card.style.display = "none";
      }
    });
  });
}
sidebar.onclick = (e)=> e.stopPropagation();
