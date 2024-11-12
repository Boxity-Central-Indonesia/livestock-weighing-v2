import { useEffect, useState } from "react"
export const timbanganServices = () => {
    const [data, setData] = useState('0')

    useEffect(() => {
        const webSocketUrl = import.meta.env.VITE_WEBSOCKET_URL
        const ws = new WebSocket(webSocketUrl);

        ws.onopen = () => {
            console.log('Websocket connection opened')
        }

        ws.onmessage = (event) => {
            console.log(event.data)
            setData(event.data)
        }

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        }

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        }

        return () => {
            ws.close();
        };

    }, [])

    return data
}