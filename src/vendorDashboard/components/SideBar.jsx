import React from 'react'

const SideBar = ({showFirmHandler,showProductHandler,showAllProductHandler}) => {
  return (
    <div>
      <div className="sideBarSection">
        <ul>
            <li onClick={showFirmHandler}>Add_Firm</li>
            <li onClick={showProductHandler}>Add_Product</li>
            <li onClick={showAllProductHandler}>All_Product</li>
            <li>User_Details</li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar
