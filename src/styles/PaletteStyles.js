import sizes from './sizes'; // for media queries
export default {
    Palette: {
        /*view height*/
        height: "100vh", 
        display: "flex",
        flexDirection: "column"
    },
    colors: {
        /* 90% because we reserve space
     for navbar and footer */
        height: "90%" 
        /*...of its parent,
     i.e. "Palette", which is 100vh...*/
    },
    goBack: {
        /* 5 boxes will go across the screen*/
        width: "20%", 
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        /*removes spacing between rows*/
        marginBottom: "-3.5px",
        opacity: 1,
        backgroundColor: "black",
        "& a": {
            color: "white",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            /*no default outline*/
            outline: "none", 
            background: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            /* cancels Link's default decorations */
            textDecoration: "none"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "33.3333%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "20%"
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: "10%"
        }
        
    }
};