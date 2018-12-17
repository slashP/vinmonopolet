

let cardWidth = 220;

export default {
    beerList: {
        overflow: "hidden",
        margin: "auto",
        minHeight: "100%",
        fontSize: "12px",
        position: "relative"
    },

    beerListLoading: {
        overflow: "hidden",
        width: "auto",
        maxWidth:"300px",
        margin: "auto",
    },

    beerCard: {
        width: cardWidth + "px",
        margin: "5px",
        padding: "5px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        float: "left",
        background: "#fff",
        borderRadius: "3px",
        border: "2px solid #ddd",
        overflow: "hidden",
        height: "135px"
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
        margin:"0 0 10px 0",
        width: "210px",
    },

    price: {
        margin: "0 0 5px 0"
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
        margin: "0 0 0 4px",
        display: "inline-block",
        height: "18px",
        width: "18px",
        float: "right",
        border: "1px solid #ddd",
        borderRadius: "2px",
        cursor: "pointer",
    }
}