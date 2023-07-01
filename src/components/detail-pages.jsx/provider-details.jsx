import { Link, useLocation } from "wouter";
import providerService, { deleteProvider, getProviders } from "../../service/provider-service";
import useFetch from "../../hooks/use-fetch";
import ReferralTable from "../tables/referral-table";
import ProviderTable from "../tables/provider-table";
import deleteItem from "../../others/delete-item";


export default function ProviderDetails({ params: { id } }) {
    const [fetchInProgress, error, provider, setPatsetient] = useFetch(() => providerService.getProvider({ id }));
    const [fetchReferralsInProgress, errorRefferals, referrals, setReferrals] = useFetch(() => providerService.getProviderReferrals({ id }));
    const [location, setLocation] = useLocation();

    const onProviderDelete = (id) => deleteItem({
        item: { id },
        itemType: "provider",
        asyncDeleteItem: providerService.deleteProvider,
        onSuccess: () => setLocation("/providers")

    })


    return <div class="Providers recent--providers">
        <div class="title">
            <h2 class="section--title"> Provider Details</h2>
            <Link href="/providers">
                <button class="add">View All</button>
            </Link>
        </div>
        <h4 class="section--title mt-5 ">Provider Info</h4>
        {fetchInProgress ? <div>Fetching provider data....</div>
            : error ? <div>Failed to fetch provider. Reason: {error}</div>
                : !provider ? <div>No provider details available</div>
                    : <ProviderTable data={[provider]}
                        onDelete={onProviderDelete}
                        edit
                        compact
                    />
        }
        <h4 class="section--title mt-5 ">Provider Referrals</h4>
        {fetchReferralsInProgress ? <div>Fetching referral data....</div>
            : errorRefferals ? <div className="text-danger">Failed to fetch referrals. Reason: {errorRefferals}</div>
                : !referrals || !referrals.length ? <div>This provider has no referrals</div>
                    :
                    <ReferralTable
                        data={referrals}
                        edit
                        details
                    />
        }
    </div>
}