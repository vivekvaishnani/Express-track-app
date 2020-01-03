require('./models/User');
require('./models/Track');
const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/TrackRoutes');
const reuireAuth = require('./middlewares/requireAuth');



const app = express();


app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = 'mongodb+srv://admin:passwordpassword@cluster0-55yfw.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err);
});


app.get('/', reuireAuth, (req, res) => {
    res.send(`Your eamil: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});