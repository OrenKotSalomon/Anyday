import { storageService } from './async-storage.service'
import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeImage
}

window.userService = userService


function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}



async function getById(userId) {
    // const user = await storageService.get('user', userId)
    const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    // return storageService.remove('user', userId)
    return httpService.delete(`user/${userId}`)
}

async function update({ _id, imgUrl }) {
    // const user = await storageService.get('user', _id)
    // user.score = score
    // await storageService.put('user', user)

    const user = await httpService.put(`user/${_id}`, { _id, imgUrl })
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    try {
        // const users = await storageService.query('user')
        // const user = users.find(user => user.email === userCred.email)
        const user = await httpService.post('auth/login', userCred)
        if (user) {
            return saveLocalUser(user)
        } else {
            console.log('wrong pw or email')
        }
        // socketService.login(user._id)
    } catch (err) {
        console.error(err)
    }
}
async function signup(userCred) {
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    // const user = await storageService.post('user', userCred)
    try {
        const user = await httpService.post('auth/signup', userCred)
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
    catch (err) { console.error(err) }
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    const FB = window.FB
    FB.logout(function(response) {
        // user is now logged out
      })
    return await httpService.post('auth/logout')
}

async function changeImage(img) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.imgUrl = img
    try {
        await update(user)
        return user.imgUrl
    }
    catch (err) {
        console.error(err)
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl  }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



