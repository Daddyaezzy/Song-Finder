let term = " ";

const songs = document.getElementById("songs");

const updateSearch = () => {
  term = document.getElementById("searchInput").value;

  if (!term || term === " ") {
    alert("Enter a proper artist name");
  } else {
    while (songs.firstChild) {
      songs.removeChild(songs.firstChild);
    }

    const url = `https://itunes.apple.com/search?media=music&term=${term}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.results)
        const artist = data.results;
        return artist.map((result) => {
          const article = document.createElement("article"),
            artist = document.createElement("p"),
            song = document.createElement("p"),
            img = document.createElement("img"),
            audio = document.createElement("audio"),
            audioSource = document.createElement("source");

          artist.innerText = result.artistName;
          song.innerText = result.trackName;
          img.src = result.artworkUrl100;
          audio.setAttribute("controls", " ");
          audioSource.src = result.previewUrl;

          article.appendChild(img);
          article.appendChild(song);
          article.appendChild(artist);
          article.appendChild(audio);
          audio.appendChild(audioSource);
          songs.appendChild(article);

          console.log(result);
        });
      })
      .catch((error) => console.log("Request Error:", error));
  }
};

const searchBtn = document.querySelector("button");

searchBtn.addEventListener("click", updateSearch);
document.addEventListener(
  "play",
  (event) => {
    let audio = document.getElementsByTagName("audio");

    for (let i = 0; i < audio.length; i++) {
      if (audio[i] != event.target) {
        audio[i].pause();
      }
    }
  },
  true
);
