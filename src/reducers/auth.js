export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
        return {
            uid: action.uid
        };

        case 'LOOUT':
        return {  }

        default:
            return state;
    }
}