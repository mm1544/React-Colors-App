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
        flexWrap: "wrap"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
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
        gridGap: "5%" // 30%*5%*30%*5%*30%

    }
};
