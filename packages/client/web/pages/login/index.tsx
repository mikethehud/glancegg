import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { FormElement } from "../../components/formElement/FormElement";
import { Container } from "../../components/container/Container";
import { TextInput } from "../../components/textInput/TextInput";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./Login.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogInMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { useRouter } from "next/router";
import { getToken, storeToken } from "../../lib/jwt/jwt";
import { LayoutPublic } from "../../components/layout/LayoutPublic";
import { Section } from "../../components/container/Section";
import { Card } from "../../components/card/Card";
import { BottomLink, BottomLinks } from "../../components/bottomLinks/BottomLinks";

type Inputs = {
    email: string,
    password: string,
};

const Login: NextPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ reValidateMode: "onChange" });
    const [logIn, { data, loading, error }] = useLogInMutation()
    const router = useRouter()

    const doRedirect = () => {
        if(router.query.redirectTo) {
            router.push(router.query.redirectTo as string)
        }
        else {
            router.push('/home')
        }
    }

    useEffect(() => {
        const checkToken = async () => {
            const token = await getToken();
            if (token !== "") {
                doRedirect()
            }
        };
        checkToken();
    }, [])

    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        logIn({
            variables: {
                input: {
                    email: formData.email,
                    password: formData.password,
                }
            }
        })
    }

    const getErrorMessage = (code: string): string => {
        switch (code) {
            case "USER_DOESNT_EXIST":
                return "A user with this email doesn't exist."
            case "WRONG_PASSWORD":
                return "Please enter the correct password for this user."
            default:
                return "Unknown error."
        }
    }

    if (data) {
        storeToken(data.logIn) // store auth token
        doRedirect()
    }

    return (
        <LayoutPublic>
            <Container size="small">
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Section>
                            <h1>Login</h1>
                        </Section>
                        <Section>
                            <FormElement label="Email">
                                <TextInput
                                    type="email"
                                    placeholder="Enter Email"
                                    error={errors.email && "Enter your email"}
                                    {...register("email", { required: true })}
                                />
                            </FormElement>
                        </Section>
                        <Section>
                            <FormElement label="Password">
                                <TextInput
                                    type="password"
                                    placeholder="Enter Password"
                                    error={errors.password && "Enter your password"}
                                    {...register("password", { required: true })}
                                />
                            </FormElement>
                        </Section>
                        {error && <FormError error={getErrorMessage(error.message)} />}
                        <Section>
                            <Button primary loading={loading} type="submit">Log In</Button>
                        </Section>
                    </form>
                </Card>
                <BottomLinks>
                    <BottomLink href="/signup" primary>
                        Create New Account
                    </BottomLink>
                    <BottomLink href="/forgot_password">
                        Forgot Password
                    </BottomLink>
                </BottomLinks>
            </Container>
        </LayoutPublic>
    )
}

export default Login