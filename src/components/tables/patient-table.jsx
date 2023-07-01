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
export default function PatientTable({ data, details, edit, compact, onDelete, ...options }) {
    options = compact ? {...options, ...compactOptions}:options;
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
                accessorFn: (row) => ``,
                header: 'Settings',
                size: 150,
                Cell: ({ row, renderedCellValue }) => (
                    <span key={row.original.id}>
                        {details && <Link href={`/patients/${row.original.id}/details`}><i class="ri-edit-box-line more"></i></Link>}
                        {edit && <Link href={`/patients/${row.original.id}/edit`}><i class="ri-edit-line edit"></i></Link>}
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