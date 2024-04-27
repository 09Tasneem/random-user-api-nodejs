const express = require('express');
const { getRandomUsers, getAllUsers, addAUser, updateAUser, deleteUser, bulkUpdate } = require('../controllers/user.controller');

const router = express.Router();

router.route("/random")
    .get(getRandomUsers)

router.route("/all")
    .get(getAllUsers)

router.route("/save")
    .post(addAUser)

router.route("/update")
    .patch(updateAUser)

router.route("/delete/:id")
    .delete(deleteUser)

router.route("/bulk-update")
    .patch(bulkUpdate)

module.exports = router;