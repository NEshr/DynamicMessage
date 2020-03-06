import React from "react";

function DropDown(props) {
  return (
    <React.Fragment>
      <label>{props.label}</label>
      <select
        className={props.class}
        onClick={event =>
          props.saveSelection(
            props.objType,
            event.target.value,
            props.directory,
            props.jsonArray
          )
        }
      >
        <option></option>
        {props.selectionArray.map(element => {
          return (
            <option value={element} key={element}>
              {element}
            </option>
          );
        })}
      </select>
    </React.Fragment>
  );
}

export default DropDown;
