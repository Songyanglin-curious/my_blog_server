class BaseModel{
    constructor(data, message){
        if( typeof data === "string"){
            this.message = data;
            data = null;
            message = null;
        }
        if(data){
            this.data = data;
        }
        if(message){
            this.message = message;
        }
    }
}
class SuccessModel extends BaseModel{
    constructor(data, message){
        // super关键字用于访问和调用一个对象的父对象上的函数。执行父类的构造函数，将data和message传进去
        super(data,message)
        this.errno = 0;
    }
}

class ErrorModel extends BaseModel{
    constructor(data, message){
        
        super(data,message)
        this.errno = -1;
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}