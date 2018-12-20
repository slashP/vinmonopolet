
let cardWidth = 220;

export default {
    beerList: {
        overflow: "hidden",
        margin: "auto",
        fontSize: "14px",
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
        height: "154px",
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

    brewery: {
        width: "210px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        fontSize: "12px",
    },

    beerName: {
        width: "210px",
        fontWeight: "bold",
        whiteSpace: "nowrap",
        overflow: "hidden"
    },

    storeStock: {
        maxWidth:"140px",
        display: "inline-block",
        whiteSpace: "nowrap",
    },

    stockList: {
        padding: "0",
        listStyle: "none",
        margin: "2px 5px",
        fontSize: "12px",
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
    },

    bookmarkButton: {
        height: "17px",
        width: "17px",
        fontSize: "16px",
        border: "1px solid #ddd",
        borderRadius: "2px",
        margin: "0 5px 0 auto",
        position:"sticky",
        bottom: "5px",
        cursor: "pointer"
    },

    newTag: {
        display: "inline-block",
        height: "18px",
        width: "18px",
        float: "right",
        margin: "0 0 0 4px",
        color: "red",
        fontSize: "16px"
    },
}