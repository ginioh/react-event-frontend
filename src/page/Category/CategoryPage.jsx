import * as React from "react";
import { get } from "lodash-es";
import withCategoryService from "../../service/Category";
import { CssBaseline, Icon, IconButton, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import MaUTable from '@mui/material/Table'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTable } from 'react-table'
import useDialog from "../../hook/useDialog";
import useData from "../../hook/useData";
import { Toolbar } from "../../component/Toolbar";
import CreateCategoryDialog from "./dialog/CreateCategoryDialog";
import UpdateCategoryDialog from "./dialog/UpdateCategoryDialog";
import DeleteCategoryDialog from "./dialog/DeleteCategoryDialog";
import { AuthContext } from "../../context/Auth/authContext";

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

const CategoryPage = ({ readCategories, createCategory }) => {
    const documents = useData();
    const createDialog = useDialog();
    const updateDialog = useDialog();
    const deleteDialog = useDialog();

    const { isAuthorized } = React.useContext(AuthContext);

    const onCreateCategory = async (values) => {
        await createCategory({
            data: values,
            createSuccessCb: () => {
                createDialog.handleClose()
            }
        });
    };

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
            Cell: ({ row }) => {
            // return <Icon>{`${row.original.icon}`}</Icon>
            return <Icon>{`music_note`}</Icon>
            }
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
            const docs = get(readCategories, "data.data", []);
            const totalDocs = 0;
            documents.handleDocs(docs, totalDocs);
        }
    }, [readCategories.data]);

    return <div>
        <CssBaseline />
        <Typography variant="h4">{`Categories`}</Typography>
        {isAuthorized(["admin"]) && <Toolbar objects={[
            {
                name: "Create category",
                onClick: () => createDialog.handleOpen()
            }
        ]} />}
        <Table columns={columns} data={documents.docs} />
        <CreateCategoryDialog
            title="Create category"
            dialog={createDialog}
            onSubmit={onCreateCategory}
        />
        <UpdateCategoryDialog title="Edit category" dialog={updateDialog} onSubmit={onCreateCategory} />
        <DeleteCategoryDialog title="Delete category" dialog={deleteDialog} onSubmit={onCreateCategory} />
    </div>
}

export default withCategoryService(CategoryPage);