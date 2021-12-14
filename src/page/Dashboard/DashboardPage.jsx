import * as React from "react";
import CssBaseline from '@mui/material/CssBaseline'
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useTable } from 'react-table'
import withEventService from "../../service/Event";
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

const DashboardPage = ({readEvents}) => {
    const documents = useData();

    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'title'
            },
            {
                Header: 'Info',
                accessor: ''
            },
        ],
        []
    )

    React.useEffect(() => {
        readEvents.refetch();
    }, [])

    React.useEffect(() => {
        if (readEvents.data) {
            const docs = readEvents.data
            const totalDocs = 0;
            documents.handleDocs(docs, totalDocs);
        }
    }, [readEvents.data]);

    return (
        <div>
            <CssBaseline />
            <Table columns={columns} data={documents.docs || []} />
        </div>
    )
}

export default withEventService(DashboardPage);