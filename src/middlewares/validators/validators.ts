import { checkSchema } from "express-validator"

export const signupValidate = async () => {
    checkSchema({
        name: {
            trim: true,
            notEmpty: true,
            isLength: {
                options: { min: 2 }
            },
            errorMessage: 'more characters in name required'
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: 'email not valid!'
        },
        password: {
            notEmpty: true,
            isLength: {
                options: { min: 6 },
            },
            errorMessage: 'Password should be at least 6 chars long',
        },
        state: {
            notEmpty: true,
            errorMessage: 'region is required',
        }
    })
}