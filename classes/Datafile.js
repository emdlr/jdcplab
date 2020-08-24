class Datafile {
    constructor(dataObj){
        this.dataObj = dataObj,
        this.key="",
        this.clause="",
        this.validatedData=[]
    }
    validateFile(){
        try {
            let parsedData = JSON.parse(this.dataObj);
            let objsToValidate =[];
            for(const prop in parsedData){
                this.key= Object.keys(parsedData[prop])[0],
                this.clause= Object.values(parsedData[prop])[0]
                this.validatedData.push({key:this.key,clause:this.clause});
            };
            //DATA VALIDATION
            let i=0;
            let isDataOk=true;
            while(i< this.validatedData.length){
            let key= Number(this.validatedData[i].key);
            let clause = this.validatedData[i].clause;
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
            return isDataOk;
      }catch(exception) {
        isDataOk=false;
        return isDataOk;
      }
    }  
}
module.exports = Datafile;