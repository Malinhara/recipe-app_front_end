export const validateRegistration = (formValues) => {
    const errors = {};
    let valid = true;

    if (!formValues.Firstname) {
        errors.Firstname = 'First name is required.';
        valid = false;
    }

    if (!formValues.Lastname) {
        errors.Lastname = 'Last name is required.';
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email || !emailRegex.test(formValues.email)) {
        errors.email = 'Valid email is required.';
        valid = false;
    }

    if (!formValues.contact) {
        errors.contact = 'Phone number is required.';
        valid = false;
    }

    if (!formValues.password) {
        errors.password = 'Password is required.';
        valid = false;
    }

    if (formValues.password !== formValues.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
        valid = false;
    }

    return { valid, errors };
};
