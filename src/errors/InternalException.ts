import HttpException from "./HttpException";
 
class InternalException extends HttpException {
  constructor(err:unknown) {
    let message = "something went wrong!"
    if (err as Error){
      let er1 = err as Error
      message = er1.message
    }
    super(500, message);
  }
}
 
export default InternalException;