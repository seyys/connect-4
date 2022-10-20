import { roomUuid } from "../context/Socket/Types";

interface Props {
    roomUuid?: roomUuid;
}

const RoomList: React.FC<Props> = ({ roomUuid }) => {
    if(roomUuid === undefined){
        return (<></>);
    }
    return (
        <>
            <ul>Room 1: {roomUuid.p1}</ul>
            <ul>Room 2: {roomUuid.p2}</ul>
            <ul>Spectator room: {roomUuid.spectator}</ul>
        </>
    )
}

export default RoomList