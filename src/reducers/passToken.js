const initState = {
    token: '',
    email: ''
}
const passToken = (state = initState, action) => {
    switch (action.type) {
        case 'UserPass': {
            return {
                email: action.payload.username,
                token: action.payload.token
            }
        }
        default:{
            return state;
        }
    }
}

export default passToken;