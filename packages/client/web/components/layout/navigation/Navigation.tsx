import React, { PropsWithChildren, useEffect, useState } from "react"
import styles from "./Navigation.module.css"
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";
import { Logo } from "./Logo";
import { User } from "../../../lib/graphql/generated/generated";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faHandBackFist } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/router";

interface MenuItemProps {
    icon: IconProp
    href: string
    currentPath: string
    notifications?: number
}

const MenuItem = ({ icon, href, currentPath, notifications, children }: MenuItemProps&PropsWithChildren) => {
    const classes = classNames(
        styles.menuItem,
        notifications && styles.hasNotifications,
        currentPath === href && styles.active
    )
    
    return (
        <Link href={href}>
            <div className={classes}>
                {notifications && (<div className={styles.badge} />)}
                <FontAwesomeIcon icon={icon} className={styles.icon} />
                {children}
            </div>
        </Link>
    )
}

interface NavigationProps {
    user: User
}

export const Navigation = ({ user }: NavigationProps) => {
    const { asPath } = useRouter()

    return (
        <div className={styles.navigation}>
            <Link href="/">
                <a>
                    <Logo />
                </a>
            </Link>
            <div className={styles.right}>
                <MenuItem currentPath={asPath} href="/checkins" icon={faCheckToSlot}>Check Ins</MenuItem>
                <MenuItem currentPath={asPath} href="/reports" icon={faHandBackFist}>Fistbumps</MenuItem>
                <div className={styles.divider} />
                <UserDropdown user={user} organization={user.organization} />
            </div>
        </div>
    )
}
