type User = {
    credentials: {
        username: string;
        password: string;
    };
    personalInfo?: {
        firstName: string;
        lastName: string;
        postalCode: string;
    };
}

type UserKey = 'STANDARD_USER' | 'INVALID_USER';

export const users = {
    STANDARD_USER: {
        credentials: {
            username: 'standard_user',
            password: 'secret_sauce',
        },
        personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            postalCode: '12345'
        }
    },
    INVALID_USER: {
        credentials: {
            username: 'invalid_user',
            password: 'invalid_password',
        }
    }
} satisfies Record<UserKey, User>;
