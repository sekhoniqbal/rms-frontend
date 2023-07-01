import { toast } from "react-hot-toast";
import { addSpeciality } from "../../service/speciality-service";
import SpecialityForm from "./speciality-form";
import defaultFormErrorHandler from "../../others/default-form-error-handler";


async function handleSubmit(values, form) {
    await addSpeciality(values)
        .then(() => form.resetForm())
        .then(() => toast.success("Speciality added successfully"))
        .catch(error => defaultFormErrorHandler(error, form));
}

const initialValues = {
    name: '',
}
export default function AddSpeciality() {
    return (
        <div className="AddSpeciality">
            <SpecialityForm
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                heading="Add Speciality"
                submitLabel={"Add Speciality"}
            />
        </div>
    )
}