import * as React from "react";
import { get } from "lodash-es";
import { CssBaseline } from "@mui/material"
import withEventService from "../../service/Event";
import styles from "./HomePage.module.scss";
import useData from "../../hook/useData";
import { EventItem } from "../../component/Dashboard/EventItem"
import { Header } from "./Header";

const HomePage = ({ readEvents }) => {
    const pre = "homepage-";

    const documents = useData();

    const init = async () => {
        await readEvents.refetch();
    }
    React.useEffect(() => {
        init();
    }, [])

    React.useEffect(() => {
        if (readEvents.data) {
            const docs = get(readEvents, "data.data", [])
            const totalDocs = 0;
            
        }
    }, [readEvents.data]);

    React.useEffect(() => {
        if (readEvents.data) {
            const docs = get(readEvents, "data.docs", []);
            const totalDocs = get(readEvents, "data.totalDocs", 0);
            documents.handleDocs(docs, totalDocs);
        }
    }, [readEvents.data])

    return <><CssBaseline />
        <Header />
        <div className={styles[`${pre}container`]}>
            {documents.docs && documents.docs.length && documents.docs.map((d, i) => <EventItem key={`${d.title}-${i}`} event={d} />)}
        </div>
    </>
}

export default withEventService(HomePage);