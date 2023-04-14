const express = require('express');
const router = express.Router();
const Joi = require('joi');

const genres = [{"id":1,"type":"Action","title":"Spider-man"},{"id":2,"type":"Adventure","title":"Indian-Jones"},{"id":3,"type":"Thriller","title":"Mummy"}];

router.get('/',(req,res)=>{
    res.send(genres);
});

router.get('/:id',(req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("There is no such Genre Id in the database!!!");
    res.send(genre);
});

router.put('/',(req,res)=>{
    // Validate post request
    const {error} = validateGenre(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    const genre = {
        "id": genres.length + 1,
        "type": req.body.type,
        "title": req.body.title,
    }
    genres.push(genre);
    res.send(genre);
});

router.put('/:id',(req,res)=>{
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) return res.status(404).send("There is no such Genre Id in the database!!!");
    const { error } = validateGenre(req.body)
    if(error) return res.send.status(401).send(error.message);
    
    res.send(genre);
});

function validateGenre(genre){
    const schema = Joi.object({"type":Joi.string().required().min(3),"title":Joi.string().required().min(3)})
    return schema.validate(genre)
}


module.exports = router;