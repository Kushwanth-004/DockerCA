import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    product_id: '',
    product_title: '',
    price: '',
    description: '',
    content: '',
    category: '',
  });
  const [image, setImage] = useState(null); // Image file
  // const [image, setImageUrl] = useState(null); // Image URL from Cloudinary
  // const [productId, setProductId] = useState(''); // Image URL from Cloudinary
  const state=useContext(GlobalState);
  const [token,setToken]=state.token;
  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle image change and upload to the backend
  const handleImageChange =  async(e) => {
    const file = e.target.files[0];
    // setImage(file);

    // Create FormData for image upload only
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload image to Cloudinary via your backend
      const res =await axios.post('/api/upload', formData, {
        headers: { 'Authorization': token}
      });
      // console.log(res.data);
      setImage(res.data)
      
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  // Handle form submission in a normal way (as JSON)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(imageUrl)
    // console.log(productId)
    // console.log("Hello")
    
    // Send product data with image URL as a JSON object
    const newProductData = {
      product_id: productData.product_id,
      product_title: productData.product_title,
      price: productData.price,
      description: productData.description,
      content: productData.content,
      category: productData.category,
      images: image, // Use the image URL from Cloudinary
    };
    // console.log(newProductData)
    try {
      const response = await axios.post('/api/products', newProductData);
      alert(response.data.msg);

      // Reset form after successful submission
      setProductData({
        product_id: '',
        product_title: '',
        price: '',
        description: '',
        content: '',
        category: '',
      });
      setImage(null);
      // setImageUrl('');
      // setProductId('');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="text"
          name="product_title"
          placeholder="Product Title"
          value={productData.product_title}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="product_id"
          placeholder="Product Id"
          value={productData.product_id}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={productData.content}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={productData.category}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* File upload for image */}
        <input
          type="file"
          name="image"
          onChange={handleImageChange} // Handle image selection and upload
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
