const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const img = document.querySelector("img");
const title = document.getElementById('title');
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

//music 
const songs = [
    {
        name:"jacinto-1",
        displayName:'Electric Chill Machine ',
        artist: 'mohanad design'
    },
    {
        name:"jacinto-2",
        displayName:'seven nation army "remix" ',
        artist: 'mohanad design'
    },
    {
        name:'jacinto-3',
        displayName:'Electric Chill Machine ',
        artist: 'mohanad design'
    },
   
]
// Check If playing 
let isPlaying = false;

//play
function playSong() {
    isPlaying = true;
    //html method and js function
    music.play();
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute('title','pause')
    console.log(music.duration);

}

// pause
function pauseSong() {
    isPlaying = false;
 //html method and js function
    music.pause();
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute('title','play')


}

// Play Or Pause Event Listner
playBtn.addEventListener('click',()=> isPlaying?pauseSong():playSong());

//updating Dom 
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src =  `img/${song.name}.jpg`;

}
// cuurent Song 
 let songIndex = 0;
// Next Song
 function nextSong() {
    songIndex>=songs.length-1?songIndex=0:songIndex++;

     

     loadSong(songs[songIndex])
     playSong();
 }
 function prevSong() {
     songIndex--
    if (songIndex<0) {
        songIndex= songs.length-1;
    }
     loadSong(songs[songIndex])
     playSong();
 }

//onload - Select First Song
loadSong(songs[songIndex]);

//Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        
        const {duration,currentTime} =e.srcElement;
        //Update Progress Bar 
        const progressPercent = (currentTime/duration)*100;
        progress.style.width=`${progressPercent}%` ;
        //Calcuate display for duration
        let durationMinutes =Math.floor(duration/60) ;
        let durationSeconds = Math.floor(duration%60);
        
        if (durationSeconds<10){

            durationSeconds = ` 0${durationSeconds} `
        }

        
        //dealy switching duration to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

    }
    //calcuate display for current
    let currentTime = Math.floor(e.srcElement.currentTime);
    let currentMinutes =Math.floor(currentTime/60) ;
    let currentSeconds = Math.floor(currentTime%60);

    if (currentSeconds<10){

        currentSeconds = ` 0${currentSeconds} `
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
}

//set progress bar 
function setProgressBar (e) { 
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration
    console.log(e);
    console.log(clickX);
   
 }
// Event Listners
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
music.addEventListener("ended",nextSong);
