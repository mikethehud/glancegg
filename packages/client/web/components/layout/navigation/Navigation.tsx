import React from "react"
import Image from 'next/image'
import styles from "./Navigation.module.css"
import { Button } from "../../button/Button";
import Link from "next/link";

type NavigationProps = {
    placeholder?: string;
    error?: string;
}

export const Navigation = ({ error, placeholder }: NavigationProps) => (
    <div className={styles.navigation}>
        <Link href="/">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} className={styles.logo} />
            </Link>
        <div className={styles.right}>
            <Button primary small>Sign Up</Button>
            &nbsp;
            <Button small>Log In</Button>
        </div>
    </div>
)