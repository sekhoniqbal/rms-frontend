import { useEffect, useState } from "react";
import { Link } from "wouter";
import { toast } from "react-hot-toast";
import DeleteButton from "../layout/delete-button";
import { deleteReferral, getReferrals } from "../../service/referral-service";
import { MaterialReactTable } from "material-react-table";
import ReferralTable from "../tables/referral-table";
import deleteItem from "../../others/delete-item";
import useFetch from "../../hooks/use-fetch";
import AddButton from "../layout/add-button";



export default function Referrals() {

    const [fetchInProgress, error, referrals, setReferrals] = useFetch(getReferrals);

    const onDelete = (id) => deleteItem({
        item: { id },
        asyncDeleteItem: deleteReferral,
        itemType: "referral",
        onSuccess: () => setReferrals(referrals.filter(r => r.id !== id))
    })

    return <div class="Referrals recent--referrals">
        <div class="title">
            <h2 class="section--title">All Referrals</h2>
            <AddButton name="referrals" />
        </div>
        {fetchInProgress ? <div>Fetching referral data....</div>
            : error ? <div>Failed to fetch referrals. Reason: {error}</div>
                : !referrals || referrals.length === 0 ? <div>No Referrals Exist</div>
                    : <ReferralTable
                        data={referrals}
                        onDelete={onDelete}
                        details
                        edit
                        initialState={{ sorting: [{ id: 'id', desc: true }] }}
                    />
        }
    </div>
}