const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: ProductTag,
        },
      ],
    });

    res.status(200).json(tagData);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
          through: "ProductTag",
        },
      ],
    });
    res.status(200).json(tagData);
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag)
  } catch(err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const existingTag = await Tag.findByPk(req.params.id);
    if (!existingTag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }

    const [rowsAffected] = await Tag.update(
      {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
    if (rowsAffected === 1) {
      res.json({ success: true, message: 'Tag updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Tag not found or not updated' });
    }   
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error '});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const rowsAffected = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected === 1) {
    res.json({ success: true, message: 'Tag deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Tag not found or not deleted' });
    }
  } catch(err){
    console.log(err);
    res.status(500).json(err)
  }
});

module.exports = router;