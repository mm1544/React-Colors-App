import sizes from './sizes';

const styles = {
    // root - stiles each individual draggable-color-box
    root: {
        width: "20%", 
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        /*removes spacing between rows*/
        marginBottom: "-3.5px",
        // changes color of a svg file in the root class, when hovered over
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "20%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("sm")]: {
            width: "100%",
            height: "5%"
        }

    },
    boxContent: {
        position: "absolute",
        width: "100%",
        /*will move it to the left side*/
        left: "0px", 
        /*will move it to the bottom*/
        bottom: "0px", 
        padding: "10px",
        color: "rgba(0,0,0,0.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: "flex",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};
export default styles;