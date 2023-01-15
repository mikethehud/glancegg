export const validatePasswordsEqual = (original: string, val: string): string | boolean => {
    return original === val || "Passwords must match."
}

export const validateEmail = (val: string) => {
    const valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        val
    );

    return valid || "Please enter a valid email."
}