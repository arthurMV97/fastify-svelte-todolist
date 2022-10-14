const addTodo = (req, res, pool) => {
    pool.query("INSERT INTO todos (task, userid, date) VALUES($1,$2,$3); ", [
        req.body?.task,
        req.params?.userId,
        new Date()
    ], (err) => {
        if (err) throw err;
        res.status(201).send("Todo has been sent")
    })
}

const getTodoByUserId = (req, res, pool) => {
    pool.query("SELECT id, task, date FROM todos WHERE userid= $1;", [req.params.userId], (err, result) => {
        if (err) throw err;
        res.status(200).send(result.rows)
    })
}

const modifyTodoById = (req, res, pool) => {
    pool.query("UPDATE todos SET task = $1, date = $2 WHERE id = $3;", [
        req.body?.task,
        new Date(),
        req.params.id
    ], (err) => {
        if (err) throw err;
        res.status(201).send("Todo has been updated")
    })
}


module.exports = { addTodo, getTodoByUserId, modifyTodoById }