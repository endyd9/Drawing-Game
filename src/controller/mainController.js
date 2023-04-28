export const gameStart = (req, res) => {
  let keywords = ["apple", "umbrella", "volcano", "ball"];
  res.render("index.ejs", { keywords });
};

export const gameResult = (req, res) => {
  res.render("result.ejs", { result: req.result });
};
