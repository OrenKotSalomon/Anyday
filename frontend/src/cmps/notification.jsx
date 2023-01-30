import { useEffect } from "react"

export function NotificationCheck() {

    // useEffect(() => {
    //     window.addEventListener('load', async () => {
    //         let sw = await navigator.serviceWorker.register('../service-worker.js')
    //         console.log('sw:', sw)
    //     })
    //     return () => {
    //         window.removeEventListener('load', async () => {
    //             let sw = await navigator.serviceWorker.register('../service-worker.js')
    //             console.log('sw:', sw)
    //         })
    //     }
    // }, [])

    // async function subscribe() {
    //     let sw = await navigator.serviceWorker.ready
    //     let push = await sw.pushManager.subscribe({
    //         userVisibleOnly: true,
    //         applicationServerKey: 'BDCiIgksnjwlagT8ybRRu1FFdXXm-xYVVnhWE6gIR-nQ3tN4T_r_rlydP2FLOLnV_Iz5V5FXRWGgQMDRiL43UIM'
    //     })
    //     console.log(JSON.stringify(push))
    // }

    // function temp() {
    //     Notification.requestPermission().then(prem => {
    //         if (prem === 'granted') {
    //             const notification = new Notification('Example', {
    //                 body: 'HIIIIIII',
    //                 data: {hello: 'world'},

    //             })
    //         }
    //     })
    // }

    const vapidKeys = {
        publicKey: 'BDCiIgksnjwlagT8ybRRu1FFdXXm-xYVVnhWE6gIR-nQ3tN4T_r_rlydP2FLOLnV_Iz5V5FXRWGgQMDRiL43UIM',
        privateKey: 'cVqnlPZmw3G6no9SVVSLkUt2j-dd2T2A_73dJjUtWvQ'
    }

    if ("serviceWorker" in navigator) {
        send().catch(err => console.error(err));
      }
      
      // Register SW, Register Push, Send Push
      async function send() {
        // Register Service Worker
        console.log("Registering service worker...");
        const register = await navigator.serviceWorker.register("../../service-worker.js", {
          scope: "/"
        });
        console.log("Service Worker Registered...");
      
        // Register Push
        console.log("Registering Push...");
        const subscription = await register.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidKeys.publicKey)
        });
        console.log("Push Registered...");
      
        // Send Push Notification
        console.log("Sending Push...");
        await fetch("/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "content-type": "application/json"
          }
        });
        console.log("Push Sent...");
      }

    function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    return <section className='notification'>

        {/* <button onClick={temp} >Subscribe</button> */}

    </section>
}