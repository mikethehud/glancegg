import { faDiscord, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Layout.module.css"

export const Footer = () => (
    <footer className={styles.footer}>
        <div className="text-small">
            © Ponder 2023. All rights reserved.
        </div>
        <div className={styles.footerSocials}>
            <a href="https://instagram.com"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://twitter.com"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://youtube.com"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="https://discord.com"><FontAwesomeIcon icon={faDiscord} /></a>
        </div>
    </footer>
)