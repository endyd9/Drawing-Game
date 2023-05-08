import fs from "fs";
import google from "@google-cloud/vision";

export const getAnswer = (req, res, next) => {
  const { url } = req.body;
  const buffer = Buffer.from(url.url, "base64");
  fs.writeFileSync("./src/resources/image.png", buffer);
  console.log("사진변환 완료");
  next();
};

export const vision = async (req, res, next) => {
  console.log("요청 왔지롱");
  const { keyword } = req.body;
  console.log(keyword);
  const vision = google;

  const client = new vision.ImageAnnotatorClient();

  const [results] = await client.labelDetection("./src/resources/image.png");

  const labels = results.labelAnnotations;
  labels.forEach((label) => {
    if (label.description.toLowerCase() === keyword.toLowerCase()) {
      req.session.score += 1;
      console.log("현재 점수 : " + req.session.score);
      return res.status(200).json({ score: req.session.score, result: "정답" });
    }
    console.log(label.description);
  });
};
