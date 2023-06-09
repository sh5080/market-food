import jwt from "jsonwebtoken";

function loginRequired(req, res, next) {
    // request 헤더로부터 authorization bearer 토큰을 받음.
    const userToken = req.headers["authorization"]?.split(" ")[1];

    // 이 토큰은 jwt 토큰 문자열이거나, 혹은 "null" 문자열이거나, undefined임.
    // 토큰이 "null" 일 경우, login_required 가 필요한 서비스 사용을 제한함.
    if (!userToken || userToken === "null") {
        console.log("사용자 서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
        res.status(401).json({
        result: "forbidden-approach",
        reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
        });

        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
        const jwtDecoded = jwt.verify(userToken, secretKey);

        const userId = jwtDecoded.userId;

        if (!userId) {
        console.log("서비스 사용 요청이 있습니다.하지만, 회원 토큰이 아닙니다.");

        res.status(403).json({
            result: "forbidden-approach",
            reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
        });

        return;
        }
        req.userId = userId; 
        next();
    } catch (error) {
        next(error);

        return;
    }
}

export default loginRequired ;