//require the scheme into the controller
var Userdb = require('../model/model')

//Create a new user
exports.create = (req, res) => {
//validate request
if(!req.body){
res.status(404).send({message: "content cannot be empty"})
return
}

//create a new user
const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
})

//save to database
user
.save(user)
.then(data => {
res.redirect('/')
})
.catch(err => {
res.status(500).send({
    message: err.message || "some error occcured while creating user"
})
})

}


// Retrieving single or all items 
exports.find = (req, res) => {

if(req.query.id){
  const id = req.query.id  

  Userdb.findById(id)
  .then( user => {
      if(!user){
          res.status(404).send({message: "No user found"})
      }else {
        res.send(user)
      }
      
  })
  .catch(err => {
      res.status(500).send({messsage: err.message || 'Some error occured trying to retrieve the user' })
  })
  

}else{
    Userdb.find()
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({message: `error retrieving users`})
    })
}




}

//updating a user by ID
exports.update = (req, res) => {
if(!req.body){
    return
    res.status(400).send({message: `Cannot find user with id ${id}`})
} 

const id = req.params.id
Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
.then(data => {
    if(!data){
        res.status(404).send({message: `cannot find user with the id ${id}`})
    }else{
        res.send(data)
    }
}).catch(err => {
    res.status(500).send({message: 'Error occured'})
})
}

//deleting a user by id
exports.delete = (req, res) => {
const id = req.params.id

Userdb.findByIdAndDelete(id)
.then(data => {
    if(!data){
        res.status(404).send({message: `No user with ${id}`})
    }else{
        res.send(`User with ${id} has been deleted successfully!`)
    }
    }).catch(err => {
        res.status(500).send({message: `Error occured while trying to delete user with ${id}`})
    })
}
