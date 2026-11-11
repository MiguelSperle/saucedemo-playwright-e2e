interface ErrorMessages {
    authentication: {
        USERNAME_REQUIRED: string;
        PASSWORD_REQUIRED: string;
        INCORRECT_CREDENTIALS: string;
    };
    checkoutInformation: {
        FIRST_NAME_REQUIRED: string;
        LAST_NAME_REQUIRED: string;
        POSTAL_CODE_REQUIRED: string;
    }
}

export const errorMessages: ErrorMessages = {
    authentication: {
        USERNAME_REQUIRED: 'Epic sadface: Username is required',
        PASSWORD_REQUIRED: 'Epic sadface: Password is required',
        INCORRECT_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
    },
    checkoutInformation: {
        FIRST_NAME_REQUIRED: 'Error: First Name is required',
        LAST_NAME_REQUIRED: 'Error: Last Name is required',
        POSTAL_CODE_REQUIRED: 'Error: Postal Code is required'
    }
};