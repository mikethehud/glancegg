import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Role } from "../graphql/generated/generated";
import { getDataFromToken, getRoleFromToken, getToken, getUserIDFromToken, TokenData } from "../jwt/jwt";

interface AuthResponse {
    loading: boolean
    authenticated: boolean
    tokenData?: TokenData
}

interface AuthInput {
    redirect?: boolean
}

export const useAuth = (options?: AuthInput): AuthResponse => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [tokenData, setTokenData] = useState<TokenData>()
    const router = useRouter()

    useEffect(() => {
        setLoading(true);
        const checkToken = async () => {
            const token = await getToken();
            if (token !== "") {
                setAuthenticated(true)
                setTokenData(getDataFromToken(token))
            } else {
                if (options && options.redirect) {
                    router.push('/login?redirectTo=' + router.asPath)
                }
            }
            setLoading(false);
        };
        
        checkToken();
    }, [])

    return {
        loading,
        authenticated,
        tokenData,
    }
};