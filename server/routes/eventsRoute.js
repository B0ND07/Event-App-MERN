const express=require("express")

const { createEvent, updateEvent, deleteEvent, getEvent, getEvents, searchEvents, bookedRoom, getUserEvent } = require("../controllers/eventController")
const isAuthenticated = require("../utils/isAuthenticated")


const router=express.Router()

router.post("/",isAuthenticated,createEvent)

router.put("/:id",isAuthenticated,updateEvent)

router.delete("/:id",isAuthenticated,deleteEvent)

router.get("/:id",getEvent)

router.get("/user/:id",isAuthenticated,getUserEvent)

router.get("/",getEvents)

router.get("/search/:query",searchEvents)






module.exports=router