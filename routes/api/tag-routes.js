const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const allTagInfo = await Tag.findAll({
      include: [{model: Product }]
    });

    if (!allTagInfo) {
      res.status(404).json({ message: 'No tags located!' });
      return;
    }

    res.status(200).json(allTagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagsIDData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tagsIDData) {
      res.status(404).json({ message: 'No tag ID located!' });
      return;
    }

    res.status(200).json(tagsIDData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const postATag = await Tag.create(req.body);
    res.status(200).json(postATag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const UpdateTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  
    if(!UpdateTagData) {
      return res.status(404).json({message: 'Could not update tag.'})
    }
    res.status(200).json(UpdateTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteTag) {
      res.status(404).json({ message: 'Could not delete tag' });
      return;
    }

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;