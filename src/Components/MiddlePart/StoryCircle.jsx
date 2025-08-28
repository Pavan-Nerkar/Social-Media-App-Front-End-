import { Avatar } from '@mui/material'
import React from 'react'

const StoryCircle = () => {
  return (
    <div>
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{width:"5rem",height:"5rem"}}
            src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym95c3xlbnwwfHwwfHx8MA%3D%3D">
           
          </Avatar>
           <p>Codewithpavan</p>
          </div>
      
    </div>
  )
}

export default StoryCircle
