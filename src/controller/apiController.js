import fs from "fs";
import google from "@google-cloud/vision";
import { log } from "console";

export const getAnswer = (req, res, next) => {
  const { url } = req.body;
  const buffer = Buffer.from(url.url, "base64");
  fs.writeFileSync("./src/resources/image.png", buffer);
  console.log("사진변환 완료");
  next();
};

export const vision = async (req, res, next) => {
  const { keyword } = req.body;
  const vision = google;
  console.log(keyword);
  const client = new vision.ImageAnnotatorClient();
  let isCorrect = false;

  const [results] = await client.labelDetection("./src/resources/image.png");

  const labels = results.labelAnnotations;
  labels.forEach((label) => {
    console.log(label.description);
    if (label.description.toLowerCase() === keyword.toLowerCase()) {
      console.log(label.description.toLowerCase() === keyword.toLowerCase());
      req.session.score += 1;
      console.log("현재 점수 : " + req.session.score);
      isCorrect = true;
    }
  });
  if (isCorrect) {
    return res.status(201).json({ score: req.session.score, result: "정답!" });
  } else {
    return res.status(200).json({ score: req.session.score, result: "오답.." });
  }
};
