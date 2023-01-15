export const getErrorMessage = (code: string): string => {
    switch (code) {
        case "USER_NOT_UNIQUE":
            return "A user with this email already exists."
        case "INVALID_INPUT":
            return "Some of those fields don't look right. Please try again."
        default:
            return "Unknown error."
    }
}