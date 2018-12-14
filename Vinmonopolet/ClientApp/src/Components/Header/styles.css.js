
var select = {
    display: "inline",
    maxWidth: "500px",
    height: "auto",
    fontSize: "12px"
}

var headerSpacing = "5px"

export default {
    storeSelect: {
        ...select,
        minWidth: "250px",
        marginLeft: headerSpacing,
    },

    sortingSelect: {
        ...select,
        minWidth: "120px",
        marginLeft: "auto"
    },

    searchInput: {
        float: "left",
        maxWidth: "80%",
        height: "38px",
        border: "1px solid #ccc",
        fontFamily: "'Montserrat', sans-serif",
        borderRadius:"4px",
        paddingLeft: "7px"
    },

    searchArea: {
        display: "inline",
        marginLeft: headerSpacing,
    },

    logo: {
        fontWeight: "bold",
        fontSize: "30px",
        fontFamily: "'Montserrat', sans-serif",
        color: "#555",
        marginLeft: "10px",
    }
}