import React from "react"
import { TextLink } from "../textLink/TextLink";
import { Section } from "../section/Section";
import Link from "next/link";
import styles from "./LandingContent.module.css"

export const LandingContent = () => (
    <>
        <Section size="medium" centered>
            <h1>Empower your players to reach new heights.</h1>
            <p>Masterful provides quality tools to help coaches and captains connect with their team.</p>
            <br />
            <Link href="/login"><TextLink primary>&rarr; Get started</TextLink></Link>
        </Section>
        <Section size="full">
            <img src="/promo.jpeg" className={styles.promoImage} />
        </Section>
    </>
)