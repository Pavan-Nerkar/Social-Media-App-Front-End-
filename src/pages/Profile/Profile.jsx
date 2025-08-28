import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../Components/Post/PostCard";
import Reels from "../../Components/Reels/Reels";
import UserReelsCard from "../../Components/Reels/UserReelsCard";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModel";

const tabs = [
  { value: "post", name: "Posts" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "repost" },
];

const posts = [1, 1, 1, 1, 1];
const reels = [1,1,1,1,1,1,1] 
const savedPost = [1,1,1]

const Profile = () => {
  const { id } = useParams();

    const [open, setOpen] = React.useState(false);
    const handleOpenProfileModel = () => setOpen(true);
    const handleClose = () => setOpen(false);

   const {auth} = useSelector(store=>store)
  const [value, setValue] = React.useState("post");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card className="my-2 px-20  max-w-[900px]">
      <div className="w-[120%]">
        <div className="">
          <img
            className="px-20 w-full h-full rounded-t-md"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTkwS4plhmRHFyTuBM5LcRE92T1nGUwGun4w&s"
            alt="Profile Cover"
          />
        </div>
        <div className="px-20 flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="tranform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src="https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/d2/d8/b6/d2d8b693-a139-cd07-643b-9012fd397be5/mza_12337084096510737184.jpg/1200x1200bf-60.jpg"
          />

          {true ? (
            <Button variant="outlined" onClick={handleOpenProfileModel} >Edit Profile</Button>
          ) : (
            <Button variant="outlined">Follow</Button>
          )}
        </div>

        <div className="px-20">
          <div className="text-left">
            <h1 className="py-1 font-bold text-xl">{auth.user?.firstName +" "+ auth.user?.lastName}</h1>
            <p>{auth.user?.firstName.toLowerCase() +"_"+auth.user?.lastName.toLowerCase()}</p>
          </div>

          <div className="flex gap-5 items-center py-3">
            <span>41 post</span>
            <span>35 Followers</span>
            <span>5 following</span>
          </div>

          <div className="text-left">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        <section className="px-20">
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              {tabs.map((item) => (
                <Tab value={item.value} label={item.name} wrapped />
              ))}
            </Tabs>
          </Box>
          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[100%] my-10">
                {posts.map((item) => (
                  <div className="border border-slate-500">
                    <PostCard />
                  </div>
                ))}
              </div>
            ) :value==="reels"?<div className=" justify-center flex flex-wrap gap-2 my-10">
              {reels.map((item)=><UserReelsCard/>)}

            </div>:value==="saved"? <div className="space-y-5 w-[70%] my-10">
                {savedPost.map((item) => (
                  <div className="border border-slate-500">
                    <PostCard />
                  </div>
                ))}
            </div> : (
                <div>Repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModal open={open} handleClose={handleClose}/>
      </section>


    </Card>
  );
};

export default Profile;
