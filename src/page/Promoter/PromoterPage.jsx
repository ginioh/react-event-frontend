import * as React from "react";
import withPromoterService from "../../service/Promoter";
import { CssBaseline, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import MaUTable from '@mui/material/Table'
import { useTable } from 'react-table'
import useDialog from "../../hook/useDialog";
import useData from "../../hook/useData";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreatePromoterDialog from "./dialog/CreatePromoterDialog";
import UpdatePromoterDialog from "./dialog/UpdatePromoterDialog";
import DeletePromoterDialog from "./dialog/DeletePromoterDialog";
import { AuthContext } from "../../context/Auth/authContext"
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

    const { isAuthorized } = React.useContext(AuthContext)

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

    const toolbarItems = [
        {
            name: "Create promoter",
            onClick: () => createDialog.handleOpen()
        }
    ]

    const onCreatePromoter = () => {}
    const onUpdatePromoter = () => {}
    const onDeletePromoter = () => {}

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
        <Typography variant="h4">{`Promoters`}</Typography>
        {isAuthorized(["admin"]) && <Toolbar objects={toolbarItems} />}
        <Table columns={columns} data={documents.docs} />
        <CreatePromoterDialog title="Create new promoter" dialog={createDialog} onSubmit={onCreatePromoter} />
        <UpdatePromoterDialog title="Edit promoter" dialog={updateDialog} onSubmit={onUpdatePromoter} />
        <DeletePromoterDialog title="Delete promoter" dialog={deleteDialog} onSubmit={onDeletePromoter} />
    </div>
}

export default withPromoterService(PromoterPage);