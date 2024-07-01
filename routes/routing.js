const express = require('express')
const helper = require('../files/helper.js')
const mailer = require('../files/mailer.js')
var router = express.Router()

var fs = require("fs"), json;

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){
    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

json = getConfig('data.json');

router.get('/', (request, response) => {
    response.render('index', {
        config: json,
        helper: helper,
        page: {
            title: 'Home Page',
            href: "/",
            page_type: "home-page"
        },
        layout: './layouts/main-layout'
    })
})

router.post('/send-message', (request, response) => {
    var data = {
        name: request.body.name,
        email: request.body.email,
        phone: request.body.phone,
        message: request.body.message
    }

    var message = {
        from: undefined,
        to: ['admin@merch-ez.com', 'simple.ez.merch@gmail.com'],
        subject: `Contact Us Submission - ${data.name}`,
        text: `Name: ${data.name} Email: ${data.email} Phone: ${data.phone} Message: ${data.message}`,
        html: `<p>Name: ${data.name}</p><p>Email: ${data.email}</p><p>Phone: ${data.phone}</p><p>Message: ${data.message}</p>`,
    }

    mailer.send_email(message).catch(console.error)
})

router.get('*', (request, response) => {
  response.render('404', {
    config: json,
    helper: helper,
    page: {
        title: 'Page not Found: 404',
        href: 'ERROR',
        page_type: "error-page"
    },
    layout: './layouts/main-layout'
  })
})

module.exports = router