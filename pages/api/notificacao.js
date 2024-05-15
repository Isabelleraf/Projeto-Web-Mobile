import { initDatabase, createNotificationTable } from '../../initdatabase'; 
createNotificationTable()

export default function handler(req, res)  {
    const db = initDatabase()


    if (req.method === "POST") {
        const {titulo, descricao} = req.body

        const stmt = db.prepare("INSERT INTO notifications (titulo, descricao) VALUES (?, ?)")
        stmt.run(titulo, descricao, function(err,) {
            if (err) {
                return res.status(500).json({error: err.message})
            } 

            return res.status(201).json({message: "Notificação Criada!"})
        }), 
        stmt.finalize()

    }

    if (req.method === "GET") {
        db.all('select * from notifications', (err, rows) => {
            if (err) {
                return res.status(500).json({error: err.message})
            } 

            return res.status(200).json(rows)
        })
    }
}