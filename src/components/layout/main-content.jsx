import { Route, Switch } from "wouter";
import Dashboard from "../pages/dashboard";
import Referrals from "../pages/referrals";
import Specialities from '../pages/specialities';
import Providers from "../pages/providers";
import Patients from "../pages/patients";
import PatientDetails from "../detail-pages.jsx/patient-detials";
import ProviderDetails from "../detail-pages.jsx/provider-details";
import SpecialityDetails from "../detail-pages.jsx/speciality-details";
import EditPatient from "../forms/edit-patient";
import EditProvider from "../forms/edit-provider";
import EditSpeciality from "../forms/edit-speciality";
import EditReferral from "../forms/edit-referral";
import ReferralDetails from "../detail-pages.jsx/referral-details";
import AddPatient from './../forms/add-patient';
import AddProvider from './../forms/add-provider';
import AddSpeciality from './../forms/add-speciality';
import AddReferral from './../forms/add-referral';
import PageNotFound from "../pages/Page-not-found";
import populateDbWithData from "../../others/populate-db-with-data";

const MainContent = () => {
  return <div className="MainContent">
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/referrals" component={Referrals} />
      <Route path="/providers" component={Providers} />
      <Route path="/patients" component={Patients} />
      <Route path="/specialities" component={Specialities} />
      <Route>
      <button onClick={populateDbWithData}>Generate</button>
      </Route>

      <Route path="/patients/:id/details" component={PatientDetails} />
      <Route path="/providers/:id/details" component={ProviderDetails} />
      <Route path="/specialities/:id/details" component={SpecialityDetails} />
      <Route path="/referrals/:id/details" component={ReferralDetails} />

      <Route path="/patients/:id/edit" component={EditPatient} />
      <Route path="/providers/:id/edit" component={EditProvider} />
      <Route path="/specialities/:id/edit" component={EditSpeciality} />
      <Route path="/referrals/:id/edit" component={EditReferral} />

      <Route path="/patients/add" component={AddPatient} />
      <Route path="/providers/add" component={AddProvider} />
      <Route path="/specialities/add" component={AddSpeciality} />
      <Route path="/referrals/add" component={AddReferral} />
      <Route path="/:rest*" component={PageNotFound} />
    </Switch>

  </div>
}

export default MainContent;