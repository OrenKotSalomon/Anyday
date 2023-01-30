export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getColorHex,
  time_ago
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

function debounce(func, timeout = 500) {
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

function time_ago(time) {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 's', 1], // 60
    [120, '1 m', '1 m'], // 60*2
    [3600, 'm', 60], // 60*60, 60
    [7200, '1 h', '1 h'], // 60*60*2
    [86400, 'h', 3600], // 60*60*24, 60*60
    [172800, 'd', 'Tomorrow'], // 60*60*24*2
    [604800, 'd', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'w', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'w', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'm', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'm', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'y', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = '',
    list_choice = 1;
  // if (seconds < 30) {
  //   return 'Just now'
  // }
  // if (seconds < 0) {
  //   seconds = Math.abs(seconds);
  //   token = 'from now';
  //   list_choice = 2;
  // }
  var i = 0,
    format;
  while (format = time_formats[i++])
    if (seconds < format[0]) {
      if (typeof format[2] == 'string')
        return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
    }
  return time;
}