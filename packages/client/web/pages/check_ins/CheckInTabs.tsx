import { Tab, Tabs } from "../../components/tabs/Tabs";

interface CheckInTabsProps {
    active: string
}

export const CheckInTabs = ({ active }: CheckInTabsProps) => (
    <Tabs>
        <Tab href={'/check_ins'} active={active == '/check_ins'}>My Check-Ins</Tab>
        <Tab href={'/check_ins/reports'} active={active == '/check_ins/reports'}>Team</Tab>
    </Tabs>
)