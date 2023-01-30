const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const webPush = require('web-push')

const app = express()
const http = require('http').createServer(app)

// Express App Config
app.use(cookieParser())
app.use(express.json())

// res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();

// let vapidKeys = {
//     publicKey: 'BDCiIgksnjwlagT8ybRRu1FFdXXm-xYVVnhWE6gIR-nQ3tN4T_r_rlydP2FLOLnV_Iz5V5FXRWGgQMDRiL43UIM',
//     privateKey: 'cVqnlPZmw3G6no9SVVSLkUt2j-dd2T2A_73dJjUtWvQ'
// }

// const keys = {
//     publicKey:'BPY_RuGOwM90gBBl5uE - UNzg8ysDgpNnuvQopor1bSXBX1sEzpbcRvA5LDwNztEt7dgLXdLs_KlE4VeW6VGsMjg',
//     privateKey: '4uKu_pMxZmJHmmrbGn7vMIb0FkGLmHKDdJwcKHWAhyg'
// }

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// webPush.setVapidDetails('mailto:harelcr7@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)

// app.post('/subscribe', (req, res) => {

//     const subscription = req.body

//     res.status(201).json({})

//     const payload = JSON.stringify({ title: 'Push Test' })

//     webPush.sendNotification(subscription, payload).catch(console.log)
// })

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const boardRoutes = require('./api/board/board.routes')
// const reviewRoutes = require('./api/review/review.routes')
const { setupSocketAPI } = require('./services/socket.service')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)
// app.use('/api/review', reviewRoutes)
setupSocketAPI(http)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})