import { Link } from "wouter";
import providerService, { deleteProvider, getProviders } from "../../service/provider-service";
import ProviderTable from "../tables/provider-table";
import useFetch from "../../hooks/use-fetch";
import deleteItem from "../../others/delete-item";
import AddButton from "../layout/add-button";

export default function Providers() {
    const [fetchInProgress, error, providers, setProviders] = useFetch(providerService.getProviders);

    const onDelete = (id) => deleteItem({
        item: { id },
        asyncDeleteItem: deleteProvider,
        itemType: "provider",
        onSuccess: () => setProviders(providers.filter(p => p.id !== id)),
    })

    return <div class="Providers recent--providers">
        <div class="title">
            <h2 class="section--title">All Providers</h2>
            <AddButton name={"providers"}/>

        </div>
        {fetchInProgress ? <div>Fetching Provider data....</div>
            : error ? <div>Failed to fetch providers. Reason: {error}</div>
                : !providers || providers.length === 0 ? <div>No Providers Exist</div>
                    : <ProviderTable
                        data={providers}
                        onDelete={onDelete}
                        details
                        edit
                        initialState={{ sorting: [{ id: 'id', desc: true }] }}

                    />
        }
    </div>
}