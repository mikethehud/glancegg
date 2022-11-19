import { NextPage } from "next"
import styles from "./Org.module.css"
import { Layout } from "../../components/layout/Layout"
import { Role, useGetOrganizationAndMembersQuery, useGetOrganizationQuery, User } from "../../lib/graphql/generated/generated"
import { Button } from "../../components/button/Button"
import { FormError } from "../../components/formError/FormError"
import { UserBadge } from "../../components/userBadge/UserBadge"
import { Avatar } from "../../components/avatar/Avatar"
import { Card } from "../../card/Card"
import { RoleRestricted } from "../../components/role/Role"

interface MemberData {
    user: User
    possibleReports: User[]
}

const Member = ({ user, possibleReports }: MemberData) => {
    return (
        <Card className={styles.member}>
            <div>
                <div className={styles.name}>
                    <Avatar name={user.name} className={styles.avatar} />
                    <strong>{user.name}</strong>
                </div>
                <div className={styles.email}>{user.email}</div>
            </div>
            <RoleRestricted allowed={[Role.Admin]}>
                <div className={styles.setting}>
                    <strong>Reports to</strong>
                    <select>
                        <option value="" selected={!user.reportsTo}>&mdash;</option>
                        {possibleReports.map(report => <option value={report.id} selected={user.reportsTo == report.id}>{report.name}</option>)}
                    </select>
                </div>
                <div className={styles.setting}>
                    <strong>Role</strong>
                    <select>
                        <option value="USER" selected={user.role === "USER"}>User</option>
                        <option value="ADMIN" selected={user.role === "ADMIN"}>Admin</option>
                    </select>
                </div>
            </RoleRestricted>
        </Card>
    )
}

const Org: NextPage = () => {
    const { data, loading, error } = useGetOrganizationAndMembersQuery()
    if (loading || !data) return <Layout loading={loading} />
    if (error) return <Layout><FormError error={error.message}/></Layout>
    return (
        <Layout>
            <div className={styles.header}>
                <h1>{data.organization.name}</h1>
                <div>
                    <Button primary caution xsmall>Leave Organization</Button>
                </div>
            </div>
            <div>
                {data.organization.members.map(user => <Member user={user} possibleReports={getPossibleReports(user, data.organization.members)} />)}
            </div>
        </Layout>
    )
}

function getPossibleReports(user: User, users: User[]): User[] {
    return users.filter(n => n.id != user.id)
}

export default Org