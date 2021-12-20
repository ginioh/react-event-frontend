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
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreatePromoterDialog from "./dialog/CreatePromoterDialog";
import UpdatePromoterDialog from "./dialog/UpdatePromoterDialog";
import DeletePromoterDialog from "./dialog/DeletePromoterDialog";
import useAuth from "../../hook/useAuth";
import { Toolbar } from "../../component/Toolbar";

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
    const auth = useAuth();

    const columns = [
        {
            Header: () => null,
            id: 'logo',
            Cell: ({ row }) => <span>LOGO</span>
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
        {
            Header: 'Actions',
            id: 'actions',
            Cell: ({ row }) => <div>
                <IconButton onClick={() => updateDialog.handleOpen()}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteDialog.handleOpen()}>
                    <DeleteIcon />
                </IconButton>
            </div>
        },
    ];

    React.useEffect(() => {
        readPromoters.refetch();
    }, [])

    React.useEffect(() => {
        if (readPromoters.data) {
            const { data: docs } = readPromoters.data || []
            const totalDocs = 0;
            documents.handleDocs(docs, totalDocs);
        }
    }, [readPromoters.data]);

    return <div>
        <CssBaseline />
        {auth.getUserInfo() && <Toolbar objects={[
            {
                name: "Create promoter",
                onClick: () => createDialog.handleOpen()
            }
        ]} />}
        <Table columns={columns} data={documents.docs} />
        <CreatePromoterDialog title="Create new promoter" open={createDialog.open} onClose={createDialog.handleClose} />
        <UpdatePromoterDialog title="Edit promoter" open={updateDialog.open} onClose={updateDialog.handleClose} />
        <DeletePromoterDialog title="Delete promoter" open={deleteDialog.open} onClose={deleteDialog.handleClose} />
    </div>
}

export default withPromoterService(PromoterPage);