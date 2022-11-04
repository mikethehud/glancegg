import React, { useState } from "react"
import styles from "./Navigation.module.css"
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";
import { Logo } from "./Logo";

export const Navigation = () => {
    return (
        <div className={styles.navigation}>
            <Link href="/">
                <a>
                    <Logo />
                </a>
            </Link>
            <div className={styles.right}>
                <UserDropdown />
            </div>
        </div>
    )
}
