import Link from "next/link";
import { useEffect } from "react";
import { roomUuid } from "../context/Socket/Types";

interface Props {
    roomUuid?: roomUuid;
}

const RoomList: React.FC<Props> = ({ roomUuid }) => {
    if(roomUuid === undefined){
        return (<></>);
    }
    
    const linkP1 = window.location.href + "/play/" + roomUuid['1'];
    const linkP2 = window.location.href + "/play/" + roomUuid['2'];
    const linkSpectator = window.location.href + '/watch/' + roomUuid.spectator;

    return (
        <>
            <ul>Player 1: <Link href={linkP1}>{linkP1}</Link></ul>
            <ul>Player 2: <Link href={linkP2}>{linkP2}</Link></ul>
            <ul>Spectators: <Link href={linkSpectator}>{linkSpectator}</Link></ul>
        </>
    )
}
  
export default RoomList