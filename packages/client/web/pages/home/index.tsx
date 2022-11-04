import { NextPage } from "next"
import { Layout } from "../../components/layout/Layout"
import { Section } from "../../components/section/Section"

const Home: NextPage = () => {
    return (
        <Layout>
            <Section size="small">
                <h1>Authenticated mate, nice!</h1>
            </Section>
        </Layout>
    )
}

export default Home