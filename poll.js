const pollRoutr = require("express").Router();
var Promise = require("bluebird");

var fs = require('fs');
function poll(vote, id) {
    var obj = {};
    let yes = 0;
    let no = 0;
    var json = JSON.stringify(obj);
    return new Promise(function (resolve, reject) {
        // executor (the producing code, "singer")

        fs.readFile('myjsonfile.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (!data) {
                    obj = { table: [] }
                } else {
                    obj = JSON.parse(data); //now it an object
                }
                if (!data)
                    obj.table.push({ id: 1, vote: parseInt(vote) }); //add some data
                else {
                    obj.table.push({ id: obj.table.length + 1, vote: parseInt(vote) });
                }
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('myjsonfile.json', json, 'utf8', function(data){})
                yes = obj.table.filter(val => val.vote == 1).length
                no = obj.table.filter(val => val.vote == 0).length;
                vote ? yes + 1 : no + 1;
                console.log(yes, no);
                resolve({ yes, no });
            }
        })
    });

    // let a = {hi:'helo'}
    // let b = {...a};
    // b.hi='fghjklkjhg';
    // console.log(a, b);


}

function getpoll() {
    let yes = 0;
    let no = 0;
    return new Promise(function (resolve, reject) {
        // executor (the producing code, "singer")

        fs.readFile('myjsonfile.json', 'utf8', function (err, data) {

            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (!data) {
                    yes = data.table.filter(val => val.vote == 1).length
                    no = data.table.filter(val => val.vote == 0).length;
                    resolve({ yes, no });
                } else {
                    resolve({ yes, no });
                }
               
            }
        })
    });
}

pollRoutr.route("/")
    .get(function (req, res) {
        return getpoll()
            .then(data => {
                console.log('data', data)
                res.send(data)
            }).catch(err => {
                console.log('data', err)

                res.send(err);
            })
    });
pollRoutr.route("/:pollid")
    .post(function (req, res) {
        return poll(req.params.pollid)
            .then(data => {
                console.log('data', data)
                res.send(data)
            }).catch(err => {
                console.log('data', err)

                res.send(err);
            })
    });



module.exports = pollRoutr;
