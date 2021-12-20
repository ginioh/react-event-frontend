import * as React from "react";
import withCategoryService from "../../service/Category";
import { CssBaseline, IconButton } from '@mui/material'
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table'
import useDialog from "../../hook/useDialog";
import useData from "../../hook/useData";
import useAuth from "../../hook/useAuth";
import { Toolbar } from "../../component/Toolbar";
import CreateCategoryDialog from "./dialog/CreateCategoryDialog";
import UpdateCategoryDialog from "./dialog/UpdateCategoryDialog";
import DeleteCategoryDialog from "./dialog/DeleteCategoryDialog";

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

const CategoryPage = ({ readCategories }) => {
    const documents = useData();
    const auth = useAuth();
    const createDialog = useDialog();
    const updateDialog = useDialog();
    const deleteDialog = useDialog();

    const onCreateCategory = () => { };

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
            Header: 'Icon',
            id: 'icon',
            Cell: ({ row }) => <img src={row.original.logo} />
        },
        {
            Header: 'Actions',
            id: 'actions',
            Cell: ({ row }) => <div>
                <IconButton onClick={() => updateDialog.handleOpen(row.original._id)}>
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteDialog.handleOpen()}>
                    <DeleteIcon />
                </IconButton>
            </div>
        },
    ];

    const init = async () => {
        await readCategories.refetch();
    }
    React.useEffect(() => {
        init();
    }, [])

    React.useEffect(() => {
        if (readCategories.data) {
            const { data: docs } = readCategories.data || []
            const totalDocs = 0;
            documents.handleDocs(docs, totalDocs);
        }
    }, [readCategories.data]);

    return <div>
        <CssBaseline />
        {auth.getUserInfo() && <Toolbar objects={[
            {
                name: "Create category",
                onClick: () => createDialog.handleOpen()
            }
        ]} />}
        <Table columns={columns} data={documents.docs} />
        <CreateCategoryDialog
            title="Create category"
            open={createDialog.open}
            onClose={createDialog.handleClose}
            onSubmit={onCreateCategory}
        />
        <UpdateCategoryDialog title="Edit category" dialog={updateDialog} onSubmit={onCreateCategory} />
        <DeleteCategoryDialog title="Delete category" open={deleteDialog.open} onClose={deleteDialog.handleClose} onSubmit={onCreateCategory} />
    </div>
}

export default withCategoryService(CategoryPage);