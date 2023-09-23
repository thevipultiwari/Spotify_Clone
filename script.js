console.log("Welcome to Spotify");

let songIndex = 0;
let isPlaying = false;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Let Me Love You", duration: "05:34", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Perfect", duration: "04:23", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Treat You Better", duration: "03:07", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Something Just Like This", duration: "04:07", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Titanium", duration: "04:06", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Waiting For Love", duration: "03:50", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Paradise", duration: "04:38", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Faded", duration: "03:32", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Not Afraid", duration: "04:08", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "In My Blood", duration: "03:31", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

let totalSongs = songs.length;

function initializeAudio(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
}

function togglePlay() {
    if (isPlaying) {
        audioElement.pause();
    } else {
        audioElement.play();
    }
    isPlaying = !isPlaying;
    updatePlayButton();
}

function updatePlayButton() {
    if (isPlaying) {
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}

function updateProgressBar() {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
}

masterPlay.addEventListener('click', togglePlay);
audioElement.addEventListener('timeupdate', updateProgressBar);

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

function playSong(index) {
    initializeAudio(index);
    togglePlay();
}

songItems.forEach((songItem, index) => {
    const songImage = songItem.querySelector('img');
    songImage.addEventListener('click', () => {
        playSong(index);
    });

    const songPlayIcon = songItem.querySelector('.songItemPlay');
    songPlayIcon.addEventListener('click', () => {
        playSong(index);
    });
});

initializeAudio(songIndex);

function playNextSong() {
    songIndex = (songIndex -1) % totalSongs;
    initializeAudio(songIndex);
    togglePlay();
}

function playPreviousSong() {
    songIndex = (songIndex + 1 + totalSongs) % totalSongs;
    initializeAudio(songIndex);
    togglePlay();
}

document.getElementById('next').addEventListener('click', playNextSong);
document.getElementById('previous').addEventListener('click', playPreviousSong);

