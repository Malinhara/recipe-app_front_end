export const validateLogin = (email, password) => {
    const errors = {};
    let valid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.email = 'Invalid email format.';
        valid = false;
    }

    if (!password || password.length < 6) {
        errors.password = 'Password must be at least 6 characters long.';
        valid = false;
    }

    return {
        valid,
        errors,
    };
};
