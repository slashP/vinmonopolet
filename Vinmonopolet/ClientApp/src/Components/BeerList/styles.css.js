
let cardWidth = "220px";

export default {
    beerList: {
        overflow: "hidden",
        margin: "auto",
        minWidth: "350px",
        maxWidth: "1370px",
        minHeight: "100%",
        width: "100%",
        fontSize: "12px",
    },

    beerListLoading: {
        display: "inline-block",
        overflow: "hidden",
        width: "auto",
        maxWidth:"500px",
        margin: "50px auto",
        height: "auto",
        fontSize: "30px"
    },

    beerCard: {
        width: cardWidth,
        margin: "5px",
        padding: "5px",
        height: "122px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        float: "left",
        background: "#fff",
        borderRadius: "3px",
        border: "2px solid #ddd",
        overflow: "hidden"
    },

    beerProps: {
        width: "210px",
        padding: "0px",
        margin: "5px",
        float: "left",
        listStyleType: "none",
        textAlign: "left"
    },

    cardTopbar: {
        marginBottom:"2px",
        width: "210px",
    },

    price: {
        marginBottom: "2px"
    },

    beerName: {
        width: "210px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },

    storeStock: {
        display: "inline-block",
        whiteSpace: "nowrap",
    },

    stockList: {
        padding: "0",
        listStyle: "none",
        margin: "2px 5px"
    },

    beerLogo: {
        display: "inline-block",
        float: "left",
        borderRadius: "4px",
        border: "1px solid #ddd",
        height: "60px",
        width: "60px"
    },

    externalLink: {
        objectFit: "cover",
        objectPosition: "0 0",
        display: "inline-block",
        height: "15px",
        width: "15px",
        float: "right",
        border: "1px solid #ddd",
        borderRadius: "2px",
        cursor: "pointer",
    }
}