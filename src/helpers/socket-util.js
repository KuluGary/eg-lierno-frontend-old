import io from "socket.io-client";
const socket = io("http://localhost:3001");

const socketUtil = {  
    async listenToApi(key) {
        socket.on(key, (res) => console.log(res));
        return data;
    }
}

export default socketUtil;