import fs from "fs";

export const decodingImg = (req, res, next) => {
  const { url } = req.body;
  const buffer = Buffer.from(url, "base64");
  fs.writeFileSync("./src/resources/image.png", buffer);
  next();
};
import google from "@google-cloud/vision";

export const vision = async (req, res, next) => {
  console.log("API작동중");
  const { keyword } = req.body;
  const vision = google;

  const client = new vision.ImageAnnotatorClient();

  const [result] = await client.labelDetection("./src/resources/image.png");

  const labels = result.labelAnnotations;
  labels.forEach((label) => {
    console.log(label.description.toLowerCase(), keyword.toLowerCase());
    if (label.description.toLowerCase() === keyword.toLowerCase()) {
      req.result = "맞춤";
      next();
    } else {
      req.result = "틀림";
      next();
    }
  });
};
