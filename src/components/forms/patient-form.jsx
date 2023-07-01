import { ErrorMessage, Field, Form, Formik } from "formik";
import FormHeading from "./form-heading";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, 'Name is too long')
      .required('Name is Required'),
 
  });

export default function PatientForm({ heading, handleSubmit, initialValues, submitLabel }) {

    return <div className="AddPatient m-auto p-4 rounded" style={{ width: "350px", background: "white" }}>
        <FormHeading heading={heading} cancelUrl="/patients" />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
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
                        <button type="submit" className="add" disabled={isSubmitting}>
                            {submitLabel}
                        </button>
                    </Form>
                )}
            </Formik>
    </div>
}