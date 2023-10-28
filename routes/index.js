import userRouter from "./userRouter.js";
const PREFIX_URL = "/api/v1"

function route (app){
    app.use(PREFIX_URL + "/user", userRouter);
};

export default route
