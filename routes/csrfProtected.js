var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

  const formData = {
    ranjivostChecked: req.query.ranjivost,
    odredisniRacun: req.query.odredisniRacun,
    iznos: req.query.iznos,
    token: req.query.token
  };

    res.render('csfrProtected', { formData });

});

module.exports = router;
