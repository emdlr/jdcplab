const express = require ('express');
const sequelize = require('sequelize');
const fs = require('fs');
const Datafile = require('../classes/Datafile');
const Pager = require('../classes/Pager');
const router = express.Router();
const fsRoot = "./files/";
let displayMsg= false;
let msg="";
let searchBy="";
const JDCPData = require("../models").JDCPData;

router.get("/", (req,res) =>{
    res.render("index.ejs",{displayMsg:displayMsg,msg:msg})
})
router.get("/key/:key",(req,res) =>{
    JDCPData.findAll({where:{key:req.params.key}}).then(keys =>{
        searchBy="KEY";
        let pager = new Pager(req.query.page,keys);
        res.render("search.ejs",{pager,searchBy:searchBy,cId:req.params.key});
    })
})
router.get("/clause/:clauseid",(req,res) =>{
    JDCPData.findByPk(req.params.clauseid).then(cValue =>{
        JDCPData.findAll({where:{clause:cValue.clause}}).then(clauses =>{
            searchBy="CLAUSE";
            let pager = new Pager(req.query.page,clauses);
            res.render("search.ejs",{pager,searchBy:searchBy,cId:req.params.clauseid});
        })
    })
})
router.get("/error",(req,res) =>{
    res.render("error.ejs");
})
router.get("/alldata",(req,res) =>{
    JDCPData.findAll().then(allData =>{
        if(allData.length===0){
            msg = "No Data Available to Display - Retcode 404";
            displayMsg=true;
            res.status(404).redirect("/jdcp");
        }else{
            msg = "";
            displayMsg=false;
            let pager = new Pager(req.query.page,allData);
            res.render("alldata.ejs",{pager:pager});
        }
    })
})
router.post("/fileload/:file",async(req,res)=>{
    fs.readFile(fsRoot+req.params.file+".json", async function (err, data) {
        if (err) throw err; 
        try {
            let dataFile = new Datafile(data);//Creating an Instance of DataFile    
            
            if(!dataFile.validateFile()){
                displayMsg=true;
                msg="Load Failed, please verify Input Data - Retcode: 404";
                res.status(404).redirect("/jdcp");
                return;
            }
            const newData = await JDCPData.bulkCreate(dataFile.validatedData,{returning:true});
            displayMsg=true;
            msg="Data Successfully Loaded - Retcode: 200";
            res.status(200).redirect("/jdcp");

          } catch(exception) {
            console.log(exception)
            displayMsg=true;
            msg="Load Failed, please verify Input Data - Retcode: 404";
            res.status(404).redirect("/jdcp");
          }
                
     });   
})

module.exports = router;