// DRUM KIT

const drumKeys = document.querySelectorAll('.key')

function playDrumKey(e) {
    let key = e.target
    if (!(key.classList.contains('key'))) {
        key.parentNode.classList.toggle('playing')
        key.classList.toggle('playing')
    }
    key.classList.toggle('playing')
}

function removeTransition (e) {
    if (e.propertyName !== 'transform') return
    this.classList.remove('playing')
}

drumKeys.forEach(e => {
    e.addEventListener('click', playDrumKey)
    e.addEventListener('transitionend', removeTransition)
})

function drumPlay (e) {
    const audio = document.querySelector(`audio[data-key='${e.keyCode}']`)
    const key = document.querySelector(`.key[data-key='${e.keyCode}']`)
    if (!audio) return
    audio.currentTime = 0
    audio.play()
    key.classList.add('playing')
}

window.addEventListener('keydown', drumPlay)
