exports.imagePost = (req,res,next) => {
    if(!req.file){
        console.log("No file received");
        res.status(200).json({message: "File Upload Failed"});
    }
    const imageUrl = req.file.path;
    console.log(`File saved in: ${imageUrl}`);
    res.status(200).json({message: "File Uploaded"});
}