import style from "./PopUp.module.css"
import { useState, useEffect, useContext } from "react"
import axios from "axios"
import {AuthContext} from "../../../../App"

function PopUp({ setShowPopUp }) {
  const {user} = useContext(AuthContext)
  const [mealData, setMealData] = useState({
    category: "",
    image: null,
    title: "",
    notes: "",
    userID: user.id,
    day: "",
  }); 

  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log(mealData.image);
  }, [mealData.image]);

  function handleImageChange(e) {
    const newImage = e.target.files[0];
    setImage(newImage);
    setMealData(prev => ({
      ...prev,
      image: newImage
    }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setMealData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", mealData.category);
    formData.append("title", mealData.title);
    formData.append("notes", mealData.notes);
    formData.append("userID", mealData.userID);
    formData.append("file", image);
    formData.append("day", day);

      // Log form data before sending the request
    // Log form data before sending the request
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      // const res = await axios.post("https://remember-backend-kdq2.onrender.com/meal/create-meal", formData);
      const res = await axios.post("http://localhost:3000/meal/create-meal", formData);
      console.log(res);

      // Handle successful response
      console.log("Meal created successfully");
    } catch (error) {
      console.error("Error creating meal:", error);
    }
  }

  const theImage = image ? URL.createObjectURL(image) : "";

  return (
    <div className={style.popUp}>
      <button onClick={() => setShowPopUp(false)} className={style.closeButton}>x</button>
      <div className={style.formAndImageContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.textLeftContainer}> 
            <select
              name="category"
              value={mealData.category}
              className={style.categoryDropdown}
              onChange={handleChange}
              required>
              <option value="">Select Category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
              <option value="Drink">Drink</option>
              <option value="Appetizer">Appetizer</option>
              <option value="Other">Other</option>                                                                                                         
            </select>
            <input
              type="text"
              name="title"
              value={mealData.title}
              onChange={handleChange}
              className={style.title}
              placeholder="Add Meal Title"
              required
            />
            <textarea
              type="text"
              name="notes"
              value={mealData.notes}
              onChange={handleChange}
              className={style.notes}
              placeholder="Add Meal Notes"
            />
            <button type="submit" className={style.rememberButton}>Remember Meal</button>
          </div>
          <div className={style.imageRightContainer}>
            <input
              type="file"
              name="image"
              className={style.image}
              onChange={handleImageChange}
              placeholder="Add Image"
              required
            />
            {theImage && <img
              src={theImage}
              className={style.imagePreview}
              alt="Preview"
            />}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopUp;







// import style from "./PopUp.module.css"
// import {useState, useEffect} from "react"
// import axios from "axios"

// function PopUp({setShowPopUp}) {
  
//   const [mealData, setMealData] = useState({
//     category: "",
//     image: null,
//     title: "",
//     notes: "",
//   }) 

//   const [image, setImage] = useState()

//   useEffect(()=>{
//     console.log(mealData.image)
//   },[mealData.image])

  
//   function handleImageChange(e){
//     const newImage = e.target.files[0]
//     setImage(newImage);
//     setMealData(prev => ({
//       ...prev,
//       image : newImage
//     }))
//   }

  
//   function handleChange(e){
//     const {name, value} = e.target
//     setMealData(prev=>({
//       ...prev,
//       [name] : value
//     }))
//   }




//   async function handleSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("category", mealData.category);
//     formData.append("title", mealData.title);
//     formData.append("notes", mealData.notes);
//     formData.append("image", image);
   
//     try {
      
//         const res = await axios.post("http://localhost:2121/meal/create-meal", formData);
//         console.log(res);

//         // Handle successful response
//         console.log("Meal created successfully");
//     } catch (error) {
//         console.error("Error creating meal:", error);
//     }
// }

//   const theImage = image ? URL.createObjectURL(image) : "";
  
//   return (
//     <div className={style.popUp}>
//       <button onClick={()=> setShowPopUp(false)} className={style.closeButton}>x</button>
//           <div className={style.formAndImageContainer}>            
//             <form  className={style.form} onSubmit={handleSubmit}>
//                <div className={style.textLeftContainer}> 
//                 <select 
//                 option="dropdown" 
//                 name="category"
//                 value={mealData.category}
//                 className={style.categoryDropdown}
//                 onChange={handleChange}
//                 placeholder="Meal Category"
//                 required>
//                   <option value="">Select Category</option>
//                   <option value="Breakfast">Breakfast</option>
//                   <option value="Lunch">Lunch</option>
//                   <option value="Dinner">Dinner</option>
//                   <option value="Snack">Snack</option>
//                   <option value="Dessert">Dessert</option>
//                   <option value="Drink">Drink</option>
//                   <option value="Appetizer">Appetizer</option>
//                   <option value="Other">Other</option>                                                                                                         
//                 </select>
//                 <input
//                     type="text"
//                     name="title"
//                     value={mealData.title}
//                     onChange={handleChange}
//                     className={style.title}
//                     placeholder="Add Meal Title"
//                     required
//                     />                      
//                 <textarea
//                     type="text"
//                     name="notes"
//                     value={mealData.notes}
//                     onChange={handleChange}
//                     className={style.notes}
//                     placeholder="Add Meal Notes"
//                 />
      
//                 <button className={style.rememberButton}>Remember Meal</button>
                
//                 </div>
//                 <div className={style.imageRightContainer} >
//                   <input
//                   type="file"
//                   name="image"
//                   // value={mealData.image}
//                   className={style.image}
//                   onChange={handleImageChange}
//                   placeholder="Add Image"
//                   required
//                   />
//                   <img
//                   src={theImage}
//                   className={style.imagePreview}
//                   />
//                 </div>
               
//             </form>
    
          
//     </div>
  
                  
//     </div>
//   )
// }

// export default PopUp
