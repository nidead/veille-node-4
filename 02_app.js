const express = require('express');
const app = express();
app.use(express.static('public'));
const fs = require("fs");

const transform_en_tableau =(collection)=>
{
	let chaine ="<table>"
	for (elm of collection){
		for(p in elm){

		}
	}
	chaine+= '</table>'
	return chaine
}
//////////////////////////////////////////////////////////////////////ROUTE /html/01_form.htm'
app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/html/" + "01_form.htm" );
})
//////////////////////////////////////////////////////////////////////ROUTE RACINE
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})
//////////////////////////////////////////////////////////////////////ROUTE TRAITER GET
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')



// on utilise l'objet req.query pour récupérer les données GET
 let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 telephone:req.query.telephone,
 courriel:req.query.courriel
 };
console.log(reponse);
 res.end(JSON.stringify(reponse));


fs.appendFile( __dirname + "/public/data/" + "membres.txt" ,","+ JSON.stringify(reponse), function (err,data) {
  if (err) throw err;
  console.log('Sauvegardé');
});
})
///////////////////////////////// route emembre
app.get("/membres",(req,res)=>{
	fs.readFile(__dirname + "/public/data/" + 'membres.txt', 'utf8', function (err, data) {
 if (err) throw err;

let collection = JSON.parse("["+ data +"]");
res.end(transform_en_tableau(collection));

 //res.sendFile( __dirname + "/public/data/" + "membres.txt" );

});
})

var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})