import { NextPage } from "next"
import { Layout } from "../../components/layout/Layout"
import { Container } from "../../components/container/Container"

const Home: NextPage = () => {
    return (
        <Layout>
            <Container size="small">
                <h1>Authenticated mate, nice!</h1>
            </Container>
        </Layout>
    )
}

export default Home