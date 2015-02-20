var os      = require('os'),
    express = require('express'),
    app     = express(),
    cors    = require('cors'),
    request = require('request');

app.use(cors());

app.get('/stats', function(req, res){
  res.json({
    load: os.loadavg(),
    uptime: os.uptime()
    });
});

app.get('/airing', function(req, res){
    request({
        url: 'http://media.stephenpontes.com:8081/api/453f3e19ecac64c3204d238ba770661f/?cmd=future&sort=date',
        json: true
    }, function(err, response, body) {
        res.json(body.data);
    });
});

app.get('/airing/today', function(req, res){
    request({
        url: 'http://media.stephenpontes.com:8081/api/453f3e19ecac64c3204d238ba770661f/?cmd=future&sort=date&type=today',
        json: true
    }, function(err, response, body) {
        res.json(body.data.today);
    });
});

app.get('/airing/soon', function(req, res){
    request({
        url: 'http://media.stephenpontes.com:8081/api/453f3e19ecac64c3204d238ba770661f/?cmd=future&sort=date&type=soon',
        json: true
    }, function(err, response, body) {
        res.json(body.data.soon);
    });
});

app.listen(3000);
