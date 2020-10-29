// -------------------------------------------------------------CONSULTAS DE EJEMPLO DE MONGO------------------------------------------------------------------


// find() realiza consultas
db.inventory.find( {} );

/* 
db.inventory.find( {} );
{ "_id" : ObjectId("5f99907c7330a525034220ad"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220ae"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220af"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
{ "_id" : ObjectId("5f99907c7330a525034220b0"), "item" : "planner", "qty" : 75, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "D" }
{ "_id" : ObjectId("5f99907c7330a525034220b1"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }

*/

//se le aplican filtros a la consulta
db.inventory.find( { status: "D" } )

/* 
db.inventory.find( { status: "D" } )
{ "_id" : ObjectId("5f99907c7330a525034220af"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
{ "_id" : ObjectId("5f99907c7330a525034220b0"), "item" : "planner", "qty" : 75, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "D" }
*/

//usamos Query Operators $in es como $or pero para valores de un mismo campo
db.inventory.find( { status: { $in: [ "A", "D" ] } } )

/* 
db.inventory.find( { status: { $in: [ "A", "D" ] } } )
{ "_id" : ObjectId("5f99907c7330a525034220ad"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220ae"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220af"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
{ "_id" : ObjectId("5f99907c7330a525034220b0"), "item" : "planner", "qty" : 75, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "D" }
{ "_id" : ObjectId("5f99907c7330a525034220b1"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }
>
*/

db.inventory.find( { status: "A", qty: { $lt: 30 } } )

/* 
> db.inventory.find( { status: "A", qty: { $lt: 30 } } )
{ "_id" : ObjectId("5f99907c7330a525034220ad"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
>
*/


db.inventory.find( { $or: [{ status: "A" }, {qty: { $lt: 30 }} ] })

/* 
db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
{ "_id" : ObjectId("5f99907c7330a525034220ad"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220ae"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220b1"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }
>
*/

// /^p/ sirve para buscar un valor en ese campo que empiece por dicha letra
db.inventory.find( {status: "A",$or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]} )

/* 
 db.inventory.find( {status: "A",$or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]} )
{ "_id" : ObjectId("5f99907c7330a525034220ad"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220b1"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }
*/


// ------------------------------------------------------------------CONSULTAS PERSONALIZADAS------------------------------------------------------------------------------------

//encuentra item con status A o B y que su qty sea menor que 20 o mayor que 60 , lleva un and explicito.
db.inventory.find( {$and:[ { status: { $in: [ "A", "B" ] }} , {$or:[ {qty: { $lt: 26}} , {qty: {$gt: 60}}]}] });
/*
{ "_id" : ObjectId("5f99907c7330a525034220ad"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99967a483a50186bd91fea"), "item" : "x1", "qty" : 80, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99967a483a50186bd91fed"), "item" : "z2", "qty" : 20, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "B" }
>
*/

// los que tengan una qty menor o igual a 75 y un status D , con un and implicito.
db.inventory.find({ qty:{$lte:75} , status:"D"});

/*
 db.inventory.find({ qty:{$lte:75} , status:"D"}
... );
{ "_id" : ObjectId("5f99907c7330a525034220b0"), "item" : "planner", "qty" : 75, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "D" }
>
*/

// esto devuelve el objeto ObjectId("5f99967a483a50186bd91fee") con status Z y qty 4.
db.inventory.find({ qty:{$gte:4} , status: {$eq:"Z"}});
/*
{ "_id" : ObjectId("5f99967a483a50186bd91fee"), "item" : "y1", "qty" : 4, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "Z" }
*/


// .sort nos permite ordenar los resultados
db.inventory.find().sort( { qty: 1 } )

/*
db.inventory.find().sort( { qty: 1 } )
{ "_id" : ObjectId("5f99967a483a50186bd91fee"), "item" : "y1", "qty" : 4, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "Z" }
{ "_id" : ObjectId("5f99967a483a50186bd91fed"), "item" : "z2", "qty" : 20, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "B" }
{ "_id" : ObjectId("5f99907c7330a525034220ad"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99967a483a50186bd91fe5"), "item" : "journal", "qty" : 25, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220b1"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99967a483a50186bd91fe9"), "item" : "postcard", "qty" : 45, "size" : { "h" : 10, "w" : 15.25, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220ae"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
{ "_id" : ObjectId("5f99967a483a50186bd91fe6"), "item" : "notebook", "qty" : 50, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "A" }
{ "_id" : ObjectId("5f99967a483a50186bd91feb"), "item" : "x2", "qty" : 60, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "B" }
{ "_id" : ObjectId("5f99907c7330a525034220b0"), "item" : "planner", "qty" : 75, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "D" }
{ "_id" : ObjectId("5f99967a483a50186bd91fe8"), "item" : "planner", "qty" : 75, "size" : { "h" : 22.85, "w" : 30, "uom" : "cm" }, "status" : "D" }
{ "_id" : ObjectId("5f99967a483a50186bd91fea"), "item" : "x1", "qty" : 80, "size" : { "h" : 14, "w" : 21, "uom" : "cm" }, "status" : "A" }
{ "_id" : ObjectId("5f99907c7330a525034220af"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
{ "_id" : ObjectId("5f99967a483a50186bd91fe7"), "item" : "paper", "qty" : 100, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "D" }
{ "_id" : ObjectId("5f99967a483a50186bd91fec"), "item" : "z1", "qty" : 155, "size" : { "h" : 8.5, "w" : 11, "uom" : "in" }, "status" : "C" }
>
*/
