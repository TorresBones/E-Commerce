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
          attributes: ["id", "product_name", "price", "sotck", "categoyr_id"],
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
    const newTag = Tag.create({
      tag_name: req.body.tag_name,
    });
    res.json(newTag)
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTag = Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.json(newTag)
  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const newTag = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(newTag)
  } catch(err){
    console.log(err);
    res.status(500).json(err)
  }
});

module.exports = router;
