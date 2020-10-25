/**
 * @description To get trending youtube videos saved in DB.
 */
const GET = async (request, response) => {
  return;
};

/**
 * @description To get crawl youtube videos and save in DB.
 */
const FETCH = async (request, response) => {
  response.statusCode = 200;
  response.json({ name: "Hello World" });
  return response;
};
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      return FETCH(req, res);
    default:
      return GET(req, res);
  }
};
