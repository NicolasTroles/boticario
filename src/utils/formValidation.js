const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Campo obrigatório!'
    }
    if (!values.email) {
        errors.email = 'Campo obrigatório!'
    } else {
        var regex = /\S+@\S+\.\S+/;
        if (!regex.test(values.email)) {
            errors.email = 'Digite um email válido!'
        }
    }
    if (!values.password) {
        errors.password = 'Campo obrigatório!'
    }
    if (!values.cpf) {
        errors.cpf = 'Campo obrigatório!'
    } else if (values.cpf.length < 11) {
        errors.cpf = 'Preencha o CPF completo!'
    }

    if (!values.batchName) {
        errors.batchName = 'Campo obrigatório!'
    }
    if (!values.message) {
        errors.message = 'Campo obrigatório!'
    }
    if (!values.company) {
        errors.company = 'Campo obrigatório!'
    } else if (values.company === 'Selecione...') {
        errors.company = 'Campo obrigatório!'
    }
    if (!values.channel) {
        errors.channel = 'Campo obrigatório!'
    } else if (values.channel === 'Selecione...') {
        errors.channel = 'Campo obrigatório!'
    }

    if (!values.batchSize) {
        errors.batchSize = 'Campo obrigatório!'
    } else if (values.batchSize < 1) {
        errors.batchSize = 'O valor mínimo é 1!'
    }

    if (!values.cooldownTime) {
        errors.cooldownTime = 'Campo obrigatório!'
    } else if (values.cooldownTime < 1) {
        errors.cooldownTime = 'O valor mínimo é 1!'
    }


    // Purchase
    if (!values.codePurchase) {
        errors.codePurchase = 'Campo obrigatório!'
    }

    if (!values.datePurchase) {
        errors.datePurchase = 'Campo obrigatório!'
    } else if (values.datePurchase.length < 8) {
        errors.datePurchase = 'Preencha a data completa!'
    } else {
        if (values.datePurchase.substr(4, 4) > 2099 || values.datePurchase.substr(4, 4) < 1900 ||
            values.datePurchase.substr(2, 2) > 12 || values.datePurchase.substr(2, 2) <= 0 ||
            values.datePurchase.substr(0, 2) > 31 || values.datePurchase.substr(0, 2) <= 0
        ) {
            errors.datePurchase = 'Data inválida!'
        }
    }

    if (!values.valuePurchase) {
        errors.valuePurchase = 'Campo obrigatório!'
    }

    return errors;
}

export default validate;