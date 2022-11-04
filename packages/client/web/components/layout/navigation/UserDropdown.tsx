import React, { useState } from "react"
import { useOutsideClickCallback } from "../../../lib/hooks/useOutsideClickCallback"
import { Dropdown } from "../../dropdown/Dropdown"
import { DropdownDivider } from "../../dropdown/DropdownDivider"
import { DropdownLink } from "../../dropdown/DropdownLink"
import { UserBadge } from "../../userBadge/UserBadge"

export const UserDropdown = () => {
    const [userNavOpen, setUserNavOpen] = useState(false)
    const dropDownRef = React.createRef<HTMLDivElement>()

    useOutsideClickCallback(dropDownRef, () => { console.log("clicked somewhere wow"); setUserNavOpen(false); })

    const DropDown = () => (
        <Dropdown>
            <DropdownLink href="/profile">
                Signed in as<br />
                <b>hudzM</b>
            </DropdownLink>
            <DropdownDivider />
            <DropdownLink href="/logout"><strong>Logout</strong></DropdownLink>
        </Dropdown>
    )

    return (
        <div ref={dropDownRef}>
            <UserBadge name={'Mike Hudson'} active={userNavOpen} onClick={() => setUserNavOpen(!userNavOpen)} />
            {userNavOpen && <DropDown />}
        </div>
    )
}