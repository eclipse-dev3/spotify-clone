//
console.log(" Script is Working!")

let currentSong = new Audio();
let songs = [];
let currFolder;

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60); // Ensure no milliseconds

    // Ensure two-digit format
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    secs = String(secs).padStart(2, '0');

    return hours === "00" ? `${minutes}:${secs}` : `${hours}:${minutes}:${secs}`;
}

async function getSongs(folder) {
    currFolder = folder;
    // let songsApi = await fetch(`http://127.0.0.1:5500/spotify/${folder}/`)
    let songsApi = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let responce = await songsApi.text();
    // console.log(responce)
    let div = document.createElement("div")
    div.innerHTML = responce;
    let as = div.getElementsByTagName("a")
    // console.log(as)
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            // songs.push(element.href.split(`/spotify/${folder}/`)[1])
            songs.push(element.href.split(`/${folder}/`)[1])
        }
    }
    let songUl = document.querySelector(".songs ul");
    songUl.innerHTML = ""
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>
                            <div class="music_icn">
                                <img src="music.svg" alt="" class="invert">
                            </div>
                            <div class="music_text">
                                <p class = "trackk">${song.replaceAll("%20", " ")}</p>
                            </div>
                                <img src="pllay.svg" alt="" class="invert">
                        </li>`;
    }

    Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            // console.log(e.querySelector(".trackk").innerHTML)
            playMusic(e.querySelector(".trackk").innerHTML.trim())
        })
    });

    return songs;
}

function iconSwitch() {
    // let playIcon = document.querySelectorAll('li img:nth-of-type(2)')
    document.querySelectorAll('.song ul li').forEach(e => {
        e.addEventListener("click", e => {
            console.log("clicked")
            console.log(e.target)
        });
    })

    // playIcon.src = "play1.svg"
}

const playMusic = (track, pause = false) => {
    // currentSong.src = `http://127.0.0.1:5500/spotify/${currFolder}/` + track;
    currentSong.src = `http://127.0.0.1:5500/${currFolder}/` + track;
    if (!pause) {
        currentSong.play();
        play.src = "play.svg"
    }
    iconSwitch();
    document.querySelector(".song_tittle").getElementsByTagName("p")[0].innerHTML = decodeURI(track)
    document.querySelector(".time1").innerHTML = "00:00"
    document.querySelector(".time2").innerHTML = "00:00"
}

async function displayAlbums() {
    // let songsApi = await fetch(`http://127.0.0.1:5500/spotify/songs/`)
    let songsApi = await fetch(`http://127.0.0.1:5500/songs/`)
    let responce = await songsApi.text();
    let div = document.createElement("div")
    div.innerHTML = responce;
    let song_sec = document.querySelector(".song_sec")
    let anchors = div.getElementsByTagName("a")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-1)[0]
            // Get metadat of the data
            // let songsApi = await fetch(`http://127.0.0.1:5500/spotify/songs/${folder}/info.json`)
            let songsApi = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
            let responce = await songsApi.json();
            // console.log(responce)
            song_sec.innerHTML = song_sec.innerHTML + `<div data-folder="${folder}" class="secnd_song song">
             <div class="play_btn">
                                <i class="fa-solid fa-play"></i>
                            </div>
                            <img src="songs/${folder}/cover.jpg.jpg" alt="">
                            <div class="txt">
                                <h3>${responce.tittle}</h3>
                                <p>${responce.description}</p>
                            </div>
                            </div>`
        }
    }

    //Load playlist
    Array.from(document.getElementsByClassName("song")).forEach(element => {
        element.addEventListener("click", async item => {
            // console.log(element)
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
        })
    });
}

async function main() {

    // songs = await getSongs("songs/YoYo");
    songs = await getSongs("songs/YoYo");
    playMusic(songs[0], true)

    // Display all Albums....
    displayAlbums()

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "play.svg"
        }
        else {
            currentSong.pause()
            play.src = "play1.svg"
        }
    })

    // Update song time display
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".time1").innerText = formatTime(currentSong.currentTime);
        // document.querySelector(".time2").innerText = formatTime(currentSong.duration);
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    currentSong.addEventListener("loadedmetadata", () => {
        document.querySelector(".time2").innerText = formatTime(currentSong.duration);
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })

    //Hameburger togle
    let isMenuOpen = false;
    document.querySelector(".hameburger").addEventListener("click", () => {
        let menu = document.querySelector(".first_coloum");
        menu.style.left = isMenuOpen ? "-120%" : "0";
        isMenuOpen = !isMenuOpen;
    });

    // Previous song functionality
    document.getElementById("previous").addEventListener("click", () => {
        let index = songs.indexOf(decodeURI(currentSong.src.split("/").pop()));
        if (index > 0) playMusic(songs[index - 1]);
    });

    // Next song functionality
    document.getElementById("next").addEventListener("click", () => {
        let index = songs.indexOf(decodeURI(currentSong.src.split("/").pop()));
        if (index < songs.length - 1) playMusic(songs[index + 1]);
    });

    // Volume control
    document.querySelector(".volume input").addEventListener("input", (e) => {
        // console.log("volume ---> ", e.target.value, "/ 1")
        currentSong.volume = e.target.value;
    });

    // Set volume & Mute button
    document.querySelector(".volume>img").addEventListener("click", e => {
        let volumeValue = document.querySelector(".volume input")
        if (e.target.src.includes("volumeHalf.svg")) {
            e.target.src = e.target.src.replace("volumeHalf.svg", "volumeZero.svg")
            currentSong.volume = 0
            volumeValue.value = 0
        }

        else {
            e.target.src = e.target.src.replace("volumeZero.svg", "volumeHalf.svg")
            currentSong.volume = .1
            volumeValue.value = .1
        }
        // if (volumeValue.value = "1") {
        //     e.target.src = e.target.src.replace("volumeHalf.svg", "volumeFull.svg")
        // }
    })
}

main()