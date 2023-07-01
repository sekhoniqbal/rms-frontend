import { useMemo } from "react"
import { Link } from "wouter";
import DeleteButton from "../layout/delete-button";
import { MaterialReactTable } from "material-react-table";
let compactOptions = {
    initialState: { density: 'compact', sorting: [{ id: 'id', desc: true }] },
    
    enablePagination: false,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
}
export default function ReferralTable({ data, onDelete, details, edit, compact, ...options }) {
    options = compact ? {...options, ...compactOptions}:options;
    const columns = useMemo(() =>
        [
            {
                accessorKey: 'id',
                header: 'Id',
                size: 150,

            }, {
                accessorKey: 'patient.name',
                header: 'Patient',
                size: 150,
            }, {
                accessorKey: 'provider.name',
                header: 'Provider(Accepting Patients)',
                size: 150,
                Cell: ({ renderedCellValue, row }) => (
                    <div key={row.original.id}>
                        {renderedCellValue}
                        {row.original.provider.isAcceptingPatients ? <small className="text-success">(yes)</small> : <small className="text-danger">(no)</small>}

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
                    {details && <Link href={`/referrals/${row.original.id}/details`}><i title="Details" className="ri-edit-box-line more"></i></Link>}
                    {edit && <Link href={`/referrals/${row.original.id}/edit`}><i title="Edit" className="ri-edit-line edit"></i></Link>}
                    {onDelete && <DeleteButton onDelete={() => onDelete(row.original.id)} />}
                </span>
                )
            }
        ], [onDelete,details,edit]);
    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            {...options}
        />
    )
}