import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const DeleteProduct = () => {
    const params = useParams();
    
    useEffect(() => {
        const delete_fn = async () => {
            try {
                console.log(params);
                const res = await axios.delete(`/api/products/${params.id}`);
                console.log("deleted successfully");
                window.location.href = '/';
            } catch (err) {
                alert(err);
            }
        };
        
        delete_fn();
    }, []);  // Dependency array to only call when `params.id` changes

    return <></>;
};
