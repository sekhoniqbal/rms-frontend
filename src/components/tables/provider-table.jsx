import { useMemo } from "react"
import { Link } from "wouter";
import DeleteButton from "../layout/delete-button";
import { MaterialReactTable } from "material-react-table";
let compactOptions = {
    initialState: { density: 'compact' },
    enablePagination: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
}
export default function ProviderTable({ data, details, edit, compact, onDelete, ...options }) {
    options = compact ? { ...options, ...compactOptions } : options;
    const columns = useMemo(() =>
        [
            {
                accessorKey: 'id',
                header: 'Id',
                size: 150,

            }, {
                accessorKey: 'name',
                header: 'Name',
                size: 150,
            }, {
                accessorKey: 'isAcceptingPatients',
                header: 'Accepting New Patients',
                size: 150,
                Cell: ({ renderedCellValue, row }) => (
                    <div key={row.original.id}>
                        {renderedCellValue ? <span className="text-success">Yes</span> : <span className="text-danger">No</span>}
                    </div>
                )
            },
            {
                accessorKey: 'speciality.name',
                header: 'Speciality',
                size: 150,
            },
            {

                accessorFn: (row) => ``,
                header: 'Settings',
                size: 150,
                Cell: ({ row }) => (
                    <span key={row.original.id}>
                        {details && <Link href={`/providers/${row.original.id}/details`}><i class="ri-edit-box-line more"></i></Link>}
                        {edit && <Link href={`/providers/${row.original.id}/edit`}><i class="ri-edit-line edit"></i></Link>}
                        {onDelete && <DeleteButton onDelete={() => onDelete(row.original.id)} />}
                    </span>
                )
            }
        ], []);
    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            {...options}
        />
    )
}