export const gameStart = (req, res) => {
  let keywords = ["apple", "umbrella", "volcano", "ball"];
  req.session.score = 0;
  console.log("시작 점수 : " + req.session.score);
  res.render("game.ejs", { keywords });
};

export const gameResult = (req, res) => {
  const {
    session: { score },
  } = req;
  res.render("result.ejs", { result: score });
};
