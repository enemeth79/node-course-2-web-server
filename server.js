const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname +'/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err){
      console.log('Unable to append to server.log.');
    }
  })
  next();
});

// app.use((req, res, next) =>{
//   res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase(text);
});

// register a handler for an http get request
app.get('/',
(req, res) => {
  // res.send('Hello Express!');
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'Erzsebet',
  //   likes: ['like-1', 'like-2']
  // });

  res.render('home.hbs',
    {
      pageTitle: 'Home',
      welcomeMessage: 'Welcome here'
      // currentYear: new Date().getFullYear()
    }
  );
}
);

app.get('/about',
(req, res) => {
  // res.send('About page.');
  res.render('about.hbs',
    {
      pageTitle: 'About'
      // currentYear: new Date().getFullYear()
    }
  );
});

// /bad - send back json with errorMessage
app.get('/bad',
(req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
}
);

app.get('/projects',
(req, res) => {
  // res.send('About page.');
  res.render('projects.hbs',
    {
      pageTitle: 'Portfolio',
      description: "My portfolio is listed here."
    }
  );
}
);



app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
} );
