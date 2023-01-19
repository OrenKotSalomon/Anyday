export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getColorHex
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300){
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getColorHex(color) {
    switch (color) {
        case 'grass_green': return '#037f4c'
        case 'done-green': return '#00c875'
        case 'bright-green': return '#9cd326'
        case 'saladish': return '#cab641'
        case 'egg_yolk': return '#ffcb00'
        case 'working_orange': return '#fdab3d'
        case 'dark-orange': return '#ff642e'
        case 'peach': return '#ffadad'
        case 'sunset': return '#ff7575'
        case 'stuck-red': return '#e2445c'
        case 'dark-red': return '#bb3354'
        case 'sofia_pink': return '#ff158a'
        case 'lipstick': return '#ff5ac4'
        case 'bubble': return '#faa1f1'
        case 'purple': return '#a25ddc'
        case 'dark_purple': return '#784bd1'
        case 'berry': return '#7e3b8a'
        case 'dark_indigo': return '#401694'
        case 'indigo': return '#5559df'
        case 'navy': return '#225091'
        case 'bright-blue': return '#579bfc'
        case 'dark-blue': return '#0086c0'
        case 'aquamarine': return '#4eccc6'
        case 'chili-blue': return '#66ccff'
        case 'river': return '#68a1bd'
        case 'winter': return '#9aadbd'
        case 'explosive': return '#c4c4c4'
        case 'american_gray': return '#808080'
        case 'blackish': return '#333333'
        case 'brown': return '#7f5347'
        case 'orchid': return '#d974b0'
        case 'tan': return '#ad967a'
        case 'sky': return '#a1e3f6'
        case 'coffee': return '#bd816e'
        case 'royal': return '#2b76e5'
        case 'teal': return '#175a63'
        case 'lavender': return '#bda8f9'
        case 'steel': return '#a9bee8'
        case 'lilac': return '#9d99b9'
        case 'pecan': return '#563e3e'
    }
}