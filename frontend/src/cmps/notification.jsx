import { useEffect } from "react"

export function NotificationCheck() {

    useEffect(() => {
        window.addEventListener('load', async () => {
            let sw = await navigator.serviceWorker.register('../service-worker.js')
            console.log('sw:', sw)
        })
        return () => {
            window.removeEventListener('load', async () => {
                let sw = await navigator.serviceWorker.register('../service-worker.js')
                console.log('sw:', sw)
            })
        }
    }, [])

    async function subscribe() {
        let sw = await navigator.serviceWorker.ready
        let push = await sw.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BDCiIgksnjwlagT8ybRRu1FFdXXm-xYVVnhWE6gIR-nQ3tN4T_r_rlydP2FLOLnV_Iz5V5FXRWGgQMDRiL43UIM'
        })
        console.log(JSON.stringify(push))
    }

    function temp() {
        Notification.requestPermission().then(prem => {
            if (prem === 'granted') {
                const notification = new Notification('Example', {
                    body: 'HIIIIIII',
                    data: {hello: 'world'},
            
                })
            }
        })
    }
    return <section className='notification'>

<button onClick={temp} >Subscribe</button>

    </section>
}