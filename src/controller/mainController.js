export const gameStart = (req, res) => {
  const keyword = ["apple", "umbrella", "volcano", "ball"];
  res.render("index.ejs", { keyword });
};

export const gameResult = (req, res) => {
  res.render("result.ejs", { result: req.result });
};
