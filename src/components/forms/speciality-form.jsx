import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { addSpeciality } from "../../service/speciality-service";
import { toast } from "react-hot-toast";
import FormHeading from "./form-heading";

export default function SpecialityForm({ heading, handleSubmit, initialValues, submitLabel }) {

    return <div className="SpecialityForm  m-auto p-4 rounded" style={{ width: "350px", background: "white" }}>
        <FormHeading heading={heading} cancelUrl="/specialities" />
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group mb-2" >
                        <label className="" htmlFor="name">Name</label>
                        <Field className="form-control" name="name" placeholder="Dermatology" />
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