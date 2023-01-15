import { useToast } from "../../lib/context/toastContext"
import { Button } from "../button/Button"
import { Section } from "../container/Section"
import { FormElement } from "../formElement/FormElement"
import { TextInput } from "../textInput/TextInput"
import styles from "./Invite.module.css"

interface InviteProps {
    orgID: String
}

export const Invite = ({ orgID }: InviteProps) => {
    const { showSuccessToast } = useToast()
    
    const inviteURL = "http://localhost:3000/invite/" + orgID

    const handleInviteCopy = () => {
        navigator.clipboard.writeText(inviteURL)
        showSuccessToast("Invite link copied to clipboard")
    }

    return (
        <Section>
            <FormElement label="Invite team mates">
                <div className={styles.invite}>
                    <TextInput block disabled value={inviteURL} />
                    <Button primary small onClick={() => handleInviteCopy()}>Copy Link</Button>
                </div>
            </FormElement>
        </Section>
    )
}