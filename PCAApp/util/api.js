import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.timeout = 10000; 
async function setAuthToken() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

setAuthToken();

export default axios;
