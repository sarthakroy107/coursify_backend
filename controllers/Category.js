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
