const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/useRoutes');

app.use(cors());
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
