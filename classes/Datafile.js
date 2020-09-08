const fs = require('fs');

class Datafile {
    constructor(path){
        this.validatedData=[],
        this.path=path,
        this.decopule()
    }
    decopule(){
        let data=[];
        const arr2 = fs.readFileSync(this.path,{encoding:'utf8'}).trim().split('\n').map( function( line ) {
            data.push({key:Object.keys(JSON.parse(line))[0],clause:Object.values(JSON.parse(line))[0]});
            delete JSON.parse(line);
        });
        for (let i=0;i<data.length;i++){
            this.validatedData.push(data[i]);
        }
        data=[];    
    }
    validateFile(){
        try {
            //DATA VALIDATION
            let i=0;
            let isDataOk=true;
            while(i< this.validatedData.length){
            let key= Number(this.validatedData[i].key);
            let clause = this.validatedData[i].clause;
            if(isNaN(key)||key===undefined||key===""||
                clause===undefined||clause===""){
                    isDataOk=false;
                    break;
            }
            if(typeof clause === "string"||clause instanceof String){
                    isDataOk=true;
            } else {
                    isDataOk=false;
                    break;
            }
            i++;
            }
            return isDataOk;
      }catch(exception) {
        return false;
      }
    }  
}
module.exports = Datafile;