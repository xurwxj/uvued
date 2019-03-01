export default async ({ req, res }) => {
    if (req && res && req.cookies && res.cookie && !req.cookies["uuid"]) {
        const uuidV1 = require('uuid/v1');
        res.cookie("uuid", uuidV1());
    }
  };