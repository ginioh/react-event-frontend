import moment from "moment";

const initialValues = {
    title: "",
    description: "",
    featuredImage: "",
    startDate: moment().toISOString(),
    endDate: moment().toISOString(),
    category: "",
    promoter: "",
    url: "",
    tags: [],
    location: "",
    isOffline: false,
    isPublic: false,
}

export default initialValues;