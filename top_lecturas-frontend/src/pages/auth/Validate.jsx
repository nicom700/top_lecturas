export function validateName(name) {
    if (!name)
        return ['* El campo Nombre es obligatorio'];

    return false;
}

export function validateEmail(email) {
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email)
        return ['* El campo Email es obligatorio'];

    if (!reg.test(email))
        return ['* No parece ser un Email'];

    return false;
}

export function validatePassword(password) {
    if (!password)
        return ['* El campo Contraseña es obligatorio'];

    return false;
}

export function validatePasswordConfirmation(password, passwordConfirmation) {
    if (!passwordConfirmation)
        return ['* El campo Repetir contraseña es obligatorio'];

    if (password !== passwordConfirmation)
        return ['* Las contraseñas no coinciden'];

    return false;
}
