import api from '../services/api';
import { SIGNED_USER, SIGN_USER_FAILED, UNSIGNED_USER } from '../reducers/types';
import jwtDecode from 'jwt-decode';

export const signIn = async(dispatch, credentials) => {
    try {
        const response = await api.post('/user/signin', credentials);
        const { token } = response.data
        if (token) {
            localStorage.setItem('mybox_token', token);
            const user = jwtDecode(token);
            localStorage.setItem('mybox_user', JSON.stringify(user));    
            dispatch({ type: SIGNED_USER, payload: user })
        } else {
            dispatch({ type: SIGN_USER_FAILED, payload: response.data.message })
        }    
    } catch(err) {
        dispatch({ type: SIGN_USER_FAILED, payload: err.message })
    }
} 

export const checkAuth = async dispatch => {
    const token = localStorage.getItem('mybox_token');
    if (token) {
        try {
            await api.get('/token');
            const user = jwtDecode(token);        
            dispatch({ type: SIGNED_USER, payload: user });
        } catch(err) {
            dispatch({ type: SIGN_USER_FAILED, payload: err.message })
        }
    } else {
        dispatch({ type: UNSIGNED_USER })
    }
}