import axios from 'axios';

const baseUrl = `http://localhost:8080/api/providers`;
export const getProviders = () => axios.get(baseUrl);
export const getProvider = (provider) => axios.get(baseUrl + `/${provider.id}`);
export const addProvider = (provider) => axios.post(baseUrl, provider);
export const updateProvider = (provider) => axios.put(baseUrl + `/${provider.id}`, provider);
export const deleteProvider = (provider) => axios.delete(baseUrl + `/${provider.id}`);
export const getProviderReferrals = (provider) => axios.get(baseUrl + `/${provider.id}/referrals`);


export default {
    getProviders,
    getProvider,
    addProvider,
    updateProvider,
    deleteProvider,
    getProviderReferrals
};






