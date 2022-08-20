import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemSidebarHover = ({text,icon,textColor,textHover,iconClickHandler}) => {
    return (
       <div className={`flex items-center gap-3 text-[#002145] my-5 mr-5 text-sm hover:cursor-pointer hover:text-blue ${text.link!=""&&"SidebarHoverBox"} `}  >
            <img src={icon} alt='icon' onClick={()=>iconClickHandler()}/>
            {text.link!=""?<Link to={text.link}>{text.title}</Link>:<span className={`text-[${textColor}] cursor-default text-sectionDisable`}>{text.title}</span>}
        </div>
     );
}

export default ItemSidebarHover;
