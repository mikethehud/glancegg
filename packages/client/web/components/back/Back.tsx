import Link from "next/link"
import { PropsWithChildren } from "react"
import { UrlObject } from "url"
import styles from "./Back.module.css"

interface BackProps {
    href: string | UrlObject
}

export const Back = ({ href }: BackProps) => (
    <Link href={href}><a className={styles.back}>&larr;</a></Link>
)