const express = require('express');
const router = express.Router();

class Request {
    id
    name
    status
    date
    constructor(reqNumber_, name, status) {
        this.id = reqNumber_
        this.name = name
        this.status = status
        this.date = Date.now()
    }
}
var reqCounter = 1;

function getReqNewID() {
    let res = reqCounter;
    reqCounter = reqCounter + 1;
    return res;
}
reqArr = [
    req1 = new Request(getReqNewID(), "Honey", "COMPLETE"),
    req2 = new Request(getReqNewID(), "Yoram", "FAILED"),
    req2 = new Request(getReqNewID(), "Shimon", "RUNNING")
];

router.get('/Requests/All', (req, res) => {
    res.send(reqArr);
});

router.get('/Requests/ID/:id', (req, res) => {
    const reqId = req.params.id;
    let result = {}
    reqArr.forEach(request => {
        if(reqId === String(request.id)){
            result = request
        }
    });
    res.send(result);
});

router.delete('/Requests/ID/:id', (req, res) => {
    const reqId = req.params.id;
    reqArr = reqArr.filter(req=> {if(String(req.id)!== reqId) return req})
    res.send(reqArr);
});

router.put('/Requests/UpdateStatus/:id/:status', (req, res) => {
    const reqId = req.params.id;
    const status = req.params.status;
    for (let index = 0; index < reqArr.length; index++) {
        const element = reqArr[index];
        if(reqId === String(element.id)){
            element.status = status
        }
    }
    res.send(reqArr);
});

router.post('/Requests', (req, res) => {
    const newReq = req.body;
    let alreadyExist = false;
    for (let index = 0; index < reqArr.length; index++) {
        const element = reqArr[index];
        if(newReq.id === element.id){
            res.send("Same ID! didn't saved! id:"+newReq.id);
            alreadyExist = true;
        }
    }
    if(!alreadyExist){
        reqArr.push(newReq);
        res.send(reqArr);
    }
    
});

module.exports = router;