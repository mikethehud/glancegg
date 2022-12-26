import React from "react"
import Image from 'next/image'
import styles from "./Navigation.module.css"
import { Button } from "../../button/Button";
import Link from "next/link";
import { Logo } from "./Logo";

export const NavigationBasic = () => (
    <div className={styles.navigation}>
        <Link href="/">
                <a>
                    <Logo />
                </a>
        </Link>
    </div>
)