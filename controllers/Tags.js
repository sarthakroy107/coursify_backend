const Category = require("../models/Category");
const Profile = require("../models/Profile");
const Tag = require("../models/Tag");
const User = require("../models/User");

exports.createTags = async (req, res) => {
    try{
        const {name, categoryId} = req.body;
        const category = await Category.findById(categoryId);
        if(!category) {
            return res.status(401).json({
                success:false,
                message:"Category not found"
            })
        }
        const newTag = await Tag.create({name: name, category: categoryId});
        await Category.findByIdAndUpdate(categoryId, {
            $push:{
                tags: newTag._id
            }
        })
        return res.status(200).json({
            success: true,
            message: "Tag created successfully"
        })
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Tag creation failed"
        })
    }
}

exports.addTags = async (req, res) => {
    try{
        const {tagId, profileId} = req.body;
        const pushing = await Profile.findByIdAndUpdate(profileId,{
            $push:{tags:tagId}
        }, {new:true})
        if(!pushing) {
            return res.status(402).json({
                success: false,
                message:"Profile not found"
            })
        }
        
        console.log(pushing);

        return res.status(200).json({
            success:true,
            message:"Tag inserted succesfully"
        })
    }
    catch{
        return res.status(501).json({
            success:false,
            message:"Tag insertion failed"
        })
    }
}

exports.findByTags = async (req, res) => {
    try{
        const {tags} = req.body;
        console.log("TAGS");
        console.log(tags);
        const users = await Profile.find({tags: {$in: tags}}).populate("user").exec();
        return res.status(200).json({
            success:true,
            message:"Users fetched successfully.",
            data: users,
        })
    }
    catch(err) {
        return res.status(501).json({
            success:true,
            message: "Users with tags fetching failed"
        })
    }
}

exports.fetchTags = async (req, res) => {
    try{
        const {categoryId} = req.body;
        const tags = await Category.findById(categoryId).populate('tags').exec();
        return res.status(200).json({
            success:true,
            message:"Tag details fetched",
            data:tags.tags
        })
    }
    catch(err) {
        return res.status(200).json({
            success: false,
            message: "Tags fetching failed"
        })
    }
}