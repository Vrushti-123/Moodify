const dns = require("node:dns");

// Force Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

//-------------------------------------------------------
require("dotenv").config()
const app = require("./src/app")


//---------------------------------------------------------
// app.listen(3000, ()=>{
//     console.log("Server is running on port 3000");
// })

//----------------------------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
Why? 
Render automatically provides a port number through process.env.PORT.
If you hardcode 3000, your deployment will fail because 
Render expects your app to listen on the assigned port.
*/