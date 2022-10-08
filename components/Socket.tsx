import io from "socket.io-client"

function Socket(addr: string){
    return io(addr);
}

export default Socket