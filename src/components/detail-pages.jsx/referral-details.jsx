import { Link, useLocation } from "wouter";
import referralService, { deleteReferral, getReferrals } from "../../service/referral-service";
import useFetch from "../../hooks/use-fetch";
import ReferralTable from "../tables/referral-table";
import deleteItem from "../../others/delete-item";


export default function ReferralDetails({ params: { id } }) {
    const [fetchInProgress, error, referral, setReferral] = useFetch(() => referralService.getReferral({ id }));
    const [location, setLocation] = useLocation();

    const onReferralDelete = (id) => deleteItem({
        item: { id },
        itemType: "referral",
        asyncDeleteItem: referralService.deleteReferral,
        onSuccess: () => setLocation("/referrals")

    })


    return <div class="Referrals recent--referrals">
        <div class="title ">
            <h2 class="section--title"> Referral Details</h2>
            <Link href="/referrals">
                <button class="add">View All</button>
            </Link>
        </div>
        <h4 class="section--title mt-5 ">Referral Info</h4>
        {fetchInProgress ? <div>Fetching referral data....</div>
            : error ? <div>Failed to fetch referral. Reason: {error}</div>
                : !referral ? <div>No referral details available</div>
                    : <ReferralTable
                        data={[referral]}
                        onDelete={onReferralDelete}
                        compact
                        edit
                    />
        }

    </div>
}