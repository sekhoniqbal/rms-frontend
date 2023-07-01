import { toast } from "react-hot-toast";
import { addReferral } from "../../service/referral-service";
import ReferralForm from "./referral-form";
import defaultFormErrorHandler from "../../others/default-form-error-handler";


async function handleSubmit(values, form) {
    await addReferral(values)
        .then(() => form.resetForm())
        .then(() => toast.success("Referral added successfully"))
        .catch(error => defaultFormErrorHandler(error, form));
}

const initialValues = {
    id: "",
    patientId: "",
    specialityId: "",
    providerId: ""
}
export default function AddReferral() {
    return (
        <div className="AddReferral">
            <ReferralForm
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                heading="Add Referral"
                submitLabel={"Add Referral"}
            />
        </div>
    )
}