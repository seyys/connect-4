import { useRouter } from "next/router"
import { urlConnect4Backend } from "../../../context/Socket/Component";
import { useSocket } from "../../../hooks/useSocket";

const play = () => {
    const router = useRouter();
    const { slug } = router.query;
    const socket = useSocket(urlConnect4Backend);
    socket.emit("join_room", {roomUuid: slug});

    return(
        <p>uuid: {slug}</p>
    )
}

export default play