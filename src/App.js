import './App.css';
// import Create from './components/create';
// import Read from './components/read';
// import Update from './components/update';
// import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React,{useState} from 'react';
function App() {
//const productTable =()=>{
  const[products,setProducts] = useState([
    {id:1,name:'product A',price:50,oldprice:70,category:'category A',isActive: true,description: 'Description A'},
    {id:2,name:'product B',price:30,oldprice:40,category:'category B',isActive: false,description: 'Description B'},
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [newProduct, setNewProduct]=useState({
    name:'',
    price: 0,
    oldprice:0,
    category: '',
    isActive: false,
    description: '',
  });

  const openModal =(product)=>{
    setEditingProduct(product);
    setModalOpen(true);
  }

   const closeModal=()=>{
    setEditingProduct(null);
    setModalOpen(false);
    setNewProduct({...newProduct});
   }

   const edit=()=>{
    setProducts(products.map((product)=>(product.id === editingProduct.id?{...product,...newProduct} : product)));
    closeModal();
   }

  const addproduct=()=>{
    setProducts([...products,{id:products.length+1,...newProduct}]);
    setNewProduct({
      name: '',
      price: 0,
      oldprice: 0,
      category: false,
      description: '',
    });
    closeModal();
  };

  const del=(id)=>{
    setProducts(products.filter((product)=> product.id !== id));
  };


 
  return (
    <div className="main">
       <h1>crud operation</h1>
      <table>
        <thead>
           <tr>
            <th>product Name</th>
            <th>price</th>
            <th>old price</th>
            <th>category</th>
            <th>isActive</th>
            <th>Description</th>
            <button onClick={addproduct}>Add</button>
           </tr>
        </thead>
        <tbody>
          {products.map((product) =>(
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.oldprice}</td>
              <td>{product.category}</td>
              <td>{product.isActive? 'yes' : 'No'}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={()=>openModal(product)}>Edit</button>
                <button onClick={()=>del(product.id)}>Delete</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen &&(
      <div>
        <h2>{editingProduct? 'Edit product': 'Add Product'}</h2>
        <label>Name: <input type='text' value={newProduct.name} onChange={(e) => setNewProduct({...newProduct,name:e.target.value})}></input></label>
        <br></br>
        <br></br>
        <label>Price: <input type='number' value={newProduct.price} onChange={(e) => setNewProduct({...newProduct,price:e.target.value})}></input></label>
        <br></br>
        <br></br>
        <label>category: <input type='text' value={newProduct.category} onChange={(e) => setNewProduct({...newProduct,category:e.target.value})}></input></label>
        <br></br>
        <br></br>
        <label>oldprice: <input type='number' value={newProduct.oldprice} onChange={(e) => setNewProduct({...newProduct,oldprice:e.target.value})}></input></label>
        <br></br>
        <br></br>
        <label>description: <input type='text' value={newProduct.description} onChange={(e) => setNewProduct({...newProduct,description:e.target.value})}></input></label>
        <br></br>
        <br></br>
        {editingProduct?(
        <button onClick={edit}>save</button>
        ):(
        <button onClick={addproduct}>Add</button>
        )}
        <button onClick={closeModal}>cancel</button>
      </div>
      )}
      </div>
  );
}
export default App;
