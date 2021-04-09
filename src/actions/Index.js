export const userPass = (email, userToken) => {
    return {
        type: 'UserPass',
        payload: {
            email: email,
            token: userToken,
        }
    }
}