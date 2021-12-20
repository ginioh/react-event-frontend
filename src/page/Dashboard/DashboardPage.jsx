import * as React from "react";
import { CssBaseline, IconButton, Link, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import MaUTable from '@mui/material/Table'
import { useTable } from 'react-table'
import withEventService from "../../service/Event";
import useData from "../../hook/useData";
import EventItem from "../../component/Dashboard/EventItem/EventItem";
import styles from "./DashboardPage.module.scss";
import useAuth from "../../hook/useAuth";
import { Toolbar } from "../../component/Toolbar";
import useDialog from "../../hook/useDialog";
import CreateEventDialog from "./dialog/CreateEventDialog";
import UpdateEventDialog from "./dialog/UpdateEventDialog";
import DeleteEventDialog from "./dialog/DeleteEventDialog";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import WifiIcon from '@mui/icons-material/Wifi';
import moment from "moment";

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

const DashboardPage = ({ readEvents }) => {
    const pre = "dashboard-page-";

    const onCreateEvent = async (values) => {
        console.log('hit')
        console.log(values)
    };

    const documents = useData();
    const auth = useAuth();
    const createDialog = useDialog();
    const updateDialog = useDialog();
    const deleteDialog = useDialog();

    const columns = [
        {
            Header: () => null,
            id: 'logo',
            Cell: ({ row }) => <div><img src={row.original.featuredImage} height={50} /></div>
        },
        {
            Header: 'Title',
            accessor: 'title'
        },
        {
            Header: 'Description',
            accessor: 'description'
        },
        {
            Header: 'Date',
            id: 'startDate',
            Cell: ({ row }) => <div className="flex-row"><div className="flex-column">
                <span>{moment(row.original.startDate).format("DD/MM/YYYY HH:mm")}</span>
                <span>{moment(row.original.endDate).format("DD/MM/YYYY HH:mm")}</span>
            </div>
                <span className="flex-row"><AvTimerIcon />{`${Math.ceil(row.original.duration / 60000)}min`}</span>
            </div>
        },
        {
            Header: "Category",
            accessor: "category.name",
            Cell: ({ row }) => <div className="category-chip">
                <span>{row.original.category.name}</span>
            </div>
        },
        {
            Header: "Promoter",
            accessor: "promoter.name",
            Cell: ({ row }) => <Link href={row.original.promoter.website}>{row.original.promoter.name}</Link>
        },
        {
            Header: 'Public',
            id: "isPublic",
            Cell: ({ row }) => row.original.isPublic ? <PublicIcon /> : <LockIcon />
        },
        {
            Header: 'Offline',
            id: "isOffline",
            Cell: ({ row }) => row.original.isOffline ? <GroupsIcon /> : <WifiIcon />
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

    const init = async () => {
        await readEvents.refetch();
    }
    React.useEffect(() => {
        init();
    }, [])

    React.useEffect(() => {
        if (readEvents.data) {
            const { data: docs } = readEvents.data || []
            const totalDocs = 0;
            documents.handleDocs(docs, totalDocs);
        }
    }, [readEvents.data]);

    return (
        <>
            <CssBaseline />
            {auth.getUserInfo() && <Toolbar objects={[
                {
                    name: "Aggiungi evento",
                    onClick: () => createDialog.handleOpen()
                }
            ]} />}
            <Table columns={columns} data={documents.docs} />
            {/* <div className={styles[`${pre}container`]}>
                {documents.docs && documents.docs.length && documents.docs.map((d, i) => <EventItem key={`${d.title}-${i}`} event={d} />)}
            </div> */}
            <CreateEventDialog
                title="Create event"
                open={createDialog.open}
                onClose={createDialog.handleClose}
                onSubmit={onCreateEvent}
            />
            <UpdateEventDialog
                title="Update event"
                open={updateDialog.open}
                onClose={updateDialog.handleClose}
                onSubmit={onCreateEvent}
            />
            <DeleteEventDialog
                title="Delete event"
                open={deleteDialog.open}
                onClose={deleteDialog.handleClose}
                onSubmit={onCreateEvent}
            />
        </>
    )
}

export default withEventService(DashboardPage);