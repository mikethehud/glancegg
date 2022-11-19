import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Role } from "../graphql/generated/generated";
import { getRoleFromToken, getToken } from "../jwt/jwt";

export const useRole = (): Role | undefined => {
    // todo: find better way to grab role
    const router = useRouter()
    const [role, setRole] = useState<Role>()

    useEffect(() => {
        const getRole = async () => {
            const token = await getToken();
            if (token !== "") {
                setRole(getRoleFromToken(token))
            }
        };
        
        getRole();
    }, [])

    return role
};