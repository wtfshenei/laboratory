const router = require('express').Router();
const user = require('../controllers/users.controllers');

router.get('/', user.getAllController);
router.get('/:id', user.getUserByIdController);
router.get('/:id/messages', user.getUserMessagesController);
router.post('/register', user.createController);
router.post('/login', user.loginController);
router.post('/refresh-token', user.refreshTokenController);
router.put('/:id', user.updateController);
router.delete('/:id', user.deleteController);

module.exports = router;