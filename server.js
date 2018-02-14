// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myFirstDB');
mongoose.Promise = global.Promise;


let UserSchema = new mongoose.Schema({
    name: String,
    age: Number
}, {timestamps: true})

// mongoose.model("User", UserSchema);
// let User = mongoose.model("User");

let User = mongoose.model("User", UserSchema);
// ==============================




// ===== ROUTES! ======
app.get('/', function(req, res){
    User.find({}, function(err, results){
        if(err){
            // console.log(err);
            // res.send(err);
            res.json({message: "Error", error: err})
        }else{
            // console.log(results);
            // res.render('index', {data: results});
            res.json({message: "Success", data: results})
        }
    })
})

app.get('/new/:name/', function(req, res){
    let new_user = new User({name: req.params.name});
    new_user.save(function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            // res.redirect('/');
            res.json({message: "Success", data: results})
        }
    })
})

app.get('/remove/:name/', function(req, res){
    User.remove({name: req.params.name}, function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.redirect('/');
        }
    })
})

app.get('/:name/', function(req, res){
    User.find({name: req.params.name}, function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json({message: "Success", data: results})
        }
    })
})

// ======================




// ==== SERVER LISTENER! =======
app.listen(8000, function(){
    console.log("Express on port 8000!")
});
// =============================




// ======= HERE BE DRAGONS (or possibly socket code) ========

// ==========================================================

