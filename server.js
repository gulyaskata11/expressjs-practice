const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const { stringify } = require('querystring')

app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h1>Hello Kata! It's Codecool</h1>")
})

app.get('/api/students', (req, res) => {
    fs.readFile(`${__dirname}/data/students.json`, (err, data) => {
       res.send(JSON.parse(data))
    });
})

app.get('/api/students/active', (req, res) => {
    fs.readFile(`${__dirname}/data/students.json`, (err, data) => {
        const students = JSON.parse(data)
        const actives = students.filter(el => el.status === true)
        res.send(actives)
    });
})

app.get('/api/students/finished', (req, res) => {
    fs.readFile(`${__dirname}/data/students.json`, (err, data) => {
        const students = JSON.parse(data)
        const finished = students.filter(el => el.status === false)
        res.send(finished)
    });
})

app.get('/api/students/:id',(req, res) => {
    fs.readFile(`${__dirname}/data/students.json`, (err, data) => {
        const students = JSON.parse(data)
        const student = students.find(el => el.id === Number(req.params.id))
        res.send(student)
    });
})

app.post('/new-student/:name', (req, res) => {
    fs.readFile(`${__dirname}/data/students.json`, (err, data) => {
        let students = JSON.parse(data)

        let newStudent = {
            "id": students[students.length-1].id + 1, 
            "name": req.params.name.split("_").join(" "),  //.replace("_", " ")
            "status": true
        }

        students.push(newStudent)
        
        fs.writeFile(`${__dirname}/data/students.json`, JSON.stringify(students, null, 2), (err) => {
            if (err) {
                console.log('error', err)
                return res.status(500).send(err)
              } else {
                return res.send({response: "done"})
              }
        })    
    })
})

app.listen(port, () => {
    console.log(`server is running at: http://127.0.0.1:${port}`)
  });