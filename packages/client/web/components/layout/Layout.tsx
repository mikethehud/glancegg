import React from "react"
import { TextLink } from "../textLink/TextLink";
import styles from "./Layout.module.css"
import { Navigation } from "./navigation/Navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons'

type LayoutProps = {
    children?: JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => (
    <div className={styles.layout}>
        <Navigation />
        <main>
            {children}
        </main>
        <footer className={styles.footer}>
            <div className="text-small">
                © Masterful 2022. All rights reserved.
            </div>
            <div className={styles.footerSocials}>
                <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="https://youtube.com"><FontAwesomeIcon icon={faYoutube} /></a>
                <a href="https://discord.com"><FontAwesomeIcon icon={faDiscord} /></a>
            </div>
        </footer>
    </div>
)