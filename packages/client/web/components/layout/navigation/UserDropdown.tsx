import Image from "next/image"
import React, { useState } from "react"
import { Role, useGetOrganizationQuery, User } from "../../../lib/graphql/generated/generated"
import { useOutsideClickCallback } from "../../../lib/hooks/useOutsideClickCallback"
import { useRole } from "../../../lib/hooks/useRole"
import { Avatar } from "../../avatar/Avatar"
import { Dropdown } from "../../dropdown/Dropdown"
import { DropdownDivider } from "../../dropdown/DropdownDivider"
import { DropdownLink } from "../../dropdown/DropdownLink"
import { UserBadge } from "../../userBadge/UserBadge"
import styles from "./Navigation.module.css"

interface UserDropdownProps {
    user?: User
    loading?: boolean
}

export const UserDropdown = ({ user, loading }: UserDropdownProps) => {
    const [userNavOpen, setUserNavOpen] = useState(false)
    const dropDownRef = React.createRef<HTMLDivElement>()
    const role = useRole()
    const { data } = useGetOrganizationQuery()

    useOutsideClickCallback(dropDownRef, () => { console.log("clicked somewhere wow"); setUserNavOpen(false); })

    const DropDown = ({ user }: { user: User }) => (
        <Dropdown>
            <DropdownLink href="/profile">
                Signed in as<br />
                <b>{user.name}</b>
            </DropdownLink>
            <DropdownDivider />
            <DropdownLink href="/org" className={styles.orgLink}>
                <Avatar name={data && data.organization.name} />
                <strong>{data && data.organization.name}</strong>
            </DropdownLink>
            <DropdownDivider />
            <DropdownLink href="/logout"><strong>Logout</strong></DropdownLink>
        </Dropdown>
    )

    return (
        <div ref={dropDownRef}>
            <UserBadge loading={loading} name={user && user.name} active={userNavOpen} onClick={() => setUserNavOpen(!userNavOpen)} />
            {userNavOpen && user && <DropDown user={user} />}
        </div>
    )
}