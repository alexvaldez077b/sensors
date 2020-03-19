const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();


const Readline = require('@serialport/parser-readline')


const serialport = require('serialport')

var port = null;
serialport.list((err, ports) => {

    ports.forEach(element => {
        //console.log(element)
        if (element.manufacturer.includes('Arduino')) {
            console.log("Arduino Path ", element.comName)
            port = new serialport(element.comName, {
                baudRate: 115200
            })

            port.on('open', () => {
                console.log("arduino  Ready...")
            })

            const parser = new Readline()
            port.pipe(parser)

            parser.on('data', line => {data = line });


        }
    });

})
//const 


//port.write('ROBOT POWER ON\n')
//> ROBOT ONLINE

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + 'blank.html'));
    //__dirname : It will resolve to your project folder.
});

let data = "";

router.get('/data', function (req, res) {
    

        res.send(data)
        //res.send("100,200,300,400");
    

});


router.get('/config', function (req, res) {
    
    
    res.sendFile(path.join(__dirname + '/config.json'));

});


//add the router
// Serve Static Assets
app.use(express.static('public'));

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');