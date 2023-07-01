import { Link, useLocation } from "wouter";
import specialityService, { deleteSpeciality, getSpecialitys } from "../../service/speciality-service";
import useFetch from "../../hooks/use-fetch";
import ReferralTable from "../tables/referral-table";
import SpecialityTable from "../tables/speciality-table";
import deleteItem from "../../others/delete-item";
import ProviderTable from '../tables/provider-table';


export default function SpecialityDetails({ params: { id } }) {
    const [spcialityFetchInProgress, specialityError, speciality, setSpeciality] = useFetch(() => specialityService.getSpeciality({ id }));
    const [referralFetchInProgress, referralError, referrals, setReferrals] = useFetch(() => specialityService.getSpecialityReferrals({ id }));
    const [providerFetchInProgress, providerError, providers, setProviders] = useFetch(() => specialityService.getSpecialityProviders({ id }));
    const [location, setLocation] = useLocation();

    const onSpecialityDelete = (id) => deleteItem({
        item: { id },
        itemType: "speciality",
        asyncDeleteItem: specialityService.deleteSpeciality,
        onSuccess: () => setLocation("/specialities")

    })


    return <div class="Specialitys recent--specialitys">
        <div class="title">
            <h2 class="section--title"> Speciality Details</h2>
            <Link href="/specialitys">
                <button class="add">View All</button>
            </Link>
        </div>
        <h4 class="section--title mt-5 ">Speciality Info</h4>
        {spcialityFetchInProgress ? <div>Fetching speciality data....</div>
            : specialityError ? <div>Failed to fetch speciality. Reason: {specialityError}</div>
                : !speciality ? <div>No speciality details available</div>
                    : <SpecialityTable
                        data={[speciality]}
                        onDelete={onSpecialityDelete}
                        compact
                        edit
                    />
        }
        <h4 class="section--title mt-5 ">Speciality Referrals</h4>
        {referralFetchInProgress ? <div>Fetching referral data....</div>
            : referralError ? <div className="text-danger">Failed to fetch referrals. Reason: {referralError}</div>
                : !referrals || !referrals.length ? <div>This speciality has no referrals</div>
                    :
                    <ReferralTable
                        data={referrals}
                        edit
                        details
                    />
        }

        <h4 class="section--title mt-5 ">Speciality Providers</h4>
        {providerFetchInProgress ? <div>Fetching referral data....</div>
            : providerError ? <div className="text-danger">Failed to fetch referrals. Reason: {providerError}</div>
                : !providers || !providers.length ? <div>This speciality has no referrals</div>
                    :
                    <ProviderTable
                        data={providers}
                        edit
                        details
                    />
        }
    </div>
}