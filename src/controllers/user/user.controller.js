import { Link } from "../../model/links.model.js";
import { metaData } from "../../utils/getMetaData.js";
import { apiResponse } from "../../utils/apiResponce.js";

export const GetAllLinks = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send(new apiResponse("user not found", 401));
    }

    const allLinks = await Link.find({ userId: user._id });

    return res
      .status(200)
      .json(new apiResponse("Sucess", 200, { links: allLinks }));
  } catch (error) {
    return res
      .status(500)
      .send(new apiResponse("something went wrong while fetching links", 500));
  }
};

export const Create = async (req, res) => {
  const { urlValue } = req.body;
  const user = req.user;
  const { title, image, url } = await metaData(`http://${urlValue}`);
  console.log(title);
  try {
    const UrlData = await Link.create({
      title: title || `http://${urlValue}`,
      url: url || `http://${urlValue}`,
      image: image || "",
      userId: user._id,
    });
    res.send(new apiResponse("Sucess", 200, { urlData: UrlData }));
  } catch (error) {
    console.log(error);
  }
};

export const DeactivateLink = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { isActive } = req.body;
  try {
    const url = await Link.findByIdAndUpdate(
      id,
      { $set: { isActive: !isActive } },
      { new: true }
    );
    // url.get("isActive");

    res.status(200).send(new apiResponse("Success", 200, { update: url }));
  } catch (error) {
    return res.status(500).send("server error");
  }
};

export const DeleteLink = async (req, res) => {
  const { id } = req.params;
  try {
    await Link.findOneAndDelete({ _id: id });
    res.status(200).send(new apiResponse("Success", 200, {}));
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong");
  }
};
