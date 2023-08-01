const express = require('express');
const router = express.Router();

const { generateOTP, login, signup} = require('../controllers/Auth');
const {createCategory, getCategories} = require('../controllers/Category');
const {createTags, addTags, findByTags} = require('../controllers/Tags');
const {auth} = require('../middleware/auth')
const {editProfile} = require('../controllers/Profile')

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/auth/generateotp', generateOTP);
router.post('/category/create-category', createCategory)
router.post('/tags/createTag', createTags)
router.post("/profile/edit-profile", auth, editProfile)
router.post('/tags/insert-tag', auth, addTags)
router.post('/tags/finbytags', findByTags)
router.post('/category/get-categories', getCategories)


module.exports = router