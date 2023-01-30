var push = require('web-push')

let vapidKeys = {
    publicKey: 'BDCiIgksnjwlagT8ybRRu1FFdXXm-xYVVnhWE6gIR-nQ3tN4T_r_rlydP2FLOLnV_Iz5V5FXRWGgQMDRiL43UIM',
    privateKey: 'cVqnlPZmw3G6no9SVVSLkUt2j-dd2T2A_73dJjUtWvQ'
}

push.setVapidDetails('harelcr7@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)

let sub = {}

push.sendNotification(sub, 'test message')