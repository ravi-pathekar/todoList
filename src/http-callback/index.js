module.exports = function makeHttpCallback (controller) {
    return (req, res) => {
      const httpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent')
        }
      }
      controller(httpRequest)
        .then(httpResponse => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers)
          } else {
            httpResponse.headers = {
              'Content-Type': 'application/json',
            }
            res.set(httpResponse.headers);
          }
          res.type('json')
          res.status(httpResponse.statusCode).send(httpResponse.body)
        })
        .catch(e => {
          const error = {
            status: 'failure',
            message: e.message || 'An unkown error occurred.' 
          }
          res.status(e.statusCode || 500).send({ error});
        })
    }
  }
  