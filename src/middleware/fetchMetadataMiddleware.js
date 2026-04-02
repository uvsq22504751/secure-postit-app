function blockCrossSiteStateChanges(req, res, next) {
  const method = req.method.toUpperCase();

  if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    return next();
  }

  const site = req.get('sec-fetch-site');

  if (!site) {
    return next();
  }

  if (site === 'cross-site') {
    return res.status(403).send('Requête cross-site bloquée.');
  }

  next();
}

module.exports = {
  blockCrossSiteStateChanges
};