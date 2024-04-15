import React,{useState} from 'react'
import { API_Path } from '../../data/apiPath'
const AddProduct = () => {
  
  const [productName,setproductName]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState([])
  const [bestseller,setBestseller]=useState(false)
  const [file,setFile]=useState(null)
  const [description,setDescription]=useState("")

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    console.log(selectedImage)
    setFile(selectedImage);
};

  const handleCategoryChange =(event)=>{
    const value= event.target.value
    console.log(value)
    if (category.includes(value)){
      setCategory(category.filter((item)=>item !== value))
    }else{
      setCategory([...category,value])
    }
  }
  
  const handleBestseller=(event)=>{
    const value=event.target.value=='true'
    setBestseller(value)
  }
  
  const handleAddProduct=async(e)=>{
    e.preventDefault()
    try{
      const loginToken=localStorage.getItem('loginToken')
      const firmId=localStorage.getItem('firmId')
      if(!loginToken || !firmId){
        console.log("user not authenticated")
      }
      const formData=new FormData()
      formData.append('productName',productName)
      formData.append('price',price)
      formData.append('bestseller',bestseller)
      formData.append('description',description)
      category.forEach((value)=>{
        formData.append('category',value)
      })
      console.log(`${API_Path}/product/add-product/${firmId}/`)
      formData.append('image', file);
      const response=await fetch(`${API_Path}/product/add-product/${firmId}/`,{
        method:"POST",
        body:formData
    } )
    const data=await response.json()
    if(response.ok){
      alert("Product Added successfully")
      setproductName('')
      setPrice('')
      setCategory([])
      setBestseller(false)
      setFile(null)
      setDescription("")
    }
    }catch{
      console.error("Failed to added product")
    }
  }



  return (
    <div>
      <div className="firmSection" onSubmit={handleAddProduct}>
        <form className="tableForm">
            <h3>Add Product</h3>
            <label>Product Name</label><br></br>
            <input name="productName" type='text' value={productName} onChange={(e)=>{
              setproductName(e.target.value)
            }} ></input>
            <label>Price</label><br></br>
            <input name="price" type='text' value={price} onChange={(e)=>{
              setPrice(e.target.value)
            }}></input>
            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input name="category" type="checkbox" value="veg" checked={category.includes('veg')}  onChange={handleCategoryChange}></input>
              </div>
              <div className="checkboxContainer">
                <label>Non Veg</label>
                <input name="category" type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}></input>
              </div>
              </div>
            </div>

            <div className="checkInp">
              <label>Bestseller</label>
              <div className="inputsContainer">
              <div className="checkboxContainer">
                <label>Yes</label>
                <input name="bestseller" type="radio" value="true" onChange={handleBestseller} checked={bestseller==true} ></input>
              </div>
              <div className="checkboxContainer">
                <label>No</label>
                <input name="bestseller" type="radio" value="false" onChange={handleBestseller} checked={bestseller==false} ></input>
              </div>
              </div>
            </div>
            
            <label>Description</label><br></br>
            <input type='text' name="description" value={description} onChange={(e)=>{
              setDescription(e.target.value)
            }} ></input>
            <label>Firm Image</label><br></br>
            <input name="image"  type='file' onChange={handleImageUpload}></input>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct
