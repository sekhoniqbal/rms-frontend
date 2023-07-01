import { toast } from "react-hot-toast";
import { getSpeciality, updateSpeciality } from "../../service/speciality-service";
import SpecialityForm from "./speciality-form";
import { useEffect, useState } from "react";
import { getPatient } from "../../service/patient-service";
import defaultFormErrorHandler from "../../others/default-form-error-handler";

async function handleSubmit(values, form) {
    await updateSpeciality(values)
        .then(() => toast.success("Speciality added successfully"))
        .catch(error => defaultFormErrorHandler(error, form));
    }

const initialValues = {
    name: '',
}
export default function EditSpeciality({ params: { id } }) {

    const [initialValues, setInitialValues] = useState();
    useEffect(() => {
        getSpeciality({ id })
            .then(response => setInitialValues(response.data))
            .catch(error => toast.error(error.message))
    }, [])

    return (<div className="EditSpeciality">
        {initialValues && <SpecialityForm
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            heading="Edit Speciality"
            submitLabel="Update Speciality"
        />}
    </div>
    )
}