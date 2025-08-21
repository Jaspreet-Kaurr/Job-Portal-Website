import DataUriParser from "datauri/parser.js"   // first do -->  npm i datauri
import path from "path";


const getDataUri = (file) => {    // just receciving file url as parameter ...making some changes in that and then returning it .
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;

// From this file ...mujhe ek datauri generate hooke milega !