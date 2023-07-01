import axios from 'axios';

const baseUrl = `http://localhost:8080/api/referrals`;
export const getReferrals = () => axios.get(baseUrl);
export const getReferral = (referral) => axios.get(baseUrl + `/${referral.id}`);
export const addReferral = (referral) => axios.post(baseUrl, referral);
export const updateReferral = (referral) => axios.put(baseUrl + `/${referral.id}`, referral);
export const deleteReferral = (referral) => axios.delete(baseUrl + `/${referral.id}`);



export default {
    getReferrals,
    getReferral,
    addReferral,
    updateReferral,
    deleteReferral,
};




