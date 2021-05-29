import React,{useState} from 'react';
import {storage, db } from '../config/Config'

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productStock, setProductStock] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']
    
    const productImgHandler = (e) =>{
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)){
            setProductImg(selectedFile);
            setError('')
        }
        else{
            setProductImg(null)
            setError("Por favor seleciona un tipo de archivo valido (png o jpeg)")
        }
    }

    const addproducts = (e) =>{
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductStock: Number(productStock),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0)
                        setProductStock(0)
                        setProductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
        
    }

    return (
        <div className='container'>
            <br/>
            <h2>Agregar Productos</h2>
            <hr/>
            <form autoComplete='off' className='form-group container' onSubmit={addproducts}>
                    <label htmlFor='product-name'>Nombre del Producto</label>
                    <br/>
                    <input type='text' className='form-control' required
                        onChange={(e)=>setProductName(e.target.value)} value={productName}/>
                    <br/>
                    <label htmlFor='product-price'>Precio de Producto</label>
                    <br/>
                    <input type='number' className='form-control' required 
                        onChange={(e)=>setProductPrice(e.target.value)} value={productPrice}/>
                    <br/>
                    <label htmlFor='product-stock'>Stock del Producto</label>
                    <br/>
                    <input type='number' className='form-control' required 
                        onChange={(e)=>setProductStock(e.target.value)} value={productStock}/>
                    <br/>
                    <label htmlFor='product-img'>Imagen del Producto</label>
                    <br/>
                    <input type='file' className='form-control' onChange={productImgHandler}/>
                    <br/>
                    <hr/>
                    <button className='btn btn-success btn-md mybtn'>Agregar a Inventario</button>
            </form>
            <br/>
            {error&& <span className='error-msg'>{error}</span>}
        </div>
    );
};

