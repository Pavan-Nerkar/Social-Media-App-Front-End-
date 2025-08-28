import { Avatar, Card, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from "./StoryCircle";
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "../Post/PostCard";
import CreatePostModel from "../Createpost/CreatePostModel";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";
import { Store } from "@mui/icons-material";



const story=[11,1,1,1]
const posts=[1,1,1,1]

const MiddlePart = () => {
  const dispatch=useDispatch();
  const {post} =useSelector(Store=>Store)
  
  console.log("post store",post)
  const[openCreatePostModel, setOpenCreatePostModel]=useState(false);

  const handleCloseCreatePostModel=()=>setOpenCreatePostModel(false);


  const handleopenCreatePostModel=()=>{
    setOpenCreatePostModel(true);
    console.log("open post model...",openCreatePostModel)
  };

  useEffect(()=>{
    dispatch(getAllPostAction())
  },[post.newComment])

  return (
    <div>
      <div className="px-8">

        <section className="flex items-center p-5 rounded-b-md">
          <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{width:"5rem",height:"5rem"}}>
            <AddIcon sx={{fontSize:"3rem"}}/>
          </Avatar>
           <p>New</p>
          </div>
        {story.map((item)=><StoryCircle/>)}
        </section>

        <Card className="p-5 mt-5">
          <div className="flex justify-between">
            <Avatar/>
            <input onClick={handleopenCreatePostModel} readOnly className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border" type="text"/>
          </div>
         
          <div className="flex justify-center space-x-9 mt-5">
              
                <div className="flex items-center">
                  <IconButton color="primary" onClick={handleopenCreatePostModel}>
                    <ImageIcon/>  
                  </IconButton>
                  <span>Media</span>
                </div>

                <div className="flex items-center">
                  <IconButton color="denger" onClick={handleopenCreatePostModel}>
                    <VideocamIcon/>  
                  </IconButton>
                  <span>video</span>
                </div>

                 <div className="flex items-center">
                  <IconButton color="warning" onClick={handleopenCreatePostModel}>
                    <ArticleIcon/>  
                  </IconButton>
                  <span>Write Article</span>
                </div>
          </div>
        </Card>

        <div className="mt-5 space-y-5">
          {post.posts.map((item)=><PostCard item={item} />)}
        </div>

        <div>
          <CreatePostModel handleClose={handleCloseCreatePostModel} open={openCreatePostModel}/>
        </div>


      </div>
    </div>
  );
};

export default MiddlePart;
