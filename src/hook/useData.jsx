import * as React from "react";

const useData = () => {
    const [docs, setDocs] = React.useState([]);
    const [totalDocs, setTotalDocs] = React.useState(0);
    const [selectedItem, setSelectedItem] = React.useState({});
    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleDocs = (docs, totalDocs) => {
        setDocs(docs);
        setTotalDocs(totalDocs);
    };

    return {
        docs,
        totalDocs,
        handleDocs,
        selectedItem,
        selectedItems,
        setSelectedItem,
        setSelectedItems,
    };
};

export default useData;