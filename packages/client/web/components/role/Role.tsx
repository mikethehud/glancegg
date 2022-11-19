import { PropsWithChildren } from "react";
import { Role } from "../../lib/graphql/generated/generated";
import { useRole } from "../../lib/hooks/useRole";

type RoleRestrictedProps = {
    allowed: Role[]
} & PropsWithChildren

export const RoleRestricted = ({ allowed, children }: RoleRestrictedProps) => {
    const role = useRole()
    
    if (role && allowed && allowed.includes(role)) {
        return <>{children}</>
    }
    return (null)
}