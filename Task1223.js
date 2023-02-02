const http=require('http');
const querystring = require('querystring');
const url=require('url');

    let server=http.createServer(async (req,res)=>
    {
        if(req.method==='GET'){
            const parsed = url.parse(req.url);
            const query  = querystring.parse(parsed.query);
        let value=await fetch(`https://randomuser.me/api/?page=${query.page}&results=${query.results}`)
        let data=await value.json();
        let interValue=data;
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        });
        let json=JSON.stringify(interValue);
        res.end(json)
    }
})
server.listen(8080,()=>
{
    console.log("server is running");
})
