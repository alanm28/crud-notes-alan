const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crud-usuarios', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

.then(db => console.log('Base de Datos conectada'))
.catch(err => console.error(err));