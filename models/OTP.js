const mongoose = require('mongoose');
const mailSender = require('../utilities/mailSender');

const OTPSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }
});

const sendVerificationEmail = async (email, otp) => {
    try{
        const mailResponse = await mailSender(email, "OTP valide for five minutes:", otp);
        console.log("Email sent Successfully: ", mailResponse);
    }
    catch(error) {
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    console.log("New document saved to database");
    if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
}) 

module.exports = mongoose.model("OTP", OTPSchema);