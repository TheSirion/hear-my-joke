const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeText = document.getElementById('joke-text');

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
}

// Pass joke to the VoiceRSS API
const tellJoke = (joke) => {
  console.log('tell me:', joke);
  VoiceRSS.speech({
    key: 'ce958fbc3100476eaf11c97a6b507ed4',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get joke text and display it
const getJokeText = (joke) => {
  jokeText.innerText = joke;
}

// get jokes from Joke API
const getJoke = async () => {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,racist,sexist'
  try {
    const fetchJoke = await fetch(apiUrl);
    const response = await fetchJoke.json();
    
    if (response.setup) {
      joke = `${response.setup} ... ${response.delivery}`;
    } else {
      joke = `${response.joke}`;
    }
    // Text-to-speech
    tellJoke(joke);
    // joke text
    getJokeText(joke);
    // disable button
    toggleButton();
  } catch (error) {
    console.error('opa!', error);
  }
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);