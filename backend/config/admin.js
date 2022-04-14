module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'b0aed20fda44c1b401cc83e7ac58a0c6'),
  },
});
