import HttpException from "./HttpException";
 
class InternalException extends HttpException {
  constructor(err:unknown) {
    super(500, `something went wrong!`);
  }
}
 
export default InternalException;