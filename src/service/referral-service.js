import axios from 'axios';
import getAPIServerURL from '../others/getAPIServerURL';

const baseUrl = `${getAPIServerURL()}/api/referrals`;
export const getReferrals = () => axios.get(baseUrl);
export const getReferral = (referral) => axios.get(baseUrl + `/${referral.id}`);
export const addReferral = (referral) => axios.post(baseUrl, referral);
export const updateReferral = (referral) => axios.put(baseUrl + `/${referral.id}`, referral);
export const deleteReferral = (referral) => axios.delete(baseUrl + `/${referral.id}`);



 const referralService = {
    getReferrals,
    getReferral,
    addReferral,
    updateReferral,
    deleteReferral,
};


export default referralService;

