import { Role } from "../graphql/generated/generated";

export const countAdmins = (members: Array<{ role: Role }>): number => members.reduce<number>((acc, curr) => curr.role == Role.Admin ? acc+1 : acc, 0)