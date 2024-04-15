import React,{useState} from 'react'
import { API_Path } from '../../data/apiPath'
const AddFirm = () => {
  const [firmName,setFirmName]=useState("")
  const [area,setArea]=useState("")
  const [category,setCategory]=useState([])
  const [region,setRegion]=useState([])
  const [offer,setOffer]=useState("")
  const [file,setFile]=useState(null)
  const handleCategoryChange =(event)=>{
    const value= event.target.value
    console.log(value)
    if (category.includes(value)){
      setCategory(category.filter((item)=>item !== value))
    }else{
      setCategory([...category,value])
    }
  }

  const handleRegionChange =(event)=>{
    const value= event.target.value
    if (region.includes(value)){
      setRegion(region.filter((item)=>item !== value))
    }else{
      setRegion([...region,value])
    }
  }
  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
};
  const handleFirmSubmit=async(e)=>{
    e.preventDefault()
    try{
      const loginToken=localStorage.getItem("loginToken")
      if(!loginToken){
        console.log("User not login ")
      }
      const formData=new FormData()
      
      formData.append('firmName',firmName)
      formData.append('area',area)
      formData.append('offer',offer)
      
      category.forEach((value)=>{
        formData.append('category',value)
      })
      region.forEach((value)=>{
        formData.append('region',value)
      })
      formData.append('image', file);
      const response=await fetch(`${API_Path}/firm/addfirm`,{method:"POST",
      headers:{
          'token':`${loginToken}`
      },
      body:formData
    } )
    const data=await response.json()
    if(response.ok){
      alert("Firm Added successfully")
      // setFirmName('')
      // setArea('')
      // setCategory([])
      // setRegion([])
      // setOffer("")
      // setFile(null)
    }else if(data.message=="vendor can have one firm only"){
      alert("Firm exists. Only one firm can added")
    }else{
      alert("Failed to add firm")
    }
    const serverfirmId=data.firmId;
    localStorage.setItem('firmId',serverfirmId)
    }catch(error){
      console.error("Failed to added firm")
    }
  }
  return (
    <div>
      <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label><br></br>
            <input name="firmName" value={firmName} onChange={(e)=>{
              setFirmName(e.target.value)
            }} type='text'></input>
            <label>Area</label><br></br>
            <input name="area" value={area} onChange={(e)=>{
              setArea(e.target.value)
            }}  type='text'></input>
            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" value="veg" checked={category.includes("veg")}  onChange={handleCategoryChange}></input>
              </div>
              <div className="checkboxContainer">
                <label>Non Veg</label>
                <input type="checkbox"  value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}></input>
              </div>
              </div>
            </div>
            <div className="checkInp">
              <label>Region</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>South Indian</label>
                <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}></input>
              </div>
              <div className="checkboxContainer">
                <label>North Indian</label>
                <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}></input>
              </div>
              <div className="checkboxContainer">
                <label>Chinese</label>
                <input type="checkbox" checked={region.includes('chinese')}  value="chinese" onChange={handleRegionChange}></input>
              </div>
              <div className="checkboxContainer">
                <label>Backery</label>
                <input type="checkbox" checked={region.includes('bakery')}  value="bakery" onChange={handleRegionChange}></input>
              </div>
              </div>
            </div>
            <label>Offer</label><br></br>
            <input name="offer" value={offer} onChange={(e)=>{
              setOffer(e.target.value)
            }}  type='text'></input>
            <label>Image</label><br></br>
            <input type='file' name="image" onChange={handleImageUpload}></input>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddFirm;
