import { NextPage } from "next"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../../../components/button/Button"
import { Card } from "../../../components/card/Card"
import { Container } from "../../../components/container/Container"
import { Section } from "../../../components/container/Section"
import { FormElement } from "../../../components/formElement/FormElement"
import { FormError } from "../../../components/formError/FormError"
import { Layout } from "../../../components/layout/Layout"
import { LayoutLoading } from "../../../components/layout/LayoutLoading"
import { Redirect } from "../../../components/redirect/Redirect"
import { TextInput } from "../../../components/textInput/TextInput"
import { useCreateOrganizationAndJoinMutation, useGetUserQuery } from "../../../lib/graphql/generated/generated"
import { removeToken } from "../../../lib/jwt/jwt"

interface CreateOrgInputs {
    name: string
}

const OrgCreate: NextPage = () => {
    const { data, loading } = useGetUserQuery()
    const [createOrgAndJoin, result] = useCreateOrganizationAndJoinMutation({
        onCompleted: () => removeToken()
    })
    const { handleSubmit, register, formState: { errors } } = useForm<CreateOrgInputs>()

    if (loading || !data) {
        return <LayoutLoading />
    }

    if (data.user.organization) {
        return <Redirect to="/org" />
    }

    const onSubmit: SubmitHandler<CreateOrgInputs> = (formData) => {
        createOrgAndJoin({
            variables: {
                input: {
                    name: formData.name
                }
            }
        })
    }

    if (result.data) {
        // invalidate token to make sure we receive auth token
        removeToken()
        return <Redirect to="/home" />
    }

    return (
        <Layout>
            <Container>
                <Section>
                    <h1>Create Organisation</h1>
                </Section>
                <Section>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Section>
                            <Card>
                                <Section>
                                    <h2>Organization</h2>
                                </Section>
                                <Section>
                                    <FormElement label="Name">
                                        <TextInput
                                            placeholder="Organization Name"
                                            error={errors.name && errors.name.message}
                                            {...register("name", { required: true })}
                                        />
                                    </FormElement>
                                </Section>
                            </Card>
                        </Section>
                        {result.error && <Section><FormError error={result.error.message} /></Section>}
                        <Section>
                            <Button primary loading={loading} type="submit">Create Your Account</Button>
                        </Section>
                    </form>
                </Section>
            </Container>
        </Layout>
    )
}

export default OrgCreate