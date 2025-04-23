import React, { useState } from 'react'

 const Tempp = () => {
    

//   <script>
    // const imageInput = document.getElementById('imageInput');
    // const imageDisplay = document.getElementById('imageDisplay');
    const [url,setUrl]=useState(null);
    // imageInput.addEventListener('change', function(event) {
    const change=(event)=>{
        console.log(event);
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            console.log(e)
            setUrl(e.target.result)
          // imageDisplay.src = e.target.result;
        //   imageDisplay.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    };
//   </script>
  return (
    <div><div class="container">
    <h2>Select an Image</h2>
    <input type="file" id="imageInput" accept="image/*" onChange={change} />
    <img src='https://res.cloudinary.com/dgodzmnyy/image/upload/v1727101212/test/kpqttlclsjxpgtqcoti8.jpg' alt="Selected" />
  </div></div>
  )
}
export default Tempp;