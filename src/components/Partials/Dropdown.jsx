import React from "react";

function Dropdown({ title, options,func }) {
  
  return (
    <div className="">
      <div className="select">
        <select default Value="0" onChange={func} name="format" id="format">
          <option value="0"  >
            {title}
          </option>
          {options.map((o, i) => (
            <option value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      
    </div>
  );
}

export default Dropdown;
