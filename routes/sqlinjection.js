var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

  const formData = {
    ranjivostChecked: req.query.ranjivost,
    poruka: req.query.poruka,
    pin: req.query.pin
  };

  if (!formData.poruka.match(/^[a-zA-Z0-9_-]+$/)) {
    if (formData.ranjivostChecked == 'da') {
      res.render('sqlinjection2', { formData });
    } else {
      res.render('sqlinjection3', { formData });
    }
    
  } else {
    res.render('sqlinjection', { formData });
  }

});

module.exports = router;
