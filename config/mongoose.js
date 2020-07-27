const mongoose = require('mongoose');
      
//Mongoose setup 
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

//TODO: Solve whitelist thing with heroku
mongoose.connect(process.env.MONGODB_URI);
