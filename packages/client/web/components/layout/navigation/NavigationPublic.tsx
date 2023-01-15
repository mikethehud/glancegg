import React from "react"
import Image from 'next/image'
import styles from "./Navigation.module.css"
import { Button } from "../../button/Button";
import Link from "next/link";
import { LogoPublic } from "./Logo";

export const NavigationPublic = () => (
    <div className={styles.navigation}>
        <Link href="/">
                <a>
                    <LogoPublic />
                </a>
        </Link>
        <div className={styles.right}>
            <Link href="/signup">
                <Button primary small>Create Account</Button>
            </Link>
            <Link href="/login">
                <Button small>Log In</Button>
            </Link>
        </div>
    </div>
)