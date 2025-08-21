import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({     // 401 = Unauthorized
                message: "User not authenticated",
                success: false,
            })
        }
        // Authenticated.. till you have Token/Cookie !!
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        // during generation of token in  userControllers , i set user_id in token/cookie .... that comes as information in token
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated; 