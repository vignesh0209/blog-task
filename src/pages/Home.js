import axios from 'axios';
import React from 'react';
import { useState,useEffect } from 'react';  
import { toast } from 'react-toastify';
import { MDBRow,MDBContainer,MDBTypography, MDBCol } from 'mdb-react-ui-kit';
import Blogs from '../components/Blogs';
import Search from '../components/Search';

const Home = () => {
  const [data,setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadBlogsData();
  }, [])

 const loadBlogsData = async () => {
    const response = await axios.get('http://localhost:5000/blogs');
    if(response.status === 200){
      setData(response.data);
    }else{
      toast.error("Something Went Wrong")
    }
 };

 console.log("data", data);

 const handleDelete = async (id) => {
  if(window.confirm("are you sure to delete this blog ?")){
    const response = await axios.delete(`http://localhost:5000/blogs/${id}`)
    if(response.status === 200){
     toast.success("Blog Deleted SuccessFully");
     loadBlogsData();
    }else{
      toast.error("Something went wrong")
    }
  }
 };

 const excerpt = (str) => {
  if(str.length > 50){
    str = str.substring(0, 50) + " ... "
  }
  return str;
 };

 const onInputChange = (e) => {
 setSearchValue(e.target.value);
 if(!e.target.value){
  loadBlogsData();
 }
 };

 const handleSearch = async (e) => {
  e.preventDefault();
  const response = await axios.get(`http://localhost:5000/Blogs?q=${searchValue}`);
  if(response.status === 200){
    setData(response.data)
  }else{
    toast.error("Something Went Wrong")
  }
 };
  return (
    <>
    <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch}/>
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className="text-center mb-0" tag="h2">
            No Blog Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer className='home'>
            <MDBRow className='row'>
              {data &&
                data.map((item, index) => (
                  <Blogs
                    key={index}
                    {...item}
                    excerpt={excerpt}
                    handleDelete={handleDelete}
                  />
                ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Home