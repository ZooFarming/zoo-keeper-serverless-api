import Cors from 'cors'

async function main(req) {
  let query = req.query;

  return { success: true, data: { addr, block, balance: total.div(1e18).toString(), time: Date.now() } };
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
