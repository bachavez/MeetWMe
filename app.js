//1.Dependencies at the Top (require statements)
const express = require('express');
const bodyParser = require('body-parser');
const Twilio = require('twilio');
const myPhoneNumber='+17208626010'
const accountSid = 'AC192e60d012d6e1423e5b707c20d5a65b'; // Your Account SID from www.twilio.com/console
const authToken = 'ce43d212d7e1251ef0397fd808b7803f';   // Your Auth Token from www.twilio.com/console
const app = express();
const twilioClient = new Twilio(accountSid, authToken);


//2.Define the port number
const port = process.env.PORT || 3000;

//3. Define the middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//4.Define Routes
app.get('/', (request, response)=> {
response.sendFile(__dirname + '/public/index.html');
});

//app.get('/abc', function(request,response){
//response.send(abc);
//});

app.post('/sendMessage', (request,response) => {

    //create message
    const message = `
        Hello Brian!
            ${request.body.firstName} would like to scheudule an appointment with you.

            Reply YES or NO to accept or deny the appoitment.

            `;

    //send message
    twilioClient
        .messages
        .create({
            body: message,
            to: myPhoneNumber,  // Text this number
            from: '+17206139330' // From a valid Twilio number
    })
        .then((message) => console.log(message.sid));
            response.send('Message Received');
});

app.post('/twilioReply', (request, response) => {

    twilioClient
        .messages
        .create({
            body: 'Got Reply',
            to: myPhoneNumber,  // Text this number
            from: '+17206139330' // From a valid Twilio number
    })
        .then((message) => console.log(message.sid));
            response.send('Message Received');


});

//5.Start the server
app.listen(port, ()=>{
console.log(`Server is running on port ${port}`);
});