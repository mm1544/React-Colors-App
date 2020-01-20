import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import {SortableContainer} from "react-sortable-hoc";


// The whole component is passed in to the SortableContainer
// removeColor and colors are reachable from props
const DraggableColorList = SortableContainer(({colors, removeColor}) => {
    return (
        // for "react-sortable-hoc" every element needs to have a property called index
        <div style={{height: "100%"}}>
            {colors.map((color, i) => (
                <DraggableColorBox 
                    index={i}
                    key={color.name}
                    color={color.color} 
                    name={color.name}
                    handleClick={() => removeColor(color.name)}
                /> 
            ))}
        </div>
    );
})
export default DraggableColorList;