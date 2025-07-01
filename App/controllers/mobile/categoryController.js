const categoryModels = require('../../models/categoryModels');

const mCategoryInsert = async(req, res) => {
    try {
        const { categoryName, description } = req.body;

        // ✅ Duplicate check
        const existingCategory = await categoryModels.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).json({
                message: 'Category with this name already exists',
            });
        }

        // ✅ Image URL bana rahe hain
        let imageUrl = 'default-category-image.jpg';
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        // ✅ New category create
        const category = new categoryModels({
            categoryName,
            description,
            categoryImage: imageUrl
        });

        // ✅ Save to DB
        const savedCategory = await category.save();

        res.status(200).json({
            message: 'Category inserted successfully',
            data: savedCategory
        });

        console.log('Category inserted successfully:', savedCategory);
    } catch (err) {
        res.status(500).json({
            message: 'Insert error',
            error: err.message
        });
    }
};



const mCategaoryList = async(req, res) => {
    try {
        const categories = await categoryModels.find();
        res.status(200).json({
            message: 'Categories fetched successfully',
            data: categories
        });
    } catch (err) {
        res.status(500).json({
            message: 'Fetch error',
            error: err.message
        });
    }
};


const mCategoryUpdate = async(req, res) => {
    try {
        const { id, categoryName, description } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Category ID is required in body' });
        }

        // ✅ Check if category exists
        const existingCategory = await categoryModels.findById(id);
        if (!existingCategory) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }

        // ✅ Update values
        if (categoryName) existingCategory.categoryName = categoryName;
        if (description) existingCategory.description = description;

        // ✅ If new image uploaded
        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            existingCategory.categoryImage = imageUrl;
        }

        // ✅ Save updated data
        const updatedCategory = await existingCategory.save();

        res.status(200).json({
            message: 'Category updated successfully',
            data: updatedCategory
        });

    } catch (err) {
        res.status(500).json({
            message: 'Update error',
            error: err.message
        });
    }
};
const categoryDelete = async(req, res) => {
    try {
        const { id } = req.body || {};

        if (!id) {
            return res.status(400).json({ message: 'Category ID is required' });
        }

        const existingCategory = await categoryModels.findById(id);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await categoryModels.findByIdAndDelete(id);

        res.status(200).json({ message: 'Category deleted successfully' });

    } catch (err) {
        res.status(500).json({
            message: 'Delete error',
            error: err.message
        });
    }
};


module.exports = { mCategoryInsert, mCategaoryList, mCategoryUpdate, categoryDelete };