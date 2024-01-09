const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allCategoryInfo = await Category.findAll({
      include: [{model: Product }]
    });

    if (!allCategoryInfo) {
      res.status(404).json({ message: 'No category located!' });
      return;
    }

    res.status(200).json(allCategoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/:id', async (req, res) => {
  try {
    const categoryIDInfo = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryIDInfo) {
      res.status(404).json({ message: 'No category ID located!' });
      return;
    }

    res.status(200).json(categoryIDInfo);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  try {
    const postACategory = await Category.create(req.body);
    res.status(200).json(postACategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const UpdateCategoryInfo = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  
    if(!UpdateCategoryInfo) {
      return res.status(404).json({message: 'Could not update category.'})
    }
    res.status(200).json(UpdateCategoryInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id',async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No category located with that id!' });
      return;
    }

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;