import { NextPage } from "next"
import { useEffect } from "react"
import { FormError } from "../../components/formError/FormError"
import { Layout } from "../../components/layout/Layout"
import { useGetOrganizationQuery } from "../../lib/graphql/generated/generated"

const Org: NextPage = () => {
    const { data, loading, error } = useGetOrganizationQuery({ fetchPolicy: "no-cache" })

    return (
        <Layout loading={loading}>
            {data && (
                <h1>{data.organization.name}</h1>
            )}
            {error && <FormError error={error.message} />}
        </Layout>
    )
}

export default Org