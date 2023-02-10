const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
require("dotenv").config();
const gnd = require("./gnd");

const crawl = async (isLogin) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
  });

  const page = await browser.newPage();

  if (isLogin) {
    // 로그인을 했을 경우
    console.log("isLogin = true");

    // .env에서 이메일, 비밀번호 가져오기
    const loginEmail = process.env.LOGIN_EMAIL;
    const loginPW = process.env.LOGIN_PASSWORD;

    // 로그인
    await page.goto(
      "https://datalab.labangba.com/user/sign_in?redirect=%2Frecruit"
    );
    await page.type(
      "#__next > div > div > div > main > form > div:nth-child(1) > div > input",
      loginEmail
    );
    await page.type(
      "#__next > div > div > div > main > form > div:nth-child(2) > div > input",
      loginPW
    );
    await Promise.all([
      page.click("#__next > div > div > div > main > form > button"),
      page.waitForNavigation(),
    ]);

    if (page.url() === "https://datalab.labangba.com/recruit") {
      // 로그인이 성공적일 경우
      console.log("success");
      await page.reload();
      // console.log(await page.cookies());
      const cookieJson = await page.cookies();
      // let cookieData = JSON.stringify(cookieJson);
      // console.log(cookieData);

      // 쿠키 가져오기
      const cookieValues = cookieJson.map((obj) => obj.value);
      // console.log(cookieValues);

      // 분류 JSON 가져오기
      let gndJson = await gnd(
        cookieValues[0],
        cookieValues[1],
        cookieValues[2],
        cookieValues[3]
      );
      // console.log(gndJson);
      // const current = gndJson["cats"]["50000013"];
      // console.log(current);
      // if (current["pid"] != null) {
      //   const type = gndJson["cats"][current.pid];
      //   console.log(type["name"]);
      // } else {
      //   console.log(current["name"]);
      // }

      // 랭킹 JSON 가져오기
      const content = await page.content();
      const $ = cheerio.load(content);
      const scriptJson = $("#__NEXT_DATA__");
      const json = JSON.parse($(scriptJson).text());

      const types = json["props"]["pageProps"]["labang_ranking"].map((obj) => {
        const current = gndJson["cats"][obj.cid];

        if (current["pid"] !== null) {
          const type = gndJson["cats"][current.pid];
          // obj.type = type["name"];
          return type["name"];
        } else {
          // obj.type = current["name"];
          return current["name"];
        }
      });
      console.log(types);
      // console.log(json["props"]["pageProps"]["labang_ranking"]);

      return json;
    } else {
      // 로그인이 안됐을 경우
      console.log("error");
    }
  } else {
    // 로그인을 하지 않을 경우
    console.log("isLogin = false");

    await page.goto("https://datalab.labangba.com/recruit");

    // 랭킹 데이터 가져오기
    const content = await page.content();
    const $ = cheerio.load(content);
    const scriptJson = $("#__NEXT_DATA__");
    data = JSON.parse($(scriptJson).text());
    // console.log(JSON.stringify(json));

    return data;
  }

  await browser.close();
};

module.exports = crawl;
