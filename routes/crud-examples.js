const router = require('express').Router();

const CrudExamplesController = require('../controllers/CrudExamplesController');

router.route('/')
    .get(CrudExamplesController.getAll)
    .post(CrudExamplesController.create);
router.route('/:id')
    .get(CrudExamplesController.getOne)
    .put(CrudExamplesController.edit)
    .delete(CrudExamplesController.delete);


module.exports = router;