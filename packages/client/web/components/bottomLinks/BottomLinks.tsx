import Link from "next/link"
import { PropsWithChildren } from "react"
import { Container } from "../container/Container"
import { TextLink } from "../textLink/TextLink"

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
    <Container size="medium">
        {children}
    </Container>
)