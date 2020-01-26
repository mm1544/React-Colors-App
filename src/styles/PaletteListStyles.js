import sizes from './sizes';

export default {
    root: {
        backgroundColor: "blue",
        height: "100vh", // !!! 100% would not cover all screen, because "root" is wraped in another component
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%", //% of its parent
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "80%"
        },
        [sizes.down("xs")]: {
            width: "70%"
        },
        
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        // styling Link inside of Nav:
        "& a": {
            color: "white"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid", //using css grid system
        gridTemplateColumns: "repeat(3, 30%)", // 3 items will go across, eachone is 30%
        gridGap: "2.5rem",
        [sizes.down("md")]: {
            // 2 one palette 0n each row
            gridTemplateColumns: "repeat(2, 50%)"
        },
        [sizes.down("xs")]: {
            // one palette 0n each row
            gridTemplateColumns: "repeat(1, 100%)",
            gridGap: "1rem",
        }

    }
};
