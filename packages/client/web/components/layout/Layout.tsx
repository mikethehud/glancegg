import React, { FunctionComponent, PropsWithChildren } from "react"
import styles from "./Layout.module.css"
import { Navigation } from "./navigation/Navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { PageSpinner } from "../spinner/Spinner";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/hooks/useAuth";
import { useGetUserQuery } from "../../lib/graphql/generated/generated";
import { Footer } from "./Footer";
import { LayoutLoading } from "./LayoutLoading";
import Head from "next/head";

interface LayoutProps {
    loading?: boolean
    title?: string
}

export const Layout: FunctionComponent<LayoutProps & PropsWithChildren> = ({ loading, title, children }) => {
    const router = useRouter()
    useAuth({ redirect: true })
    const getUser = useGetUserQuery()
    const pageTitle = title ? `${title} / Ponder` : "Ponder"

    if (getUser.loading || loading || !getUser.data) {
       return <LayoutLoading title={pageTitle} />
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Navigation user={getUser.data.user} />
            <main>
                {loading ? <PageSpinner /> : children}
            </main>
            <Footer />
        </div>
    )
}