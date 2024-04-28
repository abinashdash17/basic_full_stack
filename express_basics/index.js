const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

const file_path = 'database.txt';

app.use(cors());
app.use(express.json())
app.get('/posts',(req,res) => {
    fs.readFile(file_path,'utf8',(err,data) => {
        if(err) {
            console.log(err)
        }
        else {
            let file_content = JSON.parse(data);
            res.send(file_content);
        }
    })
})
app.post('/new_post',(req,res) => {
    console.log(req.body);
    if(req.body.post_name && req.body.post_content) {
        let old_data ; 
        fs.readFile(file_path,'utf8',(err,data) => {
            if(err){
                console.log(err)
            }
            else {
                old_data = JSON.parse(data);
                console.log('file read successfully');
                let new_data = {post_name : req.body.post_name , post_content : req.body.post_content}
                let new_content = [...old_data,new_data];
                fs.writeFile(file_path,JSON.stringify(new_content), err => {
                    if(err) {
                        console.error(err)
                    }
                    else {
                        console.log('file written succesfully')
                    }
                })
            }
        })

    }
    const op = {id : 'response received'};
    res.send(op);
})

app.listen(PORT);