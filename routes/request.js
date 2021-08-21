const express = require('express');
const connection = require('../modules/mysql');
const statusCode = require('../modules/status');
const messageCode = require('../modules/message');
const router = express.Router();

router.post('/request/:postIdx', async (req, res) => {
    const {
        userId,
        content,
        arrive_time,
    } = req.body;
    console.log(req.params.postIdx);

    const sql = `INSERT INTO Request (requester, content, arrive_time, post, approval) VALUES (${userId}, '${content}', '${arrive_time}', ${req.params.postIdx}, 0)`;
    connection.query(sql, (error, result) => {
        var status = statusCode.BAD_REQUEST;
        var message = messageCode.REQUEST_FAIL;
        if(!error) {
            status = statusCode.SUCCESS;
            message = statusCode.REQUEST_SUCCESS;
        }
        res.status(status).send(message);
    })
})

module.exports = router;