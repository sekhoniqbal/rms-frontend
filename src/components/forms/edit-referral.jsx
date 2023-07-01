import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getReferral, updateReferral } from "../../service/referral-service";
import ReferralForm from "./referral-form";
import defaultFormErrorHandler from "../../others/default-form-error-handler";

async function handleSubmit(values, form) {
    await updateReferral(values)
        .then(() => toast.success("Referral updated successfully"))
        .catch(error => defaultFormErrorHandler(error, form));
}

export default function EditReferral({ params: { id } }) {

    const [initialValues, setInitialValues] = useState();
    useEffect(() => {
        getReferral({ id })
            .then(({data}) =>  setInitialValues({
                id,
                patientId:data.patient.id,
                specialityId:data.speciality.id,
                providerId:data.provider.id
            }))
            .catch(error => toast.error(error.message))
    }, [])

    return (<div className="EditReferral">
        {initialValues && <ReferralForm
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            heading="Edit Referral"
            submitLabel="Update Referral"
        />}
    </div>
    )
}