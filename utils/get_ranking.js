const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
require("dotenv").config();

const getRanking = async (isAuthenticated) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome-stable",
    headless: true,
  });

  const page = await browser.newPage();

  if (isAuthenticated) {
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
      console.log("login success");
      await page.reload();

      // 랭킹 JSON 가져오기
      const content = await page.content();
      const $ = cheerio.load(content);
      const scriptData = $("#__NEXT_DATA__");
      const json = JSON.parse($(scriptData).text());
      const jsonWithHref = addHref(page, json);

      return jsonWithHref;
    } else {
      // 로그인이 안됐을 경우
      console.log("login error");
    }
  } else {
    // 로그인을 하지 않을 경우
    console.log("isLogin = false");

    await page.goto("https://datalab.labangba.com/recruit");

    // 랭킹 데이터 가져오기
    const content = await page.content();
    const $ = cheerio.load(content);
    const scriptData = $("#__NEXT_DATA__");
    json = JSON.parse($(scriptData).text());
    const jsonWithHref = addHref(page, json);

    return jsonWithHref;
  }

  await browser.close();
};

const addHref = async (page, json) => {
  const hrefs = await page.$$eval(
    "#__next > div > div > div > div > div > div.Table_container__cUG9N > table > tbody > tr > td:nth-child(2) > a",
    (el) =>
      el.map((obj) => "https://datalab.labangba.com" + obj.getAttribute("href"))
  );

  json["props"]["pageProps"]["labang_ranking"].map((obj, index) => {
    obj.link = hrefs[index];
  });

  return json["props"]["pageProps"]["labang_ranking"];
};

module.exports = getRanking;
