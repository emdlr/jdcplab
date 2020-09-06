class Pager {
    constructor(currentPage,rawData){
        this.startPage=1
        this.endPage=5
        this.currentPage=parseInt(currentPage)
        this.itemsLimit=10
        this.squares=5
        this.dataResult=rawData

    }
    getSize(){
        return this.dataResult.length;
    }
    getPagesAmount(){
        return (this.getSize()>this.itemsLimit?Math.ceil(this.getSize()/this.itemsLimit):1);
    }
    getSquares(){
        let isIn=true;
        while(isIn){
            if(this.startPage<=this.currentPage && this.currentPage<=this.endPage)
                isIn=false;
            else{
                this.startPage+=5;
                this.endPage+=5;
            }
        }
        let template=[];
        if(this.startPage>1) template.push("<<","<");

        for(let i=this.startPage;i<=this.endPage;i++)
            template.push(i);

        if(this.getPagesAmount()>this.endPage) template.push(">",">>");

        return template;
    }
    getDataResult(){
        let idx=1;
        let pageNum=1;
        this.dataResult.forEach(value =>{
            if(idx>this.itemsLimit){
                pageNum++;
                idx=1;
            }
            value.page=pageNum;
            idx++;
        })
        return this.dataResult;
    }
    getPagePath(basePath,squares,index){
            if(squares[index] == "<<")
                return `${basePath}?page=1`;
            else if(squares[index]=="<")
                return `${basePath}?page=${(squares[index+1]-1)<=0?1:squares[index+1]-1}`;
            else if (squares[index] ==">")
                return `${basePath}?page=${squares[index-1]+1}`;    
            else if (squares[index]==">>")
                return `${basePath}?page=${this.getPagesAmount()}`;  
            else if (squares[index] <= this.getPagesAmount())
                return `${basePath}?page=${squares[index]}`; 
            else
                return "";
    }
}
module.exports = Pager;