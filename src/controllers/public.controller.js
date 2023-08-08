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
      "title url image isActive"
    );

    const activeLinks = links.filter((item) => item.isActive !== false);
    res.send(activeLinks);
  } catch (error) {
    return res.status(500).send("internal server error");
  }
};
