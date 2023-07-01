import { ErrorMessage, Field, Form, Formik } from "formik";
import FormHeading from "./form-heading";
import { useEffect, useState } from "react";
import { getSpecialities } from "../../service/speciality-service";
import { toast } from "react-hot-toast";

export default function ProviderForm({ heading, handleSubmit, initialValues, submitLabel }) {
    const [specialities, setSpecialities] = useState([]);
    useEffect(() => {
        getSpecialities()
            .then(response => setSpecialities(response.data.reverse()))
            .catch(error => toast.error(error.message))
    }, [])

    return <div className="AddProvider m-auto p-4 rounded" style={{ width: "350px", background: "white" }}>
        <FormHeading heading={heading} cancelUrl="/providers" />
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group mb-2" >
                        <label className="" htmlFor="name">Name</label>
                        <Field className="form-control" name="name" placeholder="Jane" />
                        <small className="text-danger">
                            <ErrorMessage name="name" />
                        </small>
                    </div>
                    <div className="form-group mb-2" >
                        <label className="" htmlFor="specialityId">Speciality</label>
                        <Field as="select" className="form-control" name="specialityId">
                            <option value="">Select Speciality</option>
                            {specialities.map(speciality=>( <option key={speciality.id} value={speciality.id}>{speciality.name}</option>))}
                            
                        </Field>
                        <small className="text-danger">
                            <ErrorMessage name="specialityId" />
                        </small>
                    </div>
                    <div className="form-group mb-2" >
                        <Field className="mr-2" type ="checkbox" name="isAcceptingPatients" placeholder="Jane" />
                        <label className="" htmlFor="isAcceptingPatients">Is Accepting New Patients</label>
                        <small className="text-danger">
                            <ErrorMessage name="isAcceptingPatients" />
                        </small>
                    </div>
                    <button type="submit" className="add" disabled={isSubmitting}>
                        {submitLabel}
                    </button>
                </Form>
            )}
        </Formik>
    </div>
}