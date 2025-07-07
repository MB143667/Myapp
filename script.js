let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-image");
let playPauseImg = document.querySelector("#play-pause")
let volumeRange = document.querySelector("#volume-range")
let volSvg = document.querySelector("#vol-svg")
let songRange = document.querySelector("#song-duration");
let musicAnim = document.querySelector("#musicanim");
let playlistImg = document.querySelector("#playlist-img");
let playlist = document.querySelector(".playlist");
let playlistSong = document.querySelectorAll(".playlist-song");


let index = 0;
let playingSong = false
let track = document.createElement("audio");


let songs = [
    {
        name: "To Phir Aao",
        path: "./songs/to-phir-aao.mp3",
        image: "./images/music_1.jpg",
        singer: "Imran Hashmi"
    },
    {
        name: "Am So Lonely",
        path: "./songs/am-so-lonely.mp3",
        image: "./images/music_3.jpeg",
        singer: "Moon Light"
    },
    {
        name: "Dil Ibadat Kr Rha Ha",
        path: "./songs/dilibadat.mp3",
        image: "./images/music_2.avif",
        singer: "Imran Hashmi"
    },
    {
        name: "Russian Bandana",
        path: "./songs/russian.mp3",
        image: "./images/music-girl.jpg",
        singer: "Moon Light"
    },
    {
        name: "Saiyara Ma Saiyara",
        path: "./songs/saiyara.mp3",
        image: "./images/music_5.jpg",
        singer: "Moon Light"
    }
]

function loadTrack(index) {
    track.src = songs[index].path;
    songName.innerHTML = songs[index].name;
    songSinger.innerHTML = songs[index].singer;
    songImage.style = `background-image:url(${songs[index].image});`

    volume();
    duration();
    setInterval(() => {
        songRange.max = track.duration;
        songRange.value = track.currentTime;
    }, 1000);
    track.loop = true;
    track.load();
}
initialPlay();
loadTrack(index);

function initialPlay() {
    volumeRange.value = 0;
    songRange.value = 0;
    track.volume = 0;
    volSvg.src = "./Svgs/mute.svg";

}

function playPause() {
    if (playingSong === false) {
        playSong();
    } else {
        pauseSong();
    }
}

function playSong() {
    track.currentTime = 0;
    track.play();
    playingSong = true;
    playPauseImg.src = "./Svgs/pause.svg";
    musicAnim.style.display = "block";
}

function pauseSong() {
    track.pause();
    playingSong = false;
    playPauseImg.src = "./Svgs/play.svg";
    musicAnim.style.display = "none";
}

function nextSong() {
    if (index < songs.length - 1) {
        index++;
        loadTrack(index);
        track.currentTime = 0;
        playSong();
    } else {
        index = 0;
        loadTrack(index);
        track.currentTime = 0;
        playSong();
    }
}
function previousSong() {
    if (index > 0) {
        index--;
        loadTrack(index);
        playSong();
    } else {
        index = songs.length - 1;
        loadTrack(index);
        playSong();
    }
}

function volume() {
    track.volume = volumeRange.value / 100;
    if (volumeRange.value == 0) {
        volSvg.src = "./Svgs/mute.svg";
    } else {
        volSvg.src = "./Svgs/volume.svg";
    }
}

function duration() {
    track.currentTime = songRange.value;
}

playlistImg.addEventListener("click", () => {
    playlist.classList.toggle("playlist-active");
    if (playlist.classList.contains("playlist-active")) {
        playlistImg.src = "./Svgs/close.svg";
    } else {
        playlistImg.src = "./Svgs/playlist.svg";
    }
});

playlistSong.forEach((song, index) => {
    song.addEventListener("click", () => {
        loadTrack(index);
        playSong();
        playlist.classList.remove("playlist-active");
        playlistImg.src = "./Svgs/playlist.svg"
    })
})