import { initDatabase, createDenunciasTable } from '../../initdatabase'; 
createDenunciasTable()

export default function handler(req, res)  {
    const db = initDatabase()


    if (req.method === "POST") {
        const {local, descricao} = req.body

        const stmt = db.prepare("INSERT INTO denuncias (local, descricao) VALUES (?, ?)")
        stmt.run(local, descricao, function(err,) {
            if (err) {
                return res.status(500).json({error: err.message})
            } 

            return res.status(201).json({message: "Denúncia Criada!"})


        }), 
        stmt.finalize()

    }

    if (req.method === "DELETE") {
        const {id} = req.body

        const stmt = db.prepare("DELETE FROM denuncias WHERE denuncias.id = ?")
        stmt.run(id, function(err,) {
            if (err) {
                return res.status(500).json({error: err.message})
            } 

            return res.status(201).json({message: "Denúncia deletada!"})


        }), 
        stmt.finalize()

    }

    if (req.method === "GET") {
        db.all('select * from denuncias', (err, rows) => {
            if (err) {
                return res.status(500).json({error: err.message})
            } 

            return res.status(200).json(rows)
        })
    }
}