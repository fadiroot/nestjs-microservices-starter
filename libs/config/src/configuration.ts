export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  rabbitmq: {
    uri: process.env.RABBITMQ_URI,
  },
  services: {
    payment: process.env.PAYMENT_SERVICE_URL,
    order: process.env.ORDER_SERVICE_URL,
    shop: process.env.SHOP_SERVICE_URL,
  },
});
