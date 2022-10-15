import io, {Socket} from "socket.io-client"

class conn {
    

    constructor (addr: string){
        return io(addr);
    }
}

export default Socket