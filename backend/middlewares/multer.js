import multer from "multer";

//  multer has memoryStorage
 
const storage = multer.memoryStorage();    // keep file in memory as buffer

// multer is a func in which we provide storage
// .single("file")  -->  This file .. name should be similar as mention in  'Profile Input Field in Signup page' --> In input field --> type = file

// It's a middleware
export const singleUpload = multer({storage}).single("file");


// Now , where-where you need image upload functionality( partiuclary in ROUTES  like Register ) .... Import it there 