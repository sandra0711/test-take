const { Router } = require('express');
const contactsController = require('../controller/contacts-controller');
const router = new Router();

router.post('/add', contactsController.add);
router.post('/edit', contactsController.edit);
router.post('/delete', contactsController.delete);
router.get('/allContacts', contactsController.getAllContacts);

module.exports = router;
