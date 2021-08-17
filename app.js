const drumKeys = document.querySelectorAll('.key')
const fullScreen = document.querySelector('.fullscreen')
const drumBtn = document.getElementById('drumBtn')
const pianoBtn = document.getElementById('pianoBtn')
const drumSection = document.getElementById('drumSection')
const pianoSection = document.getElementById('pianoSection')
const piano = document.querySelector('.piano')
const pianoКeys = document.querySelectorAll('.piano-key')
const bts = document.querySelector('.btn-container')
const notesLetters = document.querySelectorAll('.btn')

// DRUM KIT

function playDrumKey(e) {
    const key = e.target
    const audio = document.getElementById(key.dataset.note);
    if (!(key.classList.contains('key'))) {
        key.parentNode.classList.toggle('playing')
        key.classList.toggle('playing')
    }
    key.classList.toggle('playing')
    audio.currentTime = 0;
    audio.play()
}

function removeTransition (e) {
    if (e.propertyName !== 'transform') return
    this.classList.remove('playing')
}

drumKeys.forEach(key => {
    key.addEventListener('click', playDrumKey)
    key.addEventListener('transitionend', removeTransition)
    window.addEventListener('keydown', drumPlay)
})

function drumPlay (e) {
    if (!(drumSection.classList.contains('inactive'))) {
        const audio = document.querySelector(`audio[data-key='${e.keyCode}']`)
        const key = document.querySelector(`.key[data-key='${e.keyCode}']`)
        if (!audio) return
        audio.currentTime = 0
        audio.play()
        key.classList.add('playing')
    }
}


// Piano Kit

pianoКeys.forEach(key => {
    key.addEventListener('mousedown', playAudio);
});

function playAudio(e) {
    if (pianoSection.classList.contains('active')) {
        let key = e.target;
        let note = document.getElementById(`${key.dataset.note}p`);
        key.classList.add('active');
        note.currentTime = 0;
        note.play();
        note.addEventListener('ended', () => {
            key.classList.remove('active');
        });
    }
};

function keyPlay(e) {
    if (pianoSection.classList.contains('active')) {
        const audio = document.querySelector(`audio[data-kay="${e.keyCode}"]`);
        const key = document.querySelector(`.piano-key[data-kay="${e.keyCode}"]`);
        if (!key) return;
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        key.classList.add('activ');
    }
};

function removTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('activ');
};

pianoКeys.forEach(key => {
    key.addEventListener('transitionend', removTransition);
    window.addEventListener('keydown', keyPlay);
});



bts.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn')) {
        notesLetters.forEach((el) => {
        if(el.classList.contains('btn-active')) {
          el.classList.remove('btn-active');
        }
      });
      event.target.classList.add('btn-active');
    }
    if (event.target.classList.contains('btn-letters')) {
        pianoКeys.forEach(key => {
            key.classList.add('letter')
        });
    }
    if (event.target.classList.contains('btn-notes')) {
        pianoКeys.forEach(key => {
            key.classList.remove('letter')
        });
    }
});

const startPlay = (e) => {
    if (pianoSection.classList.contains('active')) {
        let a = e.target;
        a.classList.add('activ');
        let note = document.getElementById(`${a.dataset.note}p`);
        note.currentTime = 0;
        note.play();
    }
};

const stopPlay = (e) => {
    e.target.classList.remove('activ')
};

const enter = (event) => {
    event.target.classList.add('activ');
    pianoКeys.forEach((e) => {
        e.addEventListener('mouseover', startPlay);
        e.addEventListener('mouseout', stopPlay);
    })
}

const leave = () => {
    pianoКeys.forEach((e) => {
        e.classList.remove('activ');
        e.removeEventListener('mouseover', startPlay);
        e.removeEventListener('mouseout', stopPlay);
    })
}

piano.addEventListener('mousedown', enter, false);
piano.addEventListener('mouseup', leave);






function toggleScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.fullscreenEnabled) {
            document.exitFullscreen();
        }
    }
};

fullScreen.addEventListener('click', toggleScreen);

function toggleDrum() {
    drumSection.classList.remove('inactive')
    pianoSection.classList.remove('active')
}

function togglePiano() {
    drumSection.classList.add('inactive')
    pianoSection.classList.add('active')
}

drumBtn.addEventListener('click', toggleDrum)
pianoBtn.addEventListener('click', togglePiano)