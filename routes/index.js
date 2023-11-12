const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Naslov'
  });
});

router.post('/', (req, res) => {
  const formData = req.body;

  if (formData.ranjivost === 'on') {
    formData.ranjivost = 'da';
  } else {
    formData.ranjivost = 'ne';
  }

  const ranjivostChecked = formData.ranjivost;
  const poruka = formData.poruka;
  const pin = formData.pin;

  const formData2 = {
    ranjivostChecked: formData.ranjivost ? 'da' : 'ne',
    poruka: formData.poruka,
    pin: formData.pin
  };

  console.log('Ranjivost Checked:', ranjivostChecked);
  console.log('Poruka:', poruka);
  console.log('PIN:', pin);

  res.redirect('/sqlinjection?ranjivost=' + encodeURIComponent(ranjivostChecked) +
                             '&poruka=' + encodeURIComponent(formData.poruka) +
                             '&pin=' + encodeURIComponent(formData.pin));
});

module.exports = router;
