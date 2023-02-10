const gnd = async (gaVN7F3DELDK, sales2, sales2Sig, ga) => {
  let cookie = `_ga=${ga}; sales2=${sales2}; sales2.sig=${sales2Sig}; _ga_VN7F3DELDK=${gaVN7F3DELDK}`;

  const response = await fetch("https://datalab.labangba.com/home/gnb", {
    headers: {
      accept: "*/*",
      "accept-language": "en-AU,en;q=0.9,ko-KR;q=0.8,ko;q=0.7,en-US;q=0.6",
      "content-type": "application/json",
      "sec-ch-ua":
        '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      cookie: cookie,
      Referer: "https://datalab.labangba.com/recruit",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "{}",
    method: "POST",
  });

  return response.json();
};

module.exports = gnd;
