import specialities from '../data/specialities.json';
import patients from '../data/patients.json';
import providerss from '../data/providers.json';
import { addSpeciality } from '../service/speciality-service';
import { addPatient } from '../service/patient-service';
import { addProvider, getProvider } from '../service/provider-service';
import { addReferral } from '../service/referral-service';

export default async function populateDbWithData() {
    for (const item of specialities.slice(0, 20)) {
        await addSpeciality(item).catch(() => { });;
    }
    for (const item of patients) {
        await addPatient(item).catch(() => { });;
    }
    for (const item of providerss) {
        await addProvider(item).catch(() => { });
    }

    for (const _ of Array(500).fill(0)) {
        let specialityId = 0;
        let isAcceptingPatients = false;
        let providerId = Math.ceil(Math.random() * 120);
        let patientId = Math.ceil(Math.random() * 999);

        await getProvider({ id: providerId })
            .then(r => { specialityId = r.data.speciality.id; isAcceptingPatients = r.data.isAcceptingPatients })
            .catch(() => { })
        if (specialityId && isAcceptingPatients)
            await addReferral({ patientId, specialityId, providerId }).catch(() => { });
    }

}
