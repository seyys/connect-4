import { useRouter } from "next/router"

const play = () => {
    const router = useRouter();
    const { slug } = router.query;

    return(
        <p>uuid: {slug}</p>
    )
}

export default play