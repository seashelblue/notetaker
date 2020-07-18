const dbData = require("../db/db.json");
const path = require('path')
const fs = require("fs");
const cryptoRandomString = require('crypto-random-string');

module.exports = (app) => {

  app.get("/api/notes", (request, response) => {
    response.json(dbData);
  });

//get by ID
  app.get("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    const ID = parseInt(id);
    for(i = 0; i < dbData.length; i++){  
     if(dbData[i].id === ID ){
      console.log(dbData[i].id)

       response.json(dbData[i])
     } 
  }
  });
  app.post("/api/notes", (request, response) => {
    const note = request.body
    note.id = parseInt(cryptoRandomString({length: 10, type: 'numeric'}));
    dbData.push(note);
    response.json(note);
    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(dbData), (err) => {
      if (err) throw err;
    });
  })
    app.delete("/api/notes/:id", (request, response) => {
    const id = request.params.id;
    const ID = parseInt(id);
    for(i = 0; i < dbData.length; i++){  
     if(dbData[i].id === ID ){
       delete dbData[i]
       const filtered = dbData.filter(function (element) {
      return element != null;
      });
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(filtered), (err) => {
        if (err) throw err;
      });
       response.json(filtered)
     } 
    }
  });



//------------------------------------------------------------------------------------

    // app.delete('/delete/notes/:id?', (request, response) => { 
    //   const id = request.params.id;
    //   fs.readFile(path.join(__dirname, "../db/db.json"), dbData, (err) => {
    //   if (err) throw err;
    //   });
    //   const newDbData = dbData.splice(id, 1);
    //   console.log(newDbData);
    //});

  //   app.delete('/api/notes/:id', (request, response) => {
  //     const id = request.params.id;
  //     delete dbData[id];
  //     console.log(dbData);
  //     fs.readFile(path.join(__dirname, "../db/db.json"), 'utf8', (data, err) => {
  //       if (err) throw err;   
  //     });
  //    const newDbData = dbData.splice(id, 1);
  //     console.log(newDbData);
  //     response.end(dbData[id]);
  //  })


  //  app.delete('/api/notes/:id', (request, response) => {
  //   const id = request.params.id
  //   for (i = 0; i < dbData.length; i++) {
  //     if (id === dbData[i].id) {
  //       console.log(i);
  //       const newDbData = dbData.splice(i, 1);

  //       console.log(dbData);
  //       console.log(newDbData);
  //          response.end(JSON.stringify(dbData));
  //     }
  //   }
}



