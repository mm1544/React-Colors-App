// "..We occasionally use media queries that go in the other direction (the given screen size or smaller):"

// // Extra small devices (portrait phones, less than 576px)
// @media (max-width: 575.98px) { ... }

// // Small devices (landscape phones, less than 768px)
// @media (max-width: 767.98px) { ... }

// // Medium devices (tablets, less than 992px)
// @media (max-width: 991.98px) { ... }

// // Large devices (desktops, less than 1200px)
// @media (max-width: 1199.98px) { ... }

// // Extra large devices (large desktops)
// // No media query since the extra-large breakpoint has no upper bound on its 

export default {
    up() {},
    // by the default all the code that is written is for xl devices, here we try to work with smaller-ones
    down(size){
        const sizes = {
            xs: "575.98px",
            sm: "767.98px",
            md: "991.98px",
            lg: "1199.98px"
        };
        return `@media (max-width: ${sizes[size]})`;
    }
};

// eg. up("sm") => will give a media query From small size and up
//  down("sm") - will give a media query From small size and below