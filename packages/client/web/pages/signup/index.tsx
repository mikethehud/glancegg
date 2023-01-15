import { NextPage } from "next";
import React from "react";
import { Container } from "../../components/container/Container";
import { useRouter } from "next/router";
import { LayoutPublic } from "../../components/layout/LayoutPublic";
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
        <LayoutPublic title="Sign Up">
            <Container size="medium">
                <Section>
                    <h1>Sign Up</h1>
                </Section>
                <Section>
                    Todo: Add description
                </Section>
                <Section>
                    <SignupForm onSuccess={() => doRedirect()} />
                </Section>
                <BottomLinks>
                    <BottomLink href="/login" primary>
                        Log In
                    </BottomLink>
                    <BottomLink href="/forgot_password">
                        Forgot Password
                    </BottomLink>
                </BottomLinks>
            </Container>
        </LayoutPublic>
    )
}

export default Signup