import Image from "next/image"
import React, { useState } from "react"
import { Maybe, Organization, User } from "../../../lib/graphql/generated/generated"
import { useOutsideClickCallback } from "../../../lib/hooks/useOutsideClickCallback"
import { Avatar } from "../../avatar/Avatar"
import { Dropdown } from "../../dropdown/Dropdown"
import { DropdownDivider } from "../../dropdown/DropdownDivider"
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

    useOutsideClickCallback(dropDownRef, () => { console.log("clicked somewhere wow"); setUserNavOpen(false); })

    const DropDown = () => (
        <Dropdown>
            <DropdownLink href="/profile">
                Signed in as<br />
                <b>{user.firstName} {user.lastName}</b>
            </DropdownLink>
            <DropdownDivider />
            {organization
                ? (
                    <DropdownLink href="/org" className={styles.orgLink}>
                        <Avatar name={organization.name} />
                        <strong>{organization.name}</strong>
                    </DropdownLink>
                )
                : (
                    <DropdownLink href="/org/create" className={styles.orgLink}>
                        <Avatar name="?" />
                        <strong>Create Organization</strong>
                    </DropdownLink>
                )
            }
            <DropdownDivider />
            <DropdownLink href="/logout"><strong>Logout</strong></DropdownLink>
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