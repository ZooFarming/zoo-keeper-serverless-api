import Cors from 'cors'
let Parser = require('rss-parser');
let parser = new Parser();


async function main(req) {
  // let query = req.query;

  let result = [];

  let feed = await parser.parseURL('https://medium.com/feed/zookeeper-blog');
  console.log(feed.title);

  feed.items.forEach(item => {
    result.push(item);
  });

  return { success: true, data: result };
}

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  res.statusCode = 200
  res.json(await main(req));
}

export default handler;
