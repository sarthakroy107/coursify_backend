const Category = require("../models/Category");

exports.createCategory = async (req, res) => {

    try {
        //fetch details
        const {name} = req.body;
        //check if Category alreay exists

        const findCategory = await Category.findOne({name: name});
        if(findCategory) {
            return res.status(300).json({
                success: false,
                message: "Category already exists"
            })
        }
        //create entry to db
        const newCategory = await Category.create({
            name: name
        });
        console.log(newCategory);
        res.status(200).json({
            success: true,
            message: "Category created"
        })
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            message: "Failed creating Category"
        })
    }
}

exports.getCategories = async (req, res) => {
    try{
        const categories = await Category.find({}).populate({
            path: "tags",
            
        }).exec();
        return res.status(200).json({
            success:true,
            success:true,
            message:"Categories fetched",
            data:categories
        })
    }
    catch(err) {
        return res.status(501).json({
            success:false,
            message:"Can not get categories",
            data: err
        })
    }
}