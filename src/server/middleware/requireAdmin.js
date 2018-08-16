module.exports = (req, res, next) => {
  console.log(`user: `, req.user);
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  if (!req.user.isAdmin) {
    return res.status(401).send({ error: 'No admin privileges' });
  }
  next();
};
