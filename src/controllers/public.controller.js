import { User } from "../model/user.model.js";
import { Link } from "../model/links.model.js";

export const getallUrls = async (req, res) => {
  const { userName } = req.params;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const links = await Link.find({ userId: user._id }).select(
      "title url image"
    );
    res.send(links);
  } catch (error) {}
};
