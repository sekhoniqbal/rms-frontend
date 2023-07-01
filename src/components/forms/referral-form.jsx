import { ErrorMessage, Field, Form, Formik } from "formik";
import FormHeading from "./form-heading";
import { useEffect, useRef, useState } from "react";
import specialityService, { getSpecialities } from "../../service/speciality-service";
import { toast } from "react-hot-toast";
import { getProviders } from "../../service/provider-service";
import { getPatients } from "../../service/patient-service";
import useFetch from './../../hooks/use-fetch';

function getAvailableProviders(providers, specialityId) {
    return providers
        .filter(p => p.speciality.id == specialityId)
        .filter(p => p.isAcceptingPatients === true);
}

export default function ReferralForm({ heading, handleSubmit, initialValues, submitLabel }) {
    const [specialities, setSpecialities] = useState([]);
    const [providers, setProviders] = useState([]);
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getSpecialities()
            .then(response => setSpecialities(response.data.reverse()))
            .catch(error => toast.error(error.message))
        getProviders()
            .then(response => setProviders(response.data.reverse()))
            .catch(error => toast.error(error.message))
        getPatients()
            .then(response => setPatients(response.data.reverse()))
            .catch(error => toast.error(error.message))
    }, [])

    return <div className="AddReferral m-auto p-4 rounded" style={{ width: "350px", background: "white" }}>
        <FormHeading heading={heading} cancelUrl="/referrals" />
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}

        >
            {({ values, isSubmitting, setValues }) => {
                return (
                    < Form >
                        {/* select patient field */}
                        < div className="form-group mb-2" >
                            <label className="" htmlFor="patientId">Patient</label>
                            <Field as="select" className="form-control" name="patientId">
                                <option value="">Select Patient</option>
                                {patients.map(patient => (<option key={patient.id} value={patient.id}>{patient.name}-{patient.id}</option>))}

                            </Field>
                            <small className="text-danger">
                                <ErrorMessage name="patientId" />
                            </small>
                        </div>
                        {/* select speciality */}
                        <div className="form-group mb-2" >
                            <label className="" htmlFor="specialityId">Speciality</label>
                            <Field as="select" className="form-control" name="specialityId">
                                <option value="">Select Speciality</option>
                                {specialities.map(speciality => (<option key={speciality.id} value={speciality.id}>{speciality.name}</option>))}

                            </Field>
                            <small className="text-danger">
                                <ErrorMessage name="specialityId" />
                            </small>
                        </div>
                        {/* select Provider */}
                        <div className="form-group mb-2" >
                            <label className="" htmlFor="providerId">Provider</label>
                            <Field as="select" className="form-control" name="providerId">
                                <option value="">Select Provider</option>
                                {getAvailableProviders(providers, values.specialityId)
                                    .map(provider => (<option key={provider.id} value={provider.id}>{provider.name}-{provider.id}</option>))
                                }

                            </Field>
                            {values.specialityId && getAvailableProviders(providers, values.specialityId).length === 0 &&
                                <small className="text-danger">No providers available for selected speciality</small>
                            }
                            <small className="text-danger">
                                <ErrorMessage name="providerId" />
                            </small>
                        </div>
                        <SuggestedProvider 
                        specialityId={values.specialityId}
                        providerId={values.providerId}
                         onSelect={(id) => setValues({ ...values, providerId: id })} 
                         />
                        {/* submit button */}
                        <button type="submit" className="add" disabled={isSubmitting}>
                            {submitLabel}
                        </button>
                    </Form >
                )
            }
            }
        </Formik >
    </div >
}


function SuggestedProvider({ specialityId,providerId, onSelect }) {

    const [suggestedProvider, setSuggestedProvider] = useState();

    useEffect(() => {
        setSuggestedProvider();
        if (specialityId) {
            console.log("speciality id is ", specialityId)
            specialityService.getSuggestedProvider({ id: specialityId })
                .then(response => setSuggestedProvider(response.data))
                .catch(error => { })
        }
    }, [specialityId])
    return (
        <div className="form-group">
            {suggestedProvider && providerId!=suggestedProvider.id && <div>
                <small className="text-success">Suggested Provider: </small>
                <small >{suggestedProvider?.name}</small>
                <button className="ml-2 btn btn-link" onClick={e => { e.preventDefault(); onSelect(suggestedProvider.id); }}>
                    <small> Select </small>
                </button>
            </div>
            }
        </div>
    )
}