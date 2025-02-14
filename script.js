// Photo and Video Logic
const photoCards = document.querySelectorAll('.photo-card');
let currentSong = null;
let songTimeout = null;

photoCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('active');

    // Handle video playback
    const video = card.querySelector('video');
    if (video) {
      if (card.classList.contains('active')) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }

    // Handle songs
    const songId = card.getAttribute('data-song').replace('.mp3', '');
    const song = document.getElementById(songId);

    if (card.classList.contains('active')) {
      if (currentSong && currentSong !== song) {
        currentSong.pause();
        currentSong.currentTime = 0;
      }
      song.play();
      currentSong = song;

      // Ensure the song plays for at least 20 seconds
      if (songTimeout) {
        clearTimeout(songTimeout);
      }
      songTimeout = setTimeout(() => {
        songTimeout = null;
      }, 20000); // 20 seconds
    } else {
      // Delay pausing the song if it hasn't played for 20 seconds yet
      if (songTimeout) {
        setTimeout(() => {
          if (currentSong === song && !card.classList.contains('active')) {
            song.pause();
            song.currentTime = 0;
            currentSong = null;
          }
        }, 20000 - song.currentTime * 1000); // Remaining time to 20 seconds
      } else {
        song.pause();
        song.currentTime = 0;
        currentSong = null;
      }
    }
  });
});

// Background Music Logic
const backgroundMusic = document.getElementById('background-music');
backgroundMusic.volume = 0.1; // Set volume to 10%
backgroundMusic.play();

// Special Button Logic
const specialButton = document.getElementById('special-button');
specialButton.addEventListener('click', () => {
  const newWindow = window.open('', '_blank', 'width=400,height=400');
  newWindow.document.write(`
    <html>
    <head>
    <title>Surprise!</title>
    <style>
    body{
    font-family:itelic;
    background-color:pink;
    }
    </style>
    </head>
    <body>
    <h2>मां और पिता धरती पर भगवान के स्वरूप हैं ईश्वर <br>
     इस जोड़ी को जन्म जन्मांतर तक सलामत रखे ... <br>
कहते हैं माता पिता से बढ़कर और कुछ भी नहीं, ... <br>
आपने मुझे जनम दिया, ...<br>
बरगद के जैसा परिवार है मेरा ...<br>
थामे एक-दूजे का हाथ, ...</h2>
    </body>
    </html>
  `);
});


