import jwt from "jsonwebtoken";
import User from "../schemas/User";
import { ObjectId } from "mongodb";
import db from "../db";

export const updateUserInfo = {
  path: "/api/users/:userId",
  method: "put",
  handler: async (req, res) => {
    // Getting authorization token from the header
    const { authorization } = req.headers;
    // Getting user id from the request params
    const { userId } = req.params;

    // Params that will be updated
    const updates = (({ firstName, lastName }) => ({
      firstName,
      lastName,
    }))(req.body);

    // If there is no authorization token, then stop the function and return message
    if (!authorization) {
      return res.status(401).send({
        result: "not authorized",
        message: "Not permitted to update user.",
      });
    }

    // Getting the exact token from the header
    const token = authorization.split(" ")[1];

    // Verifying the token with our secret key
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err)
        return res.status(401).json({
          result: "Token is wrong!",
          message: "Unable to verify token.",
        });

      // If the token is valid, then get the user id from the token
      const { id } = decoded;

      // If the id is which is comes from the token is not equal to the id which is comes from the request stop the func and return message
      if (id !== userId) {
        return res
          .status(403)
          .json({ message: "Not allowed to update that user's data" });
      }
      await db.connect();

      // Setting infos to the database
      const result = await User.findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: { info: updates },
        },
        { returnOriginal: false }
      );

      const { email, isVerified, info } = result;

      // Generating new token with new credentials
      const token = jwt.sign(
        { id, email, isVerified, info },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      // Sending new token with the new credentials
      res.status(200).send({
        token,
      });

      await db.disconnect();
    });
  },
};
