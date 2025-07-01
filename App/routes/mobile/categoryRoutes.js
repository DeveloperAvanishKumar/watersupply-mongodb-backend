// E:/backend/watersupply_opetion-mongoose/App/routes/mobile/categoryRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { mCategoryInsert, mCategaoryList, mCategoryUpdate, categoryDelete, } = require('../../controllers/mobile/categoryController');

// ✅ Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// ✅ POST route with file upload
router.post('/category-insert', upload.single('categoryImage'), mCategoryInsert);
router.get('/category-list', mCategaoryList);
router.post('/category-update', upload.single('categoryImage'), mCategoryUpdate);

router.post('/category-delete', categoryDelete);


module.exports = router;