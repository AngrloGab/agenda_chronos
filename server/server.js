import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'chronos_api'
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM tasks";
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/task', (req, res) => {
    const sql = "INSERT INTO tasks (titulo, status, prioridade, data, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())";
    const values = [
        req.body.titulo,
        req.body.status,
        req.body.prioridade,
        req.body.data,
    ];
    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.put('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const newStatus = req.body.status;

    const sql = "UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ?";
    const values = [newStatus, taskId];

    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.delete('/task/:id', (req, res) => {
    const taskId = req.params.id;

    const sql = "DELETE FROM tasks WHERE id = ?";
    const values = [taskId];

    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: `Tarefa com ID ${taskId} foi deletada.` });
    });
});

app.listen(8081, ()=>{
    console.log("Listening");
})