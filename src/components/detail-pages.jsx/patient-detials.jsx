import { Link, useLocation } from "wouter";
import patientService, { deletePatient, getPatients } from "../../service/patient-service";
import useFetch from "../../hooks/use-fetch";
import ReferralTable from "../tables/referral-table";
import PatientTable from "../tables/patient-table";
import deleteItem from "../../others/delete-item";


export default function PatientDetails({ params: { id } }) {
    const [fetchInProgress, error, patient, setPatient] = useFetch(() => patientService.getPatient({ id }));
    const [fetchReferralsInProgress, errorRefferals, referrals, setReferrals] = useFetch(() => patientService.getPatientReferrals({ id }));
    const [location, setLocation] = useLocation();

    const onPatientDelete = (id) => deleteItem({
        item: { id },
        itemType: "patient",
        asyncDeleteItem: patientService.deletePatient,
        onSuccess: () => setLocation("/patients")

    })


    return <div className="Patients recent--patients">
        <div className="title ">
            <h2 className="section--title"> Patient Details</h2>
            <Link href="/patients">
                <button className="add">View All</button>
            </Link>
        </div>
        <h4 className="section--title mt-5 ">Patient Info</h4>
        {fetchInProgress ? <div>Fetching patient data....</div>
            : error ? <div>Failed to fetch patient. Reason: {error}</div>
                : !patient ? <div>No patient details available</div>
                    : <PatientTable
                        data={[patient]}
                        onDelete={onPatientDelete}
                        compact
                        edit
                    />
        }
        <h4 className="section--title mt-5 ">Patient Referrals</h4>
        {fetchReferralsInProgress ? <div>Fetching referral data....</div>
            : errorRefferals ? <div className="text-danger">Failed to fetch referrals. Reason: {errorRefferals}</div>
                : !referrals || !referrals.length ? <div>This patient has no referrals</div>
                    :
                    <ReferralTable
                        data={referrals}
                        edit
                        details
                    />
        }
    </div>
}