import React, { FunctionComponent, PropsWithChildren } from "react"
import styles from "./Layout.module.css"
import { NavigationPublic } from "./navigation/NavigationPublic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { PageSpinner } from "../spinner/Spinner";
import Head from "next/head";

interface LayoutProps {
    loading?: boolean
    title?: string
}

export const LayoutPublic: FunctionComponent<LayoutProps&PropsWithChildren> = ({ loading, title, children }) => (
    <div className={styles.layout}>
        <Head>
            <title>{title ? `${title} / Ponder` : "Ponder"}</title>
        </Head>
        <NavigationPublic />
        <main>
            {loading ? <PageSpinner /> : children}
        </main>
        <footer className={styles.footer}>
            <div className="text-small">
                © Ponder 2022. All rights reserved.
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