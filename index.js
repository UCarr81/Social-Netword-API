const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(require('./routes'));

app.use(routes);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/SocialNetwork', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
