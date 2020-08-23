const express = require ('express');
const sequelize = require('sequelize');
const fs = require('fs');
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
        res.render("search.ejs",{values:keys,searchBy:searchBy});
    })
})
router.get("/clause/:clauseid",(req,res) =>{
    JDCPData.findByPk(req.params.clauseid).then(cValue =>{
        JDCPData.findAll({where:{clause:cValue.clause}}).then(clauses =>{
            searchBy="CLAUSE";
            res.render("search.ejs",{values:clauses,searchBy:searchBy});
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
            res.render("alldata.ejs",{allData:allData});
        }
    })
})
router.post("/fileload/:file",async(req,res)=>{
    console.log(req.params);
    fs.readFile(fsRoot+req.params.file+".json", async function (err, data) {
        if (err) throw err; 
        try {
            let parsedData = JSON.parse(data);
            let objsToValidate =[];
            for(const prop in parsedData){
                let objSet={
                    key:Object.keys(parsedData[prop])[0],
                    clause:Object.values(parsedData[prop])[0]
                };
                objsToValidate.push(objSet);
            }
            //DATA VALIDATION
            let i=0;
            let isDataOk=true;
            while(i< objsToValidate.length){
               let key= Number(objsToValidate[i].key);
               let clause = objsToValidate[i].clause;
               if(isNaN(key)||key===undefined||key===""||
                  clause===undefined||clause===""){
                   console.log(`Index: ${i}`);
                   console.log(key);
                   console.log(clause);
                    isDataOk=false;
                    break;
               }
               if(typeof clause === "string"||clause instanceof String){
                    isDataOk=true;
               } else {
                    console.log(`Index: ${i}`); 
                    console.log(clause);
                    isDataOk=false;
                    break;
               }
               i++;
            }
            if(!isDataOk){
                displayMsg=true;
                msg="Load Failed, please verify Input Data - Retcode: 404";
                res.status(404).redirect("/jdcp");
                return;
            }
            const newData = await JDCPData.bulkCreate(objsToValidate,{returning:true});
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