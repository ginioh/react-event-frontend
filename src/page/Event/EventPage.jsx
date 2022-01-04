import * as React from "react";
import { get, isEmpty } from "lodash-es";
import { CssBaseline, Link, TableBody, TableCell, TableHead, TableRow, Typography, TablePagination, TableFooter } from '@mui/material';
import MaUTable from '@mui/material/Table'
import { usePagination, useTable } from 'react-table'
import withEventService from "../../service/Event";
import useData from "../../hook/useData";
import styles from "./EventPage.module.scss";
import { Toolbar } from "../../component/Toolbar";
import useDialog from "../../hook/useDialog";
import { CreateEventDialog, UpdateEventDialog, DeleteEventDialog } from "./dialog";
import AvTimerIcon from '@mui/icons-material/AvTimer';
import LockIcon from '@mui/icons-material/Lock';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PublicIcon from '@mui/icons-material/Public';
import GroupsIcon from '@mui/icons-material/Groups';
import WifiIcon from '@mui/icons-material/Wifi';
import moment from "moment";
import { TableActions } from "../../component/TableActions";
import { AuthContext } from "../../context/Auth/authContext";


const Table = ({ columns, data, fetchData,
    loading, pageCount: controlledPageCount }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize } } = useTable({
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount: controlledPageCount
        }, usePagination)

    // console.log('page', page, '\ncanPreviousPage', canPreviousPage, '\ncanNextPage', canNextPage, '\npageCount', controlledPageCount);

    const handleChangePage = (event, newPage) => {
        gotoPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const size = parseInt(event.target.value, 10);
        setPageSize(size)
        gotoPage(0);
    };

    // const { filters, setFilters } = useFilters();

    // React.useEffect(() => {
    //     setFilters({
    //         ...filters,
    //         limit: pageSize,
    //         offset: pageIndex
    //     })
    // }, [pageSize, pageIndex])

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    // React.useEffect(() => {
    //     if (filters && !isEmpty(filters)) {
    //         loadFn(filters);
    //     }
    // }, [filters])

    // Render the UI for your table
    return (<div>
        <MaUTable size="small" {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell key={`${column.id}`} {...column.getHeaderProps()}>
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
        <TablePagination
            component="div"
            count={controlledPageCount}
            page={pageIndex}
            onPageChange={handleChangePage}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
    )
}

const EventPage = ({ readEvents, createEvent, updateEvent, deleteEvent, setReadEventsFilters }) => {
    const pre = "eventpage-";

    const { isAuthorized } = React.useContext(AuthContext);

    const onCreateEvent = async (values) => {
        await createEvent({
            data: values,
            createSuccessCb: () => {
                createDialog.handleClose()
            }
        });
    };

    const onUpdateEvent = async (id, values) => {
        await updateEvent({
            data: values,
            createSuccessCb: () => {
                updateDialog.handleClose();
            }
        })
    }

    const onDeleteEvent = async (id) => {
        await deleteEvent({ id })
    };

    // const documents = useData();
    const createDialog = useDialog();
    const updateDialog = useDialog();
    const deleteDialog = useDialog();

    const columns = React.useMemo(() => [
        {
            Header: () => null,
            id: 'logo',
            Cell: ({ row }) => <div className={styles[`${pre}logo-wrapper`]}><img src={row.original.featuredImage} height={50} /></div>
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
            Cell: ({ row }) => <div className={styles[`${pre}date-wrapper`]}><div className="flex-row"><DateRangeIcon /><div className="flex-column">
                <span>{moment(row.original.startDate).format("DD/MM/YYYY HH:mm")}</span>
                <span>{moment(row.original.endDate).format("DD/MM/YYYY HH:mm")}</span>
            </div></div>
                <div className="flex-row"><AvTimerIcon /><span>{`${Math.ceil(row.original.duration / 60000)}min`}</span></div>
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
            Cell: ({ row }) => <Link underline="hover" href={row.original.promoter.website}>{row.original.promoter.name}</Link>
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
            Cell: ({ row }) => <TableActions id={row.original._id} updateDialog={updateDialog} deleteDialog={deleteDialog} url={row.original.url} />
        },
    ], []);

    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
        const fetchId = ++fetchIdRef.current

        if (fetchId === fetchIdRef.current) {
            const offset = pageSize * pageIndex
            const limit = pageSize
            setReadEventsFilters({
                where: {},
                offset,
                limit,
                sort: {}
            })
        }
        // }, 1000)
    }, [])

    React.useEffect(() => {
        if (readEvents.data) {
            const docs = get(readEvents, "data.docs", []);
            const pageCount = get(readEvents, "data.totalDocs", 0);
            setData(docs)
            setPageCount(pageCount)
        }
    }, [readEvents.data])

    return (
        <>
            <CssBaseline />
            <Typography variant="h4">{`Events`}</Typography>
            {isAuthorized(["admin"]) && <Toolbar objects={[
                {
                    name: "Aggiungi evento",
                    onClick: () => createDialog.handleOpen()
                }
            ]} />}
            <Table columns={columns} data={data} fetchData={fetchData} loading={readEvents.isLoading} pageCount={pageCount} />
            <CreateEventDialog
                title="Create event"
                dialog={createDialog}
                onSubmit={onCreateEvent}
            />
            <UpdateEventDialog
                title="Update event"
                dialog={updateDialog}
                onSubmit={onUpdateEvent}
            />
            <DeleteEventDialog
                title="Delete event"
                dialog={deleteDialog}
                onSubmit={onDeleteEvent}
            />
        </>
    )
}

export default withEventService(EventPage);