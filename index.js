const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());

const query = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_system",
});

app.get("/api/v1/getAllProducts", (req, res) => {
  query.execute(`select * from products`, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Faild", message: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
});

app.get("/api/v1/getProductById/:id", (req, res) => {
  const { id } = req.params;
  query.execute(`select * from products where id = ${id}`, (err, data) => {
    if (err) {
      res.json({status:"Faild",message:err})
    } else {
      res.json({status:"success" , data:data})
    }
  })
})

app.post("/api/v1/addProduct", (req, res) => {
  const { title, description, price } = req.body;
  query.execute(
    `insert into products (title,description,price) values ('${title}' , "${description}" , "${price}")`,
    (err, data) => {
      if (err) {
        res.json({ status: "Faild", message: err });
      } else {
        res.json({ status: "success", data: data });
      }
    }
  );
});

app.delete("/api/v1/deleteProduct/:id", (req, res) => {
  const { id } = req.params;
  query.execute(`delete  from products where id = ${id}`, (err, data) => {
    if (err) {
      res.json({ status: "Faild", message: err });
    } else {
      res.json({ status: "success", data: data });
    }
  });
});

app.put("/api/v1/upDateProduct", (req, res) => {
  const { id, title, description, price } = req.body;
  query.execute(
    `update products set title = "${title}" , description = "${description}" , price = ${price} where id = ${id} `,
    (err, data) => {
      if (err) {
        res.json({ status: "Faild", message: err });
      } else {
        res.json({ status: "success", data: data });
      }
    }
  );
});

app.listen(port, () => {
  console.log("Server Running");
});
