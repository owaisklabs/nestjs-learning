export class ResponseService{
    public response(code:number|200,status:string,data:any,message:string){

        return{
            "code":code,
            "status":status,
            "data":data,
            "message":message
        }
    }
}