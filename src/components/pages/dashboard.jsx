import { useState } from 'react';
import providers from '../../data/providers';
import useFetch from '../../hooks/use-fetch';
import patientService, { addPatient, deletePatient, getPatients } from '../../service/patient-service';
import providerService, { addProvider, getProvider, getProviders } from "../../service/provider-service";
import { addReferral, getReferrals } from '../../service/referral-service';
import { addSpeciality, getSpecialities } from '../../service/speciality-service';
import OverviewCard from '../layout/overview-card';
import AddButton from '../layout/add-button';
import PatientTable from '../tables/patient-table';
import deleteItem from './../../others/delete-item';
import ProviderTable from '../tables/provider-table';

const providerFilters = {
  all: doctor => true,
  available: doctor => doctor.isAcceptingPatients,
  unavailable: doctor => !doctor.isAcceptingPatients
}


export default function Dashboard() {
  const [fetchingPatients, errorPatients, patients, setPatients] = useFetch(getPatients);
  const [fetchingProviders, errorProviders, providers, setProviders] = useFetch(getProviders);
  const [fetchingSpecialities, errorSpecialities, specialities, setSpecialities] = useFetch(getSpecialities);
  const [fetchingReferrals, errorReferrals, referrals, setReferrals] = useFetch(getReferrals);
  const [providerFilter, setProviderFilter] = useState("all");

  const onPatientDelete = (id) => deleteItem({
    item: { id },
    asyncDeleteItem: patientService.deletePatient,
    itemType: "patient",
    onSuccess: () => setPatients(patients.filter(p => p.id !== id))
  })

  const onProviderDelete = (id) => deleteItem({
    item: { id },
    asyncDeleteItem: providerService.deleteProvider,
    itemType: "provider",
    onSuccess: () => setProviders(providers.filter(p => p.id !== id))
  })

  return <div className="Dashboard">
    
    <div className="overview">
      <div className="title">
        <h2 className="section--title">Overview</h2>
      </div>
      <div className="cards">
        <OverviewCard
          className={'card-1'}
          data={providers}
          error={errorProviders}
          fetching={fetchingProviders}
          heading={"Total Doctors"}
          icon={"user-2-line"}
        />
        <OverviewCard
          className={'card-2'}
          data={patients}
          error={errorPatients}
          fetching={fetchingPatients}
          heading={"Total Patients"}
          icon={"user-line"}
        />
        <OverviewCard
          className={'card-3'}
          data={specialities}
          error={errorSpecialities}
          fetching={fetchingSpecialities}
          heading={"Specialities"}
          icon={"calendar-2-line"}
        />
        <OverviewCard
          className={'card-4'}
          data={referrals}
          error={errorReferrals}
          fetching={fetchingReferrals}
          heading={"Total Referrals"}
          icon={"hotel-bed-line"}
        />
      </div>
    </div>
    <div className="doctors">
      <div className="title">
        <h2 className="section--title">Recent Providers</h2>

        <div className="doctors--right--btns">
          <select name="date" value={providerFilter} onChange={(e) => setProviderFilter(e.target.value)} id="date" className="dropdown doctor--filter">
            <option value="all">All Recent</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <AddButton name="providers" />
        </div>
      </div>
      {/* <div className="d-flex flex-wrap " style={{ gap: "20px" }}>
        {!providers || providers.length == 0 ? <div>No recent providers</div>
          : providers.sort((a, b) => b.id - a.id)
            .slice(0, 10)
            .filter(providerFilters[providerFilter])
            .map(provider => (
              <ProviderCard provider={provider} />
            ))}
      </div> */}
      {!providers || providers.length == 0 ? <div>No recent Providers</div>
        : <ProviderTable
          data={providers.sort((a, b) => b.id - a.id).slice(0, 10).filter(providerFilters[providerFilter])}
          onDelete={onProviderDelete}
          edit
          details
          compact

        />
      }
    </div>
    {/* patient section */}
    <div className="recent--patients">
      <div className="title">
        <h2 className="section--title">Recent Patients</h2>
        <AddButton name="patients" />
      </div>
      {!patients || patients.length == 0 ? <div>No recent Patients</div>
        : <PatientTable
          data={patients.sort((a, b) => b.id - a.id).slice(0, 5)}
          onDelete={onPatientDelete}
          edit
          details
          compact

        />
      }
    </div>
  </div>
}

function ProviderCard({ provider }) {
  return (
    <div className=' doctor--card p-1' style={{ width: "150px", borderWidth: "1px" }}>
      <div> <span className='' >{provider.name}</span></div>
      {provider.isAcceptingPatients ?
        <small style={{ fontSize: "0.6rem" }} className='text-success'>Available</small>
        : <small style={{ fontSize: "0.6rem" }} className='text-danger'>Not Available</small>
      }
      <span className='d-inline-block mt-1 text-secondary' style={{ fontSize: "0.7rem" }}  >{provider.speciality.name}</span>
    </div>
  )
}