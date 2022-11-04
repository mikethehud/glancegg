import Image from 'next/image'
import styles from "./Navigation.module.css"

export const Logo = () => (
    <Image src="/logo.svg" alt="Masterful Logo" width={30} height={30} className={styles.logo} />
)