const express = require('express')
const app = express()
const port = 3000

app.get('/jopa', (req, res) => {
    res.send('Hello World!')
  })



app.post('/auth', (req, res) => {

    const body = req.body
    const login = body.login
    const pw = body.pw

    const users = Mongo.Connect("URL").GetTable("users")

    const user = users.find().where(login == login && pw == pw)

    if(user) {
        res.status(200)
    } else {
        res.send("Низя").status(404)
    }

})

//параметраы запроса - id юзера
app.get("/user/", (req, res) => {
    const id = req.params[0]

    //процесс поиска в бд - start
    //процесс поиска в бд - end

    res.send(user)
})

app.post("/validate", (req, res) => {
    const body = req.body

    code = body.code
    user_id = body.user_id

    db.update(tasks.text = code).where(_id = user_id)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

