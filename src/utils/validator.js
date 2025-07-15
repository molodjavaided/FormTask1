const validateRules = {
    isRequired: (value) => {
        return Boolean(value.trim())
    },
    min: (value, min) => {
        return value.length >= min
    },
    isEmail: (value) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value)
    },
    checkPassword: (value, _, password) => {
        return value === password
    }
}

export const validator = (values, config) => {
    const error = {}

    for (const name in values) {
        const validationRules = config[name]
        for(const rule in validationRules) {
            const { message, value, ref } = validationRules[rule]
            const validate = validateRules[rule]

            const hasError = validate && !validate(values[name], value, values[ref])
            if(hasError) {
                error[name] = message
                break
            }
        }
    }

    return error
}