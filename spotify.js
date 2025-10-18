// console.log(" Script is Working!")

// let currentSong = new Audio();
// let songs = [];
// let currFolder;

// function formatTime(seconds) {
//     let hours = Math.floor(seconds / 3600);
//     let minutes = Math.floor((seconds % 3600) / 60);
//     let secs = Math.floor(seconds % 60); // Ensure no milliseconds

//     // Ensure two-digit format
//     hours = String(hours).padStart(2, '0');
//     minutes = String(minutes).padStart(2, '0');
//     secs = String(secs).padStart(2, '0');

//     return hours === "00" ? `${minutes}:${secs}` : `${hours}:${minutes}:${secs}`;
// }

// async function getSongs(folder) {
//     currFolder = folder;
//     let songsApi = await fetch(`http://127.0.0.1:5502/${folder}/`)
//     let responce = await songsApi.text();
//     let div = document.createElement("div")
//     div.innerHTML = responce;
//     let as = div.getElementsByTagName("a")
//     songs = []
//     for (let i = 0; i < as.length; i++) {
//         const element = as[i];
//         if (element.href.endsWith(".mp3")) {
//             songs.push(element.href.split(`/${folder}/`)[1])
//         }
//     }
//     let songUl = document.querySelector(".songs ul");
//     songUl.innerHTML = ""
//     for (const song of songs) {
//         songUl.innerHTML = songUl.innerHTML + `<li>
//                             <div class="music_icn">
//                                 <img src="svg/music.svg" alt="" class="invert">
//                             </div>
//                             <div class="music_text">
//                                 <p class = "trackk">${song.replaceAll("%20", " ")}</p>
//                             </div>
//                                 <img src="svg/pllay.svg" alt="" class="invert">
//                         </li>`;
//     }

//     Array.from(document.querySelector(".songs").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", () => {
//             playMusic(e.querySelector(".trackk").innerHTML.trim())
//         })
//     });

//     return songs;
// }

// // function iconSwitch() {
// //     document.querySelectorAll('.song ul li').forEach(e => {
// //         e.addEventListener("click", e => {
// //             console.log("clicked")
// //             console.log(e.target)
// //         });
// //     })
// //     // playIcon.src = "play1.svg"
// // }

// const playMusic = (track, pause = false) => {
//     currentSong.src = `http://127.0.0.1:5502/${currFolder}/` + track;
//     if (!pause) {
//         currentSong.play();
//         play.src = "svg/play.svg"
//     }

//     // iconSwitch();
//     document.querySelector(".song_tittle").getElementsByTagName("p")[0].innerHTML = decodeURI(track)
//     document.querySelector("#start_timing").innerHTML = "00:00"
//     document.querySelector("#timing").innerHTML = "00:00"
// }

// async function displayAlbums() {
//     let songsApi = await fetch(`http://127.0.0.1:5502/songs/`)
//     let responce = await songsApi.text();
//     let div = document.createElement("div")
//     div.innerHTML = responce;
//     let songSec = document.querySelector(".song_sec")
//     let anchors = div.getElementsByTagName("a")
//     let array = Array.from(anchors)
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index];
//         if (e.href.includes("/songs/")) {
//             let folder = e.href.split("/").slice(-1)[0]
//             // Get metadat of the data
//             let songsApi = await fetch(`http://127.0.0.1:5502/songs/${folder}/info.json`)
//             let responce = await songsApi.json();
//             songSec.innerHTML = songSec.innerHTML + `<div data-folder="${folder}" class="secnd_song song">
//              <div class="play_btn">
//                                 <i class="fa-solid fa-play"></i>
//                             </div>
//                             <img src="songs/${folder}/cover.jpg" alt="">
//                             <div class="txt">
//                                 <h3>${responce.tittle}</h3>
//                                 <p>${responce.description}</p>
//                             </div>
//                             </div>`
//         }
//     }

//     //Load playlist
//     Array.from(document.getElementsByClassName("song")).forEach(element => {
//         element.addEventListener("click", async item => {
//             songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`);
//         })
//     });
// }

// async function main() {

//     songs = await getSongs("songs/All");
//     playMusic(songs[0], true)

//     // Display all Albums....
//     displayAlbums()

//     play.addEventListener("click", () => {
//         if (currentSong.paused) {
//             currentSong.play()
//             play.src = "svg/play.svg"
//         }
//         else {
//             currentSong.pause()
//             play.src = "svg/play1.svg"
//         }
//     })

//     // FOR SONGS TIMING UPDATES
//     currentSong.addEventListener('timeupdate', () => {
//         document.querySelector('#start_timing').innerHTML = formatTime(currentSong.currentTime)
//     })
//     currentSong.addEventListener('loadedmetadata', () => {
//         document.querySelector('#timing').innerHTML = formatTime(currentSong.duration)
//     })
//     // For song timing update seekbar
//     const seekbar = document.getElementById('music_seekbar');
//     // Update seekbar duration
//     currentSong.addEventListener('loadedmetadata', () => {
//         seekbar.max = Math.floor(currentSong.duration);
//     });
//     // Update seekbar as song current time
//     currentSong.addEventListener('timeupdate', () => {
//         seekbar.value = Math.floor(currentSong.currentTime);
//     });
//     // song current timing update as input
//     seekbar.addEventListener('input', () => {
//         currentSong.currentTime = seekbar.value;
//     });

//     //Hameburger togle
//     let isMenuOpen = false;
//     document.querySelector(".hameburger").addEventListener("click", () => {
//         let menu = document.querySelector(".first_coloum");
//         menu.style.left = isMenuOpen ? "-120%" : "0";
//         isMenuOpen = !isMenuOpen;
//     });
//     // Previous song functionality
//     document.getElementById("previous").addEventListener("click", () => {
//         let index = songs.indexOf(decodeURI(currentSong.src.split("/").pop()));
//         if (index > 0) playMusic(songs[index - 1]);
//     });
//     // Next song functionality
//     document.getElementById("next").addEventListener("click", () => {
//         let index = songs.indexOf(decodeURI(currentSong.src.split("/").pop()));
//         if (index < songs.length - 1) playMusic(songs[index + 1]);
//     });
//     // Volume control
//     document.querySelector("#volume").addEventListener("input", (e) => {
//         currentSong.volume = e.target.value;
//     });
//     // Set volume & Mute button
//     document.querySelector("#volume_icon").addEventListener("click", e => {
//         let volumeValue = document.querySelector(".third input")
//         if (e.target.src.includes("svg/volumeFull.svg")) {
//             e.target.src = 'svg/volumeZero.svg'
//             currentSong.volume = 0
//             volumeValue.value = 0
//         } else if (e.target.src.includes("svg/volumeZero.svg")) {
//             e.target.src = "svg/volumeHalf.svg"
//             currentSong.volume = .1
//             volumeValue.value = .1
//         } else {
//             e.target.src = "svg/volumeFull.svg"
//             currentSong.volume = 1
//             volumeValue.value = 1
//         }
//     })

//     // Image Open.....................

//     let profileImage = document.querySelector('.login img')
//     let imageSec = document.querySelector('#image_open_sec')
//     let crose = document.querySelector('#crose')

//     profileImage.addEventListener('click', () => {
//         imageSec.classList.add('show')
//     })
//     crose.addEventListener('click', () => {
//         imageSec.classList.remove('show')
//     })


// }


// main()




// // For searching with debauncing_____________________________________________

// // Step 1: Debounce function
// function debounce(func, delay) {
//     let timer;
//     return function (...args) {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }

// // Step 2: Fake API search
// function mockAPISearch(query) {
//     return songs.filter(name =>
//         name.toLowerCase().includes(query.toLowerCase())
//     );
// }

// // Step 3: Search logic
// function handleSearch(event) {
//     const query = event.target.value.trim();
//     const resultsContainer = document.getElementById("search_output_ul");
//     const outputBox = document.querySelector(".search_output");
//     resultsContainer.innerHTML = "";

//     if (query.length === 0) {
//         outputBox.classList.remove("show");
//         return;
//     }

//     const results = mockAPISearch(query);

//     if (results.length === 0) {
//         outputBox.classList.add("show");
//         const noItem = document.createElement("li");
//         noItem.textContent = "No results found.";
//         noItem.classList.add("no_result");
//         resultsContainer.appendChild(noItem);
//         return;
//     }

//     outputBox.classList.add("show");

//     results.forEach(name => {
//         resultsContainer.innerHTML += `<li>
//             <div class="music_icn">
//                 <img src="svg/music.svg" alt="" class="invert">
//             </div>
//             <div class="music_text">
//                 <p class="trackk">${name}</p>
//             </div>
//             <img src="svg/pllay.svg" alt="" class="invert">
//         </li>`;
//     });
//     document.querySelector('#search_output_ul').addEventListener('click', e => {
//         if (e.target.innerHTML.endsWith('.mp3')) {
//             playMusic(e.target.innerHTML)
//         }
//     })
// }

// // Step 4: Debounced event listener
// const debouncedSearch = debounce(handleSearch, 500);
// document.getElementById("search_input").addEventListener("input", debouncedSearch);



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



// // click me tost...............

// window.addEventListener("load", () => {
//     const clickMe = document.getElementById("click_me");
//     clickMe.classList.add("show");
//     setTimeout(() => {
//         clickMe.classList.remove("show");
//     }, 4000);
// });









console.log("Script is Working!");

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
                <img src="svg/pllay.svg" alt="" class="invert">
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
            <div class="music_text"><p class="trackk">${name}</p></div>
            <img src="svg/pllay.svg" class="invert">
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
    if (allSongsData["All"]) {
        songs = await getSongs("songs/All");
        if (songs.length > 0) playMusic(songs[0], true);
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


window.addEventListener("load", () => {
    const clickMe = document.getElementById("click_me");
    clickMe.classList.add("show");
    setTimeout(() => {
        clickMe.classList.remove("show");
    }, 4000);
});