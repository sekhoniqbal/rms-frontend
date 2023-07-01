import { toast } from "react-hot-toast";
import { addPatient } from "../../service/patient-service";
import PatientForm from "./patient-form";
import defaultFormErrorHandler from "../../others/default-form-error-handler";


async function handleSubmit(values, form) {
    await addPatient(values)
        .then(() => form.resetForm())
        .then(() => toast.success("Patient added successfully"))
        .catch(error => defaultFormErrorHandler(error, form));
}

const initialValues = {
    name: '',
}
export default function AddPatient() {
    return (
        <div className="AddPatient">
            <PatientForm
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                heading="Add Patient"
                submitLabel={"Add Patient"}
            />
        </div>
    )
}