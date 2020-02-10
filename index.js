const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'ahmed',
    password :'Ahmed123!',
    database : 'tokokasih'
});

const PORT = 4000

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(202).send('<h1> coba api ujian </h1>')
})

app.get('/categories', (req, res) => {
    console.log(req.query)
    const query = 'SELECT * FROM categories;'
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send(results)
    })
})  

app.get('/categories/:nama', (req, res) => {
    const query = `SELECT * FROM categories WHERE category =${connection.escape(req.params.nama)}`

    connection.query(query, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.post('/categories', (req, res) => {
    console.log('Body :', req.body)

    const query = `INSERT INTO categories SET ? ;`
    connection.query(query, req.body, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})

app.put('/categories/:id', (req, res) => {
    console.log(req.params)
    const query = `UPDATE categories SET ? WHERE id = ${connection.escape(req.params.id)}`
    connection.query((query, req.body, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    }))
})

app.delete('/categories/:id', (req,res) => {
    console.log(req.params)
    const query = `DELETE FROM categories WHERE id= ${connection.escape(req.params.id)}`
    connection.query(query, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    const query = 'SELECT * FROM products;'
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send(results)
    })
})  


app.post('/products', (req, res) => {
    const query = `INSERT INTO products SET ? ;`
    connection.query(query, req.body, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})

app.put('/products/:id', (req, res) => {
    console.log(req.params)
    const query = `UPDATE products SET ? WHERE id = ${connection.escape(req.params.id)}`
    connection.query((query, req.body, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    }))
})

app.delete('/products/:id', (req,res) => {
    console.log(req.params)
    const query = `DELETE FROM products WHERE id= ${connection.escape(req.params.id)}`
    connection.query(query, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})

app.post('/productcat', (req, res) => {
    const query = `INSERT INTO productcat SET ? ;`
    connection.query(query, req.body, (err, results) => {
        if(err) {
            return res.status(500).send(err)
        }
        console.log(results)
        res.status(200).send(results)
    })
})

app.get('/productcat', (req, res) => {
    console.log(req.query)
    const query = 'SELECT * FROM products;'
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send(results)
    })
})  

app.get('/categoriespath', (req, res) => {
    const query = `SELECT * FROM tokokasih.categories_path;`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send(results)
    })
})

app.get('/categorieslvl', (req, res) => {
    const query = `SELECT * FROM tokokasih.categorieslvl;`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send(results)
    })
})

app.get('/categorieschild/:id', (req, res) => {
    const query = `WITH RECURSIVE category_path (id, category, parentId) AS
    (
      SELECT id, category, parentId
        FROM categories
        WHERE id = ${connection.escape(req.params.id)} 
      UNION ALL
      SELECT c.id, c.category, c.parentId
        FROM category_path AS cp JOIN categories AS c
          ON cp.parentId = c.id
    )
    SELECT * FROM category_path;`
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send(results)
    })
})


app.delete('/categories', (req, res) => {
    console.log(req.query)
    const query = 'SELECT * FROM categories;'
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send(results)
    })
})  

app.listen(PORT, () => console.log(`API berhasil berhasil aktif di ${PORT}`))