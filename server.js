const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

/**
  /login --> POST = success/fail
  /register --> POST = user
  /profile/:userId --> GET = user
  /image --> PUT = user
*/

const port = process.env.PORT || 3002;
const app = express();

app.use(bodyParser.json());
app.use(cors());

/**
 * mock database
 * @type {{users: *[]}}
 */
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '456',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    },
  ]
};

/**
 * home page
 */
app.get('/', (req, res) => {
  res.send(database.users);
});

/**
 * login
 */
app.post('/login', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {

    const response = {
      status: 'success',
      user: database.users[0],
    };
    res.json(response);
  } else {
    res.status(400).json('error login in');
  }
});

/**
 * register
 */
app.post('/register', (req, res) => {
  const { email, name, password } = req.body;

  database.users.push({
    id: '789',
    name,
    email,
    password,
    entries: 0,
    joined: new Date(),
  });

  res.json(database.users[database.users.length-1])
});

/**
 * profile
 */
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const user = database.users.filter((user) => user.id === id);

  if (user.length) {
    res.json(user[0])
  } else {
    res.status(404).json('no such user');
  }
});

/**
 * images number
 */
app.put('/image', (req, res) => {
  const { id } = req.body;
  const user = database.users.filter((user) => user.id === id);

  if (user.length) {
    user[0].entries += 1;
    res.json(user[0].entries)
  } else {
    res.status(400).json('not found');
  }
});


/**
 * listening port
 */
app.listen(port, () => {
  console.log('app is running on port 3002')
});



