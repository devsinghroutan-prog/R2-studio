const subGrid = document.getElementById("subGrid");
const emptySub = document.getElementById("emptySub");

// get data
const videos = JSON.parse(localStorage.getItem("videos")) || [];
const subs = JSON.parse(localStorage.getItem("subs")) || [];

// clear
subGrid.innerHTML = "";

// no subscription
if (subs.length === 0) {
  emptySub.style.display = "block";
} else {
  emptySub.style.display = "none";

  // show videos from subscribed channels
  videos.forEach(video => {
    if (subs.includes(video.channel)) {
      const card = document.createElement("div");
      card.className = "video-card";

      card.innerHTML = `
        <div class="video-thumb">
          <img src="${video.thumbnail}">
        </div>
        <div class="video-info">
          <h4>${video.title}</h4>
          <p>${video.channel}</p>
        </div>
      `;

      card.onclick = () => {
        localStorage.setItem("currentVideo", JSON.stringify(video));
        location.href = "video.html";
      };

      subGrid.appendChild(card);
    }
  });

  // agar subscribed hai par video nahi
  if (subGrid.innerHTML === "") {
    emptySub.style.display = "block";
    emptySub.innerText = "No videos from subscribed channels";
  }
}
