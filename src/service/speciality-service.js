import axios from 'axios';
import getAPIServerURL from '../others/getAPIServerURL';

const baseUrl = `${getAPIServerURL()}/api/specialities`;
export const getSpecialities = () => axios.get(baseUrl);
export const getSpeciality = (speciality) => axios.get(baseUrl + `/${speciality.id}`);
export const addSpeciality = (speciality) => axios.post(baseUrl, speciality);
export const updateSpeciality = (speciality) => axios.put(baseUrl + `/${speciality.id}`, speciality);
export const deleteSpeciality = (speciality) => axios.delete(baseUrl + `/${speciality.id}`);
export const getSpecialityReferrals = (speciality) => axios.get(baseUrl + `/${speciality.id}/referrals`);
export const getSpecialityProviders = (speciality) => axios.get(baseUrl + `/${speciality.id}/providers`);
export const getSuggestedProvider = (speciality) => axios.get(baseUrl + `/${speciality.id}/suggestedProvider`);

export default {
    getSpecialities,
    getSpeciality,
    addSpeciality,
    updateSpeciality,
    deleteSpeciality,
    getSpecialityReferrals,
    getSpecialityProviders,
    getSuggestedProvider
};






