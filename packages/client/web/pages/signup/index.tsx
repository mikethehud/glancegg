import { NextPage } from "next";
import React, { useEffect } from "react";
import { Button } from "../../components/button/Button";
import { FormElement } from "../../components/formElement/FormElement";
import { Container } from "../../components/container/Container";
import { TextInput } from "../../components/textInput/TextInput";
import Link from "next/link";
import { TextLink } from "../../components/textLink/TextLink";
import styles from "./Signup.module.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUpWithoutOrgMutation } from "../../lib/graphql/generated/generated";
import { FormError } from "../../components/formError/FormError";
import { useRouter } from "next/router";
import { getToken } from "../../lib/jwt/jwt";
import { LayoutPublic } from "../../components/layout/LayoutPublic";
import { Card } from "../../components/card/Card";
import { Section } from "../../components/container/Section";
import { SignupForm } from "../../components/signup/SignupForm";
import { useAuth } from "../../lib/hooks/useAuth";
import { BottomLink, BottomLinks } from "../../components/bottomLinks/BottomLinks";

type Inputs = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    passwordConfirm: string,
    organizationName: string,
};

const Signup: NextPage = () => {
    const router = useRouter()
    const { authenticated } = useAuth()

    const doRedirect = () => {
        if(router.query.redirectTo) {
            router.push(router.query.redirectTo as string)
        }
        else {
            router.push('/home')
        }
    }

    if (authenticated) {
        doRedirect()
    }

    return (
        <LayoutPublic>
            <Container size="medium">
                <Section>
                    <h1>Sign Up</h1>
                </Section>
                <Section>
                    Todo: Add some text here to explain why it's cool 😎
                </Section>
                <SignupForm onSuccess={() => doRedirect()} />
            </Container>
            <BottomLinks>
                <BottomLink href="/login" primary>
                    Log In
                </BottomLink>
                <BottomLink href="/forgot_password">
                    Forgot Password
                </BottomLink>
            </BottomLinks>
        </LayoutPublic>
    )
}

export default Signup