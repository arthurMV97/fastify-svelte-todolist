const createUser = (req, res, pool, bcrypt, saltRound) => {
    bcrypt.hash(req.body?.password, saltRound, (error, hash) => {
        if (error) throw err
        pool.query("INSERT INTO users (nickname, password) VALUES($1,$2) ", [
            req.body?.nickname,
            hash,
        ], (err) => {
            if (err?.code === "23505") res.status(400).send("This nickname already exists");
            else { res.status(201).send("User has been saved") }
        })
    })

}


const signUser = (req, res, pool, bcrypt) => {
    const { nickname, password } = req.body
    pool.query("SELECT * FROM users WHERE nickname = $1", [nickname], (err, result) => {
        if (err) throw err

        else if (result.rows.length === 0) {
            res.status(400).send("This user doesn't exists")
        }
        else {
            const { nickname: nicknameResult, id: idResult, password: passwordResult } = result?.rows[0]
            const hashed = passwordResult

            bcrypt.compare(password, hashed, (error, answer) => {
                if (answer) {
                    res.status(200).send({ id: idResult, nickname: nicknameResult })
                } else {
                    res.status(401).send('The password is wrong')
                }
            })
        }
    })
}



const modifyNicknameByUserId = (req, res, pool) => {
    pool.query("UPDATE users SET nickname = $1 WHERE id = $2;", [
        req.body?.nickname,
        req.params?.id
    ], (err) => {
        if (err) throw err;
        res.status(201).send("User nickname has been updated")
    })
}


module.exports = { createUser, signUser, modifyNicknameByUserId }