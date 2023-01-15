import Image from 'next/image'
import styles from "./Navigation.module.css"

export const Logo = () => (
    <Image src="/ponder-logo.svg" alt="Ponder Logo" width={40} height={70} className={styles.logo} />
)

export const LogoPublic = () => (
    <Image src="/ponder-logo-public.svg" alt="Ponder Logo" width={150} height={70} className={styles.logo} />
)