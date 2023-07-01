import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getProvider, updateProvider } from "../../service/provider-service";
import ProviderForm from "./provider-form";
import defaultFormErrorHandler from "../../others/default-form-error-handler";

async function handleSubmit(values, form) {
    await updateProvider(values)
        .then(() => toast.success("Provider updated successfully"))
        .catch(error => defaultFormErrorHandler(error, form));
    }



export default function EditProvider({ params: { id } }) {

    const [initialValues, setInitialValues] = useState();
    useEffect(() => {
        getProvider({ id })
            .then(({data}) => setInitialValues({
                id,
                name:data.name,
                specialityId:data.speciality.id,
                isAcceptingPatients: data.isAcceptingPatients
            }))
            .catch(error => toast.error(error.message))
    }, [])

    return (<div className="EditProvider">
        {initialValues && <ProviderForm
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            heading="Edit Provider"
            submitLabel="Update Provider"
        />}
    </div>
    )
}