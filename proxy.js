export default {
    install(app, options) {
        const proxy = require('http-proxy-middleware');
        const cEnv = require("./conf");
        // const cookieParser = require('cookie-parser');
        // app.use(cookieParser());
        app.use('/api', proxy({
            target: process.env.ServerUrl || cEnv.api.url,
            changeOrigin: true,
            secure: false,
            headers: {
                "X-Auth-AppID": process.env.AppId || cEnv.api.appId
            },
            onProxyReq: (proxyReq, req, res) => {
                // console.log("req.cookies: ",req.cookies);
                // console.log("req.header: ",req.headers);
                let uuid = req.cookies["uuid"] || req.header('X-Client-ID') || null;
                    proxyReq.setHeader("X-Client-ID", uuid);
                    let uip = req.header('x-forwarded-for') ||
                    req.connection.remoteAddress;
                    proxyReq.setHeader("x-forwarded-for", uip);
                    let token = req.cookies["token"] || req.header("X-Auth-Token") || null;
                    proxyReq.setHeader("X-Auth-Token", token);
            },
            onError(err, req, res) {
                console.log("remote server err: ", err);
                res.send({
                    "status": "fail",
                    "result": "remote server err"
                });
            },
            pathRewrite: {
                '^/api/': '/'
            }
        }));
    }
}