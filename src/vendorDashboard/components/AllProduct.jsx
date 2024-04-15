import React,{useEffect,useState} from 'react'
import { API_Path } from '../data/apiPath'
const AllProduct = () => {
    const [products,setProducts]=useState([])
    const productHandler=async()=>{
        const firmId=localStorage.getItem('firmId')
        try{
            const response= await fetch(`${API_Path}/product/get-product/${firmId}`)
            const newProductData=await response.json()
            setProducts(newProductData.products);
        }catch{
            console.log("error in fetch api")
        }
    }

    useEffect(()=>{
        productHandler()
    },[products])

    const deleteProductById = async (productId) => {
        try {
            const response = await fetch(`${API_Path}/product/${productId}`, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                setProducts(products.filter((product) => product._id !== productId));
                console.log("Product deleted successfully");
            } else {
                console.error("Failed to delete product");
            }
    
        } catch (error) {
            console.error("Error in deleting product:", error);
        }
    };
    
  return (
    <div>
        {products.length==0?(<h1>No products added</h1>):(
            <table className="producttable">
               <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                </tr>
            </thead>
                <tbody>
                    {
                        products.map((item)=>{
                            return (<>
                            <tr key={item.id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>{item.image && (<img width="100px" 
    height="100px" src={`${API_Path}/uploads/${item.image}`} alt={item.image} />)}</td>
                                <td> <button onClick={() => deleteProductById(item._id)}>Delete</button></td>
                            </tr>
                            </>)
                        })
                    }
                </tbody>
            </table>
        )}
    </div>
  )
}

export default AllProduct
