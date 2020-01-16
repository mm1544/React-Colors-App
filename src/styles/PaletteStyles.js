// JSS
export default {
    Palette: {
        height: "100vh", /*view height*/
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
            outline: "none", /*no default outline*/
            background: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            /* cancels Link's default decorations */
            textDecoration: "none"
        }
    }
};



// export default {
//     Palette: {
//         height: "100vh", /*view height*/
//         display: "flex",
//         flexDirection: "column"
//     },
//     colors: {
//         /* 90% because we reserve space
//      for navbar and footer */
//         height: "90%" 
//         /*...of its parent,
//      i.e. "Palette", which is 100vh...*/
//     }
// };