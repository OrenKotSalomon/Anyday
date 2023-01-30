var push = require('web-push')

let vapidKeys = {
    publicKey: 'BDCiIgksnjwlagT8ybRRu1FFdXXm-xYVVnhWE6gIR-nQ3tN4T_r_rlydP2FLOLnV_Iz5V5FXRWGgQMDRiL43UIM',
    privateKey: 'cVqnlPZmw3G6no9SVVSLkUt2j-dd2T2A_73dJjUtWvQ'
}

push.setVapidDetails('mailto:harelcr7@gmail.com', vapidKeys.publicKey, vapidKeys.privateKey)

let sub = { 
    endpoint: "https://fcm.googleapis.com/fcm/send/f5Tpb989rrQ:APA91bEkzLDdBJLZppjI8bOEKUL7ORU4o_g75d18Jd7du_Y4-vCd5LkW0t0YOImdndCSWeJtnPUjjKxmByYGYjMq5C1yv_n7VgaDIzufietmxhjg-EGkAo4y--jNolVjfgEwhm8u8BdS",
     expirationTime: null,
      keys: { "p256dh": "BGEbJFEXvKfxv4qNBE2Kem4ejXb54SUUmMPJLVRCObKIBzBUUOuvlFecM-2IJ3xdpa6fxhIwyAYYJCzmWfN6abs",
       auth: "8A2_caVpw0yJyYFJOYUkvg" } }

push.sendNotification(sub, 'test message')