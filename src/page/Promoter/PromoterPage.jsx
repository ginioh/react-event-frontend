import * as React from "react";
import withPromoterService from "../../service/Promoter";
import CssBaseline from '@mui/material/CssBaseline'
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useTable } from 'react-table'
import useDialog from "../../hook/useDialog";
import useData from "../../hook/useData";

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <TableRow {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        </MaUTable>
    )
}

const PromoterPage = ({ readPromoters }) => {
    const documents = useData();
    const createDialog = useDialog();
    const updateDialog = useDialog();
    const deleteDialog = useDialog();

    const columns = [
        {
            Header: () => null,
            id: 'logo',
            cell: ({ row }) => <span>LOGO</span>
        },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Description',
            accessor: 'description'
        },
        {
            Header: 'Website',
            accessor: 'website'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
    ];

    React.useEffect(() => {
        readPromoters.refetch();
    }, [])

    React.useEffect(() => {
        if (readPromoters.data) {
            const docs = readPromoters.data
            const totalDocs = 0;
            documents.handleDocs(docs, totalDocs);
        }
    }, [readPromoters.data]);

    return <div>
        <CssBaseline />
        <Table columns={columns} data={[]} />
    </div>
}

export default withPromoterService(PromoterPage);