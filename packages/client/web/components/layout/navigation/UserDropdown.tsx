import { faGear, faRightFromBracket, faUser, faUsers } from "@fortawesome/free-solid-svg-icons"
import React, { useState } from "react"
import { Maybe, Organization, Role, User } from "../../../lib/graphql/generated/generated"
import { useOutsideClickCallback } from "../../../lib/hooks/useOutsideClickCallback"
import { Dropdown } from "../../dropdown/Dropdown"
import { DropdownLink } from "../../dropdown/DropdownLink"
import { UserBadge } from "../../userBadge/UserBadge"
import styles from "./Navigation.module.css"

interface UserDropdownProps {
    user: User
    organization?: Maybe<Organization>
}

export const UserDropdown = ({ user, organization }: UserDropdownProps) => {
    const [userNavOpen, setUserNavOpen] = useState(false)
    const dropDownRef = React.createRef<HTMLDivElement>()

    useOutsideClickCallback(dropDownRef, () => { setUserNavOpen(false); })

    const DropDown = () => (
        <Dropdown>
            <DropdownLink href="/profile" icon={faUser}>
                <b>Account</b>
            </DropdownLink>
            {organization && user.role === Role.Admin && (
                <DropdownLink href="/org" className={styles.orgLink} icon={faGear}>
                    <strong>Settings</strong>
                </DropdownLink>
            )}
            {!organization && (
                <DropdownLink href="/org/create" className={styles.orgLink} icon={faUsers}>
                    <strong>Create Organization</strong>
                </DropdownLink>
            )}
            <DropdownLink href="/logout" icon={faRightFromBracket}><strong>Logout</strong></DropdownLink>
        </Dropdown>
    )

    return (
        <div ref={dropDownRef}>
            {user && (
                <UserBadge
                    user={user}
                    active={userNavOpen}
                    onClick={() => setUserNavOpen(!userNavOpen)}
                />
            )}
            {userNavOpen && user && <DropDown />}
        </div>
    )
}