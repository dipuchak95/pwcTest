const axios = require('axios');

exports.imagePost = (req,res,next) => {
    if(!req.file){
        console.log("No file received");
        res.status(200).json({message: "File Upload Failed"});
    }
    const imageUrl = req.file.path;
    console.log(`File saved in: ${imageUrl}`);
    res.status(200).json({message: "File Uploaded"});
}


exports.odd = (req,res,next) => {
    let plans;
    let newData;
    const data = axios.request('https://run.mocky.io/v3/1b83e6fd-2c52-4e59-bee0-c6146c4d1df8').then(data => {
        data = data.data;
        plans = data.plans;
        newData = plans.filter((plan,i,arr) => {
            if (i%2==0) {
                return plan
            }
        })
        console.log(newData);
        res.status(200).json({message: newData});
    })
}