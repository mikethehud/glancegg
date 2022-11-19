import { clientNoAuth } from "../clients/apolloClient"
import jwtDecode, { JwtPayload } from "jwt-decode";
import { GetAuthTokenDocument, GetAuthTokenQuery, Role } from "../graphql/generated/generated";

const jwtKey = "mf-jwt"

interface JwtData extends JwtPayload {
    userID: string,
    organizationID: string,
    role: string,
}

export const storeToken = (token: string) => {
    console.log("storing token")
    localStorage.setItem(jwtKey, token)
}

export const getLocalToken = (): string | null => {
    return localStorage.getItem(jwtKey)
}

export async function getToken(): Promise<string> {
    const token = getLocalToken()
    if (!token || tokenExpiresSoon(token)) {
        // either we have no auth token, or we need to get a new one
        try {
            const { data } = await clientNoAuth.query<GetAuthTokenQuery>({ query: GetAuthTokenDocument, fetchPolicy: "no-cache" })
            storeToken(data.authToken)
            return data.authToken
        } catch (e) {
            if (e instanceof Error) {
                if (e.message != 'NO_ACCESS') {
                    // unexpected error, should log
                    // todo: properly log this with raygun or something
                    console.log('Unexpected error', e)
                }
            }
            return ""
        }
    }
    return token
}

function tokenExpiresSoon(token: string) {
    const jwt = jwtDecode<JwtPayload>(token)
    const expiry = jwt.exp ? jwt.exp * 1000 : 0
    const nowWithBuffer = Date.now() + 60000 // buffer used to make sure requests don't die

    if (!expiry || nowWithBuffer > expiry) {
        return true
    }
    return false
}

export const getUserIDFromToken = (token: string): string => {
    const jwt = jwtDecode<JwtData>(token)
    if (jwt.userID) {
        return jwt.userID
    }
    return ""
}

export const getRoleFromToken = (token: string): Role => {
    const jwt = jwtDecode<JwtData>(token)
    if (jwt.role) {
        switch(jwt.role) {
            case "ADMIN":
                return Role.Admin
            case "USER":
                return Role.User
        }
    }
    return Role.User
}

export const removeToken = () => {
    console.log("removing token")
    return localStorage.removeItem(jwtKey)
}