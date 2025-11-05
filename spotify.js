// console.log(" Script is Working!")



// ------------------ Global Variables ------------------

let currentSong = new Audio();
let songs = [];
let currFolder = "";
let allSongsData = {};

// ------------------ Time Formatter ------------------

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    secs = String(secs).padStart(2, '0');

    return hours === "00" ? `${minutes}:${secs}` : `${hours}:${minutes}:${secs}`;
}

// ------------------ Fetch Songs from JSON ------------------

async function fetchSongsJSON() {
    try {
        const res = await fetch("songs/songs.json");
        allSongsData = await res.json();
    } catch (err) {
        console.error("Failed to fetch songs.json:", err);
    }
}

// ------------------ Get Songs for a Folder ------------------

async function getSongs(folder) {
    currFolder = folder;
    const folderName = folder.split("/").pop();
    songs = allSongsData[folderName]?.songs || [];

    const songUl = document.querySelector(".songs ul");
    songUl.innerHTML = songs
        .map(song => `
            <li>
                <div class="music_icn">
                    <img src="svg/music.svg" alt="" class="invert">
                </div>
                <div class="music_text">
                    <p class="trackk">${song.replaceAll(/%20/g, ' ')}</p>
                </div>
            </li>
        `).join("");

    Array.from(songUl.getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => playMusic(e.querySelector(".trackk").textContent.trim()));
    });

    return songs;
}

// ------------------ Play Music ------------------


const playMusic = (track, pause = false) => {
    currentSong.src = `${currFolder}/${track}`;
    if (!pause) currentSong.play();

    const playBtn = document.getElementById("play");
    if (playBtn) playBtn.src = "svg/play.svg";

    document.querySelector(".song_tittle p").textContent = decodeURIComponent(track);
    document.getElementById("start_timing").textContent = "00:00";
    document.getElementById("timing").textContent = "00:00";

    // Highlight active song
    const allSongs = document.querySelectorAll(".songs ul li");
    allSongs.forEach(li => {
        const songText = li.querySelector(".trackk").textContent.trim();
        const iconContainer = li.querySelector(".music_icn");

        // Reset icon
        iconContainer.innerHTML = `<img src="svg/music.svg" alt="" class="invert">`;
        li.querySelector(".trackk").classList.remove("active-song");

        if (songText === track.trim()) {
            li.querySelector(".trackk").classList.add("active-song");

            // Add animated equalizer
            iconContainer.innerHTML = `
        <div class="equalizer">
          <span></span><span></span><span></span>
        </div>
      `;
        }
    });
};


// ------------------ Display Albums ------------------

async function displayAlbums() {
    const songSec = document.querySelector(".song_sec");
    songSec.innerHTML = "";

    for (const artist in allSongsData) {
        const data = allSongsData[artist];
        songSec.innerHTML += `
            <div data-folder="songs/${artist}" class="secnd_song song">
                <i class="fa-solid fa-play"></i>
                <img src="${data.cover}" alt="${artist}">
                <div class="txt">
                    <h3>${artist}</h3>
                    <p>${data.songs.length} Songs</p>
                </div>
            </div>
        `;
    }

    Array.from(document.getElementsByClassName("song")).forEach(el => {
        el.addEventListener("click", async e => {
            const folder = e.currentTarget.dataset.folder;
            songs = await getSongs(folder);
            // if (songs.length > 0) playMusic(songs[0]);
            let folderName = document.querySelector('.folderName');
            folderName.innerHTML = folder.split('/').pop().replaceAll('_', ' ');
            let icon = document.querySelector('.icon');
            icon.innerHTML = `${songs.length} songs`;
        });
    });
}

// ------------------ Search Functionality ------------------

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

function mockAPISearch(query) {
    const allTracks = Object.values(allSongsData).flatMap(d => d.songs);
    return allTracks.filter(name => name.toLowerCase().includes(query.toLowerCase()));
}

function handleSearch(event) {
    const query = event.target.value.trim();
    const resultsContainer = document.getElementById("search_output_ul");
    const outputBox = document.querySelector(".search_output");
    resultsContainer.innerHTML = "";

    if (!query) {
        outputBox.classList.remove("show");
        return;
    }

    const results = mockAPISearch(query);
    if (results.length === 0) {
        outputBox.classList.add("show");
        const noItem = document.createElement("li");
        noItem.textContent = "No results found.";
        noItem.classList.add("no_result");
        resultsContainer.appendChild(noItem);
        return;
    }

    outputBox.classList.add("show");
    results.forEach(name => {
        resultsContainer.innerHTML += `<li>
            <div class="music_icn"><img src="svg/music.svg" class="invert"></div>
            <div class="music_text02"><p class="trackk">${name}</p></div>
        </li>`;
    });

    resultsContainer.querySelectorAll("li").forEach(e => {
        e.addEventListener("click", () => playMusic(e.querySelector(".trackk").textContent.trim()));
    });
}

const debouncedSearch = debounce(handleSearch, 200);
document.getElementById("search_input").addEventListener("input", debouncedSearch);

// ------------------ Main Function ------------------

async function main() {
    await fetchSongsJSON();
    await displayAlbums();

    // Load default "All" folder if exists
    if (allSongsData["All_songs"]) {
        songs = await getSongs("songs/All_songs");
    }

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "svg/play.svg"
        }
        else {
            currentSong.pause()
            play.src = "svg/play1.svg"
        }
    })

    currentSong.addEventListener("play", () => {
        document.querySelector(".equalizer")?.classList.remove("paused");
    });

    currentSong.addEventListener("pause", () => {
        document.querySelector(".equalizer")?.classList.add("paused");
    });



    currentSong.addEventListener("timeupdate", () => {
        document.getElementById("start_timing").textContent = formatTime(currentSong.currentTime);
        document.getElementById("music_seekbar").value = Math.floor(currentSong.currentTime);
    });

    currentSong.addEventListener("loadedmetadata", () => {
        document.getElementById("timing").textContent = formatTime(currentSong.duration);
        document.getElementById("music_seekbar").max = Math.floor(currentSong.duration);
    });

    document.getElementById("music_seekbar").addEventListener("input", e => {
        currentSong.currentTime = e.target.value;
    });

    document.getElementById("previous")?.addEventListener("click", () => {
        const index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").pop()));
        if (index > 0) playMusic(songs[index - 1]);
    });

    document.getElementById("next")?.addEventListener("click", () => {
        const index = songs.indexOf(decodeURIComponent(currentSong.src.split("/").pop()));
        if (index < songs.length - 1) playMusic(songs[index + 1]);
    });

    const volumeInput = document.getElementById("volume");
    volumeInput?.addEventListener("input", e => currentSong.volume = e.target.value);

    document.getElementById("volume_icon")?.addEventListener("click", e => {
        const vol = volumeInput;
        if (e.target.src.includes("svg/volumeFull.svg")) {
            e.target.src = "svg/volumeZero.svg"; currentSong.volume = 0; vol.value = 0;
        } else if (e.target.src.includes("svg/volumeZero.svg")) {
            e.target.src = "svg/volumeHalf.svg"; currentSong.volume = 0.1; vol.value = 0.1;
        } else {
            e.target.src = "svg/volumeFull.svg"; currentSong.volume = 1; vol.value = 1;
        }
    });

    // Hamburger toggle
    let isMenuOpen = false;
    document.querySelector(".hameburger")?.addEventListener("click", () => {
        const menu = document.querySelector(".first_coloum");
        menu.style.left = isMenuOpen ? "-120%" : "0";
        isMenuOpen = !isMenuOpen;
    });

    // Profile image modal
    const profileImage = document.querySelector('.login img');
    const imageSec = document.getElementById('image_open_sec');
    const crose = document.getElementById('crose');

    profileImage?.addEventListener('click', () => imageSec.classList.add('show'));
    crose?.addEventListener('click', () => imageSec.classList.remove('show'));
}

main();


// ------------------ Click Me Toast ------------------

window.addEventListener("load", () => {
    const clickMeElements = document.querySelectorAll(".click_me");

    clickMeElements.forEach((clickMe) => {
        clickMe.classList.add("show");
        setTimeout(() => {
            clickMe.classList.remove("show");
        }, 4000);
    });
});



// // Mobile search toggle
// const searchIcon = document.getElementById("search_icon");
// const searchInput = document.getElementById("search_input");
// const searchContainer = document.querySelector(".serch_container");
// const serchLogo = document.querySelector(".serch_logo");
// const bell = document.querySelector(".bell");

// searchIcon.addEventListener("click", () => {
//     searchContainer.classList.toggle("active");
//     if (searchContainer.classList.contains("active")) {
//         searchInput.focus();
//         serchLogo.style.display = 'none'
//         bell.style.display = 'none'
//     } else {
//         searchInput.value = "";
//     }
// });

// // When input is cleared, reset to normal
// searchInput.addEventListener("input", () => {
//     if (searchInput.value.trim() === "") {
//         searchContainer.classList.remove("active");
//         serchLogo.style.display = 'block'
//         bell.style.display = 'block'
//     }
// });











/*


*/