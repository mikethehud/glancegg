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

interface LayoutProps {
    loading?: boolean
}

export const Layout: FunctionComponent<LayoutProps & PropsWithChildren> = ({ loading, children }) => {
    const router = useRouter()
    useAuth({ redirect: true })
    const getUser = useGetUserQuery()

    if (getUser.loading || loading || !getUser.data) {
       return <LayoutLoading />
    }

    return (
        <div className={styles.layout}>
            <Navigation user={getUser.data.user} />
            <main>
                {loading ? <PageSpinner /> : children}
            </main>
            <Footer />
        </div>
    )
}