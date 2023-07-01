import { toast } from "react-hot-toast";
import { addProvider } from "../../service/provider-service";
import ProviderForm from "./provider-form";
import defaultFormErrorHandler from "../../others/default-form-error-handler";


async function handleSubmit(values, form) {
    await addProvider(values)
        .then(() => form.resetForm())
        .then(() => toast.success("Provider added successfully"))
        .catch(error => defaultFormErrorHandler(error, form));

}

const initialValues = {
    name: '',
    specialityId:"",
    isAcceptingPatients:true,
}
export default function AddProvider() {
    return (
        <div className="AddProvider">
            <ProviderForm
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                heading="Add Provider"
                submitLabel={"Add Provider"}
            />
        </div>
    )
}