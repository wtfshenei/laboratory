const router = require('express').Router();
const chatbox = require('../controllers/chatbox.controllers');
const {getUserMessagesController} = require("../controllers/users.controllers");

router.get('/', chatbox.getAllController);
router.get('/user/:id', getUserMessagesController);
router.post('/', chatbox.createController);
router.put('/:id', chatbox.updateController);
router.delete('/:id', chatbox.deleteController);

module.exports = router;