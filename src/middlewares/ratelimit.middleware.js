const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err);
});

(async () => {
  await redisClient.connect();
})();

exports.rateLimiterMW = async (req, res, next) => {
  try {
    const subscription = req.subscription;

    const key = `rate-limit:user:${subscription._id}`;

    const count = await redisClient.incr(key);

    if (count === 1) {
      await redisClient.expire(key, subscription.ratelimit.window);
    }

    if (count > subscription.ratelimit.requests) {
      return res.status(429).json({
        message: "Too many requests!",
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
