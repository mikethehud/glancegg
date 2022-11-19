import React, { FunctionComponent, PropsWithChildren, useEffect } from "react"
import { TextLink } from "../textLink/TextLink";
import styles from "./Layout.module.css"
import { Navigation } from "./navigation/Navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { PageSpinner, Spinner } from "../spinner/Spinner";
import { useRouter } from "next/router";
import { getToken } from "../../lib/jwt/jwt";

interface LayoutProps {
    loading?: boolean
}

export const Layout: FunctionComponent<LayoutProps & PropsWithChildren> = ({ loading, children }) => {
    const router = useRouter()

    // redirect if not logged in
    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token === "") {
                // re-route to /login
                router.push('/login?redirectTo=' + router.asPath)
            }
        };

        checkToken();
    }, [])

    return (
        <div className={styles.layout}>
            <Navigation />
            <main>
                {loading ? <PageSpinner /> : children}
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
}