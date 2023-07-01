import axios from 'axios';
import getAPIServerURL from '../others/getAPIServerURL';


const baseUrl = `${getAPIServerURL()}/api/patients`;
export const getPatients = () => axios.get(baseUrl);
export const getPatient = (patient) => console.log(patient) || axios.get(baseUrl + `/${patient.id}`);
export const addPatient = (patient) => axios.post(baseUrl, patient);
export const updatePatient = (patient) => axios.put(baseUrl + `/${patient.id}`, patient);
export const deletePatient = (patient) => axios.delete(baseUrl + `/${patient.id}`);
export const getPatientReferrals = (patient) => axios.get(baseUrl + `/${patient.id}/referrals`);

export default {
    getPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletePatient,
    getPatientReferrals
};






