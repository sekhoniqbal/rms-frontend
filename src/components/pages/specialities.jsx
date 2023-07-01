import { Link } from "wouter";
import { deleteSpeciality, getSpecialities } from "../../service/speciality-service";
import SpecialityTable from "../tables/speciality-table";
import useFetch from "../../hooks/use-fetch";
import deleteItem from "../../others/delete-item";
import AddButton from "../layout/add-button";

export default function Specialities() {
    const [specialityFetchInProgress, specialityError, specialities, setSpecialities] = useFetch(getSpecialities);

    const onDelete = (id) => deleteItem({
        item: { id },
        asyncDeleteItem: deleteSpeciality,
        itemType: "speciality",
        onSuccess: () => setSpecialities(specialities.filter(p => p.id !== id)),
    })

    return <div class="Specialities recent--specialities">
        <div class="title">
            <h2 class="section--title">All Specialities</h2>
            <AddButton name="specialities" />
        </div>
        {specialityFetchInProgress ? <div>Fetching speciality data....</div>
            : specialityError ? <div>Failed to fetch specialities. Reason: {specialityError}</div>
                : !specialities || specialities.length === 0 ? <div>No Specialities Exist</div>
                    : <SpecialityTable
                        data={specialities}
                        onDelete={onDelete}
                        details
                        edit
                        initialState={{ sorting: [{ id: 'id', desc: true }] }}
                    />
        }
    </div>
}