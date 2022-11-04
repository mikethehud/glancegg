import React from "react"
import Image from 'next/image'
import styles from "./Navigation.module.css"
import { Button } from "../../button/Button";
import Link from "next/link";
import { Logo } from "./Logo";

export const NavigationPublic = () => (
    <div className={styles.navigation}>
        <Link href="/">
                <a>
                    <Logo />
                </a>
        </Link>
        <div className={styles.right}>
            <Button primary small>Sign Up</Button>
            &nbsp;
            <Button small>Log In</Button>
        </div>
    </div>
)