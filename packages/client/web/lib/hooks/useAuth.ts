import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getToken, getUserIDFromToken } from "../jwt/jwt";

export const useAuth = (): boolean => {
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token !== "") {
                setAuthenticated(true)
            } else {
                // re-route to /login
                router.push('/login?redirectTo=' + router.asPath)
            }
        };
        
        checkToken();
    }, [])
    return authenticated
};