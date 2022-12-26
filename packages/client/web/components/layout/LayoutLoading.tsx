import { NavigationBasic } from "./navigation/NavigationBasic";
import React from "react"
import styles from "./Layout.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { PageSpinner } from "../spinner/Spinner";
import { Footer } from "./Footer";

export const LayoutLoading = () => (
    <div className={styles.layout}>
        <NavigationBasic />
        <main>
            <PageSpinner />
        </main>
        <Footer />
    </div>
)