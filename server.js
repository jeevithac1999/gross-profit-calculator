const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/about', (req, res) => {
  res.send({ express: 'This easy calculator will help you determine selling prices for your products in order to save money and increase profits' });
});

app.post('/api/home', (req, res) => {
  console.log(req.body);
  const cost=parseInt(req.body.cost)
  const markup=parseInt(req.body.percent)
  const profit=(cost*markup)/100;
  const sale=profit+cost;
  const margin=(((markup/100)/(1+(markup/100)))*100).toFixed(2)
  const symbol='%'
  const dollar='$'
  res.send(
    {profit:profit,sale:sale,margin:margin,symbol:symbol,dollar:dollar}
  );
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
