const express = require ('express');
const bodyparser = require ('body-parser');
const cors = require ('cors');
const mysql = require ('mysql2');

const app = express();

app.use(cors());

app.use (bodyparser.json());

//conectare la baza de date
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'planificareDB',
    port: 3307
});

//verificare conexiune la baza de date
db.connect(err=>{
    if(err){console.log(err, 'db err');}
    console.log('Conectat la baza de date :)');
});

// BAZA DE DATE CONDUCATORI AUTO
//selectare toti conducatorii auto
app.get('/conducatori', (req, res)=>{
    let qr = 'select * from conducatori';
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, 'errs');
        }
        if(result.length>0){
            res.send({
                message: 'Afisare conducatori auto.',
                data: result
            });
        }
    });
});

//selectare un singur conducator auto
app.get('/conducatori/:id', (req, res)=>{
    let gID = req.params.id;
    let qr = `select * from conducatori where id = ${gID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        if(result.length>0){
            res.send({
                message: 'Un singur conducator gasit',
                data: result
            });
        }
        else{
            res.send({
                message: 'Nu s-a gasit nimic.'
            });
        }
    })
});

//adaugare un singur conducator auto
app.post('/conducatori', (req, res)=>{
    console.log(req.body, 'S-a creat cu succes.');
    let nume = req.body.nume;
    let marca = req.body.marca;
    let fisamed = req.body.fisamed;
    let psih = req.body.psih;
    let permis = req.body.permis;
    let atestat = req.body.atestat;
    let ci = req.body.ci;

    let qr = `insert into conducatori(nume, marca, fisamed, psih, permis, atestat, ci) values ('${nume}','${marca}','${fisamed}','${psih}','${permis}','${atestat}','${ci}')`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        console.log(result, 'result');
        res.send({
            message: 'Adaugat cu succes',
        });
    })
});

//actualizare conducator auto
app.put('/conducatori/:id', (req, res)=>{
    let qID = req.params.id;
    console.log(req.body, 'Actualizare cu succes.');
    let nume = req.body.nume;
    let marca = req.body.marca;
    let fisamed = req.body.fisamed;
    let psih = req.body.psih;
    let permis = req.body.permis;
    let atestat = req.body.atestat;
    let ci = req.body.ci;

    let qr = `update conducatori set nume = '${nume}', marca = '${marca}', fisamed = '${fisamed}', psih = '${psih}', permis = '${permis}}', atestat = '${atestat}', ci = '${ci}' where id=${qID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'Actualizat',
        });
    })
});

//steregere un conducator auto
app.delete('/conducatori/:id', (req, res)=>{
    let qID = req.params.id;
    let qr = `delete from conducatori where id = ${qID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'Stergere cu succes.'
        });
    })
});

//BAZA DE DATE AUTOBUZE
//selectare toate autobuzele
app.get('/autobuze', (req, res)=>{
    let qr = 'select * from autobuze';
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, 'errs');
        }
        if(result.length>0){
            res.send({
                message: 'Afisare autobuze.',
                data: result
            });
        }
    });
});

//selectare un singur autobuz
app.get('/autobuze/:id', (req, res)=>{
    let gID = req.params.id;
    let qr = `select * from autobuze where id = ${gID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        if(result.length>0){
            res.send({
                message: 'Un singur autobuz gasit',
                data: result
            });
        }
        else{
            res.send({
                message: 'Nu s-a gasit nimic.'
            });
        }
    })
});

//adaugare un singur autobuz
app.post('/autobuze', (req, res)=>{
    console.log(req.body, 'S-a creat cu succes.');
    let nume = req.body.nume;
    let itp = req.body.itp;
    let asigurareRCA = req.body.asigurareRCA;
    let asigurareBagaje = req.body.asigurareBagaje;
    let copieConforma = req.body.copieConforma;
    let casco = req.body.casco;

    let qr = `insert into autobuze(nume, itp, asigurareRCA, asigurareBagaje, copieConforma, casco) values ('${nume}','${itp}','${asigurareRCA}','${asigurareBagaje}','${copieConforma}','${casco}')`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        console.log(result, 'result');
        res.send({
            message: 'Adaugat cu succes',
        });
    })
});

//actualizare autobuz
app.put('/autobuze/:id', (req, res)=>{
    let qID = req.params.id;
    console.log(req.body, 'Actualizare cu succes.');
    let nume = req.body.nume;
    let itp = req.body.itp;
    let asigurareRCA = req.body.asigurareRCA;
    let asigurareBagaje = req.body.asigurareBagaje;
    let copieConforma = req.body.copieConforma;
    let casco = req.body.casco;

    let qr = `update autobuze set nume = '${nume}', itp = '${itp}', asigurareRCA = '${asigurareRCA}', asigurareBagaje = '${asigurareBagaje}', copieConforma = '${copieConforma}}', casco = '${casco}' where id=${qID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'Actualizat',
        });
    })
});

//steregere autobuz
app.delete('/autobuze/:id', (req, res)=>{
    let qID = req.params.id;
    let qr = `delete from autobuze where id = ${qID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'Stergere cu succes.'
        });
    })
});

//BAZA DE DATE PLANIFICARE NORMALA
//selectare toate planificarile
app.get('/planificarelv', (req, res)=>{
    let qr = 'select * from planificarelv';
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err, 'errs');
        }
        if(result.length>0){
            res.send({
                message: 'Afisare planificare.',
                data: result
            });
        }
    });
});

//selectare o programare
app.get('/planificarelv/:id', (req, res)=>{
    let gID = req.params.id;
    let qr = `select * from planificarelv where id = ${gID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        if(result.length>0){
            res.send({
                message: 'O singura planificare gasita',
                data: result
            });
        }
        else{
            res.send({
                message: 'Nu s-a gasit nimic.'
            });
        }
    })
});

//adaugare o planificare noua
app.post('/planificarelv', (req, res)=>{
    console.log(req.body, 'S-a creat cu succes.');
    let data = req.body.data;
    let ziua = req.body.ziua;
    let t1100s1 = req.body.t1100s1;
    let t1100ms1 = req.body.t1100ms1;
    let t1100ms2 = req.body.t1100ms2;
    let t1100s2 = req.body.t1100s2;
    let t2100s1 = req.body.t2100s1;
    let t2100ms1 = req.body.t2100ms1;
    let t2100ms2 = req.body.t2100ms2;
    let t2100s2 = req.body.t2100s2;
    let t3100s1 = req.body.t3100s1;
    let t3100ms1 = req.body.t3100ms1;
    let t3100ms2 = req.body.t3100ms2;
    let t3100s2 = req.body.t3100s2;
    let t143Ms1 = req.body.t143Ms1;
    let t143Mms1 = req.body.t143Mms1;
    let t143Mms2 = req.body.t143Mms2;
    let t143Ms2 = req.body.t143Ms2;

    let qr = `insert into planificarelv(data, ziua, 
                                        t1100s1, t1100ms1, t1100ms2, t1100s2, 
                                        t2100s1, t2100ms1, t2100ms2, t2100s2,
                                        t3100s1, t3100ms1, t3100ms2, t3100s2,
                                        t143Ms1, t143Mms1, t143Mms2, t143Ms2) 
                                values ('${data}','${ziua}',
                                        '${t1100s1}','${t1100ms1}','${t1100ms2}','${t1100s2}',
                                        '${t2100s1}','${t2100ms1}','${t2100ms2}','${t2100s2}',
                                        '${t3100s1}','${t3100ms1}','${t3100ms2}','${t3100s2}',
                                        '${t143Ms1}','${t143Mms1}','${t143Mms2}','${t143Ms2}')`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        console.log(result, 'result');
        res.send({
            message: 'Adaugat cu succes',
        });
    })
});

//actualizare planificare
app.put('/planificarelv/:id', (req, res)=>{
    let qID = req.params.id;
    console.log(req.body, 'Actualizare cu succes.');
    let data = req.body.data;
    let ziua = req.body.ziua;
    let t1100s1 = req.body.t1100s1;
    let t1100ms1 = req.body.t1100ms1;
    let t1100ms2 = req.body.t1100ms2;
    let t1100s2 = req.body.t1100s2;

    let qr = `update planificarelv set data = '${data}', ziua = '${ziua}', t1100s1 = '${t1100s1}', t1100ms1 = '${t1100ms1}', t1100ms2 = '${t1100ms2}}', t1100s2 = '${t1100s2}' where id=${qID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}
        res.send({
            message: 'Actualizat',
        });
    })
});

//steregere planificare
app.delete('/planificarelv/:id', (req, res)=>{
    let qID = req.params.id;
    let qr = `delete from planificarelv where id = ${qID}`;
    db.query(qr, (err, result)=>{
        if(err){console.log(err);}

        res.send({
            message: 'Stergere cu succes.'
        });
    })
});

//verificare conexiune la server
app.listen(3000, ()=>{
    console.log('Serverul este pornit.');
});