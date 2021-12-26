import HttpException from "./HttpException";
 
class InternalException extends HttpException {
  constructor(err:unknown) {
    super(500, `something went wrong!`);
    console.log(err)
  }
}
 
export default InternalException;