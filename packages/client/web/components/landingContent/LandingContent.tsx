import React from "react"
import { TextLink } from "../textLink/TextLink";
import { Container } from "../container/Container";
import Link from "next/link";
import styles from "./LandingContent.module.css"
import { Section } from "../container/Section";

export const LandingContent = () => (
    <>
        <Container size="medium" centered>
            <Section>
                <h1>Empower your players to reach new heights.</h1>
            </Section>
            <Section>
                Masterful provides quality tools to help coaches and captains connect with their team.
            </Section>
            <Section>
                <Link href="/signup"><TextLink primary>&rarr; Get started</TextLink></Link>
            </Section>
        </Container>
        <Container size="full">
            <img src="/promo.jpeg" className={styles.promoImage} />
        </Container>
    </>
)