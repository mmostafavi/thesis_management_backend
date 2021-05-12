const express = require("express")
const mongoose = require("mongoose")

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

 /*
  you may need to add authentication here
    app.use(student_Auth)
    app.use(instructor_Auth)
  you may need to add authentication here
 */


mongoose.set('returnOriginal', false);
mongoose
	.connect(
		`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}@cluster0.oygyj.mongodb.net/${process.env.DATABASE_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
		{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
	)
	.then(() => {
    app.listen(process.env.PORT)
		console.log(`app is listening in port: ${process.env.PORT}`);
	})
	.catch((err) => {
		throw err;
	});


