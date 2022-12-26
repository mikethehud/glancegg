import { useRouter } from "next/router"

interface RedirectProps {
    to: string
}

export const Redirect = ({ to }: RedirectProps) => {
    const router = useRouter()
    router.push(to)
    return null
}