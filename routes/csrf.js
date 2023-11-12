var router = require('express').Router();

const bodyParser = require('body-parser');

const token_req = 'XLA3cA4Mzqhoz9KgqySzAaDcgcLpFj8roWSQIcYj2fV32sftgLfE8laGBcZ9kM3v';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
    const formData = req.body;

    console.log('Broj računa:', formData.odredisniRacun);
    console.log('Iznos:', formData.iznos);  

    if (formData.ranjivost2 === 'on') {
        formData.ranjivost2 = 'da';
    } else {
        formData.ranjivost2 = 'ne';
    }
    const ranjivostChecked = formData.ranjivost2;

    if (ranjivostChecked == 'da') {
        formData.odredisniRacun = 'HR123456789';
        res.redirect('/csrfVulnerable?ranjivost=' + encodeURIComponent(ranjivostChecked) +
        '&odredisniRacun=' + encodeURIComponent(formData.odredisniRacun) +
        '&iznos=' + encodeURIComponent(formData.iznos));
    } else {
        if (token_req == formData.token) {    
            res.redirect('/csrfProtected?ranjivost=' + encodeURIComponent(ranjivostChecked) +
            '&odredisniRacun=' + encodeURIComponent(formData.odredisniRacun) +
            '&iznos=' + encodeURIComponent(formData.iznos) +
            '&token=' + encodeURIComponent(formData.token) );
        }
    }

    
});

module.exports = router;
