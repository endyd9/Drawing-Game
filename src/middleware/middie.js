import fs from "fs";
import google from "@google-cloud/vision";

export const getAnswer = (req, res, next) => {
  const { url } = req.body;
  const buffer = Buffer.from(url.url, "base64");
  fs.writeFileSync("./src/resources/image.png", buffer);
  next();
};

export const vision = async (req, res, next) => {
  console.log("API작동중");
  const { keyword } = req.body;
  console.log(keyword);
  const vision = google;

  const client = new vision.ImageAnnotatorClient();

  const [results] = await client.labelDetection("./src/resources/image.png");

  const labels = results.labelAnnotations;
  labels.forEach((label) => {
    if (label.description.toLowerCase() === keyword.toLowerCase()) {
      console.log("정답");
      return res.sendStatus(200);
    }
    console.log("오답");
    console.log(req.result);
  });
};
