import { Link } from "wouter";
import { deletePatient, getPatients } from "../../service/patient-service";
import useFetch from "../../hooks/use-fetch";
import PatientTable from "../tables/patient-table";
import deleteItem from "../../others/delete-item";
import AddButton from "../layout/add-button";


export default function Patients() {
    const [patientFetchInProgress, patientError, patients, setPatients] = useFetch(getPatients);

    const onDelete = (id) => deleteItem({
        item: { id },
        asyncDeleteItem: deletePatient,
        itemType: "patient",
        onSuccess: () => setPatients(patients.filter(p => p.id !== id)),
    })

    return <div class="Patients recent--patients">
        <div class="title">
            <h2 class="section--title">All Patients</h2>
            <AddButton name={"patients"}/>
        </div>
        {patientFetchInProgress ? <div>Fetching patient data....</div>
            : patientError ? <div>Failed to fetch patients. Reason: {patientError}</div>
                : !patients || patients.length === 0 ? <div>No Patients Exist</div>
                    : <PatientTable
                        data={patients}
                        onDelete={onDelete}
                        details
                        edit
                        initialState={{ sorting: [{ id: 'id', desc: true }] }}

                    />
        }
    </div>
}