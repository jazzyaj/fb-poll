const express=require('express');
const poll = require('./poll');
const app=express();
port=3000;
app.use(function(request, response, next){
response.header("Access-Control-Allow-Origin", "*");
response.header('Access-Control-Allow-Credentials', true);
response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, accessToken,platform");
response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
next();
});
app.use('/poll', poll);

app.listen(port,()=>{
console.log(`runnig at port ${port}`)
})
