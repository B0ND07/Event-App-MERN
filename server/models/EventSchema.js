const mongoose=require("mongoose")

const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
  
    city: {
        type: String,
   
      },
      address: {
        type: String,
        
      },
      username:{
        type:String,
      },
      description: {
        type: String,
    },
      distance: {
        type: String,
       
      },
      price: {
        type: String,
   
      },
      photos: {
        type: String,
      },
     
    

})

const Event=mongoose.model("Events",eventSchema)

module.exports=Event