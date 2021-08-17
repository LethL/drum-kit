// DRUM KIT

const drumKeys = document.querySelectorAll('.key')

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
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`)
    const key = document.querySelector(`.key[data-key='${e.keyCode}']`)
    if (!audio) return
    audio.currentTime = 0
    audio.play()
    key.classList.add('playing')
}
