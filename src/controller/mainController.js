export const gameStart = (req, res) => {
  let keywords = ["apple", "umbrella", "volcano", "ball"];
  req.result = 0;
  const { result } = req;
  console.log(result);
  res.render("index.ejs", { keywords, result });
};

export const gameResult = (req, res) => {
  console.log(req.result);
  res.render("result.ejs", { result: req.result });
};
