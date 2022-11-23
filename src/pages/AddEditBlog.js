import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import { MDBValidation,MDBInput,MDBBtn, } from 'mdb-react-ui-kit';
import { useNavigate, useParams} from 'react-router-dom';


//lcd4umge

const initialstate = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
};

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];


const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialstate);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  const { title, description, category, imageUrl } = formValue;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!category){
      setCategoryErrMsg("Please select a category")
    }
    if(title && description && category && imageUrl ){
      const currentDate = getDate();
      if (!editMode) {
        const updatedBlogData = { ...formValue, date: currentDate };
        const response = await axios.post(
          " http://localhost:5000/blogs",
          updatedBlogData
        );
        if (response.status === 201) {
          toast.success("Blog Created SucessFully");
        } else {
          toast.error("Something Went Wrong");
        }
      }else{
         const response = await axios.put(
           `http://localhost:5000/blogs/${id}`,
           formValue
         );
         if (response.status === 200) {
           toast.success("Blog Updated SucessFully");
         } else {
           toast.error("Something Went Wrong");
         }
      }
      
      setFormValue({ title:"" , description:"", category:"", imageUrl:"" });
      navigate("/");
    }
  };

  const {id} = useParams();


  useEffect(() => {
    if(id){
      setEditMode(true);
      getSingleBlog(id);
    }else {
      setEditMode(false);
      setFormValue({ ...initialstate });
    }
  }, [id])
 
   const getSingleBlog = async (id) => {
     const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
     if(singleBlog.status === 200){
      setFormValue({...singleBlog.data });
      console.log("singleBlog", ...singleBlog.data)
     }else{
      toast.error("Something went wrong !!")
     }
   };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2,"0");
    let mm = String(today.getMonth() +1).padStart(2,"0");
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };
  const onInputChange = (e) => {
    let {name ,value} = e.target;
    setFormValue({...formValue, [name]: value});
  };

  const onUploadImage = (file) => {
    console.log("file",file);
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset", "lcd4umge"); 
    axios.post("http://api.cloudinary.com/v1_1/dtrqfmoft/image/upload",formData)
    .then((resp) => {
      console.log("resp", resp);
      toast.info("Image Uploaded SuccessFully")
      setFormValue({...formValue,imageUrl:resp.data.url});
    })
    .catch((err) => {
      toast.err("Something Went Wrong");
    })
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value })
  };
  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "30px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">{editMode ? "Update Blog" : "Add Blog"}</p>
      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={title || ""}
          name="title"
          type="text"
          onChange={onInputChange}
          required
          label="Title"
          validation="please provide a title"
          invalid
        />

        <br />
        <MDBInput
          className='description'
          value={description || ""}
          name="description"
          type="textarea"
          onChange={onInputChange}
          required
          label="Description"
          validation="please provide a decription"
          invalid
        />
        <br />
        
        <MDBInput
          type="file"
          onChange={(e) => onUploadImage(e.target.files[0])}
          required validation="please choose the file"
          invalid
        />
        <br />

        <select
          className="categoryDropdown"
          onChange={onCategoryChange}
          value={category}
        >
          <option>Please select category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>

          ))}
        </select>
        {categoryErrMsg && <div className='categoryErrMsg'>{categoryErrMsg}</div>}
        <br />
        <br />
        <MDBBtn type="submit" style={{ marginRight: "10px" }}>
          {editMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default AddEditBlog;