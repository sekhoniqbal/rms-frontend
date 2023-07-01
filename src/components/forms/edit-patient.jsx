import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getPatient, updatePatient } from "../../service/patient-service";
import PatientForm from "./patient-form";
import defaultFormErrorHandler from "../../others/default-form-error-handler";

async function handleSubmit(values, form) {
    await updatePatient(values)
        .then(() => toast.success("Patient updated successfully"))
        .catch(error => defaultFormErrorHandler(error, form));
}

export default function EditPatient({ params: { id } }) {

    const [initialValues, setInitialValues] = useState();
    useEffect(() => {
        getPatient({ id })
            .then(response => setInitialValues(response.data))
            .catch(error => toast.error(error.message))
    }, [])

    return (<div className="EditPatient">
        {initialValues && <PatientForm
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            heading="Edit Patient"
            submitLabel="Update Patient"
        />}
    </div>
    )
}