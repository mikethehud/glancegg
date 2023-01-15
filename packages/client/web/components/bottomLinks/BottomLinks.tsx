import Link from "next/link"
import { PropsWithChildren } from "react"
import { Section } from "../container/Section"
import { TextLink } from "../textLink/TextLink"
import styles from "./BottomLinks.module.css"

interface BottomLinkProps extends PropsWithChildren {
    primary?: boolean
    href: string
}

export const BottomLink = ({ primary, href, children }: BottomLinkProps) => (
    <div>
        <Link href={href}>
            <TextLink primary={primary}>
                {children}
            </TextLink>
        </Link>
    </div>
)

export const BottomLinks = ({ children }: PropsWithChildren) => (
    <Section className={styles.bottomLinks}>
        {children}
    </Section>
)