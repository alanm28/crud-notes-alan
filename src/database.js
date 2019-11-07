const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Alan:hola1234@cluster0-iel0e.mongodb.net/test?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

.then(db => console.log('Base de Datos conectada'))
.catch(err => console.error(err));