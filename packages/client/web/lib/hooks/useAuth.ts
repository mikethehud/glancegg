import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Role } from "../graphql/generated/generated";
import { getRoleFromToken, getToken, getUserIDFromToken } from "../jwt/jwt";

interface AuthResponse {
    authenticated: boolean
    role?: Role
}

export const useAuth = (): AuthResponse => {
    const [authenticated, setAuthenticated] = useState(false)
    const [role, setRole] = useState<Role>()
    const router = useRouter()

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token !== "") {
                setAuthenticated(true)
                setRole(getRoleFromToken(token))
            } else {
                // re-route to /login
                router.push('/login?redirectTo=' + router.asPath)
            }
        };
        
        checkToken();
    }, [])

    return {
        authenticated,
        role,
    }
};