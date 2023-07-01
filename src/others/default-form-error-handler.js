import { toast } from "react-hot-toast";

export default function defaultFormErrorHandler(error, form) {
    if (error.response.data) {
        form.setErrors(error.response.data?.fieldErrors);
        toast.error(error.response?.data?.message)
    }
    else {
        toast.error(error.response?.data?.message || error.message)
    }
}