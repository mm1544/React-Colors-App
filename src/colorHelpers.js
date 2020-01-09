// function that takes a palet in...

// {
//     paletteName: "Material UI Colors",
//     id: "material-ui-colors",
//     emoji: "🎨",
//     colors: [
//       { name: "red", color: "#F44336" },
//       { name: "pink", color: "#E91E63" },
//       { name: "purple", color: "#9C27B0" },
//       { name: "deeppurple", color: "#673AB7" },
//       { name: "indigo", color: "#3F51B5" },
//       { name: "blue", color: "#2196F3" },
//       { name: "lightblue", color: "#03A9F4" },
//       { name: "cyan", color: "#00BCD4" },
//       { name: "teal", color: "#009688" },
//       { name: "green", color: "#4CAF50" },
//       { name: "lightgreen", color: "#8BC34A" },
//       { name: "lime", color: "#CDDC39" },
//       { name: "yellow", color: "#FFEB3B" },
//       { name: "amber", color: "#FFC107" },
//       { name: "orange", color: "#FF9800" },
//       { name: "deeporange", color: "#FF5722" },
//       { name: "brown", color: "#795548" },
//       { name: "grey", color: "#9E9E9E" },
//       { name: "bluegrey", color: "#607D8B" }
//     ]
//   }

import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        // setting colors to be an empty object
        colors: {}
    }

        // loop throug all the levels and for each of them will add in to array
    for (let level of levels) {
        newPalette.colors[level] = [];
        // will make array: [50:[], 100:[], 200:[],...]
    }

    // loops through all the "colors"
    // will generate a SCALE for each color 
    // will take the lightest color and add it to the array 
    // with a key as "50" and ect.
    for(let color of starterPalette.colors) {
        // by the default colors will go from dark to light, so 
        // we want to reverse it TO MATCH UP our array
        let scale = generateScale(color.color, 10).reverse();
        for(let i in scale) {
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace("rgb", "rgba" ).replace(")", ",1.0)")
            });
        }
    }
    return newPalette;
}

// will generate a range(?) of colors
function getRange(hexColor) {
    const end = "#fff";

    //     // chroma(hexColor) -->used to make color to chroma-format-color
    //     // hex() -->to get a hex value
    //     chroma(hexColor).darken(1.4).hex(),
    //     hexColor, //middle value
    //     end // end value
    // ]);

    // will return array with 3 hex color values
    return [

        // chroma(hexColor) -->used to make color to chroma-format-color
        // hex() -->to get a hex value
        chroma(hexColor).darken(1.4).hex(),
        hexColor, //middle value
        end // end value
    ];
    // Originaly we had a skale going: black -> ourColor -> 
    // white. That is not suitable because colors were to dark. 
    //Therefore Scaling was changed to: 
    // color.darken(1.4) - color - white.
}

// generates 10 colors based of a input color
function generateScale(hexColor, numberOfColors) {
    // mode("lab") -->will set the mode
    // colors(10) --> will make 10 colors 
    return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export {generatePalette};