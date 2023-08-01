const Profile = require("../models/Profile");
const User = require("../models/User");

exports.editProfile = async (req, res) => {
    try{
        const {firstName, lastName, experience, workFromHome, openToWoek, phone, gender, email} = req.body;
        console.log("REQ.BODY");
        console.log(firstName)
        console.log("userId")
        console.log(req.user.id);
        const userId = req.user.id;
        
        const editedProfile = await Profile.findOneAndUpdate({user: userId},{
            firstName, lastName, experience, workFromHome, openToWoek, phone, gender
        }, {new:true});
        console.log(editedProfile);
        return res.status(200).json({
            success: true,
            message: "Profile edited successfully"
        })
    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:"Profile edit failed"
        })
    }
}