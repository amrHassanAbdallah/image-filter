import HttpException from "./HttpException";
 
class FileNotFoundException extends HttpException {
  constructor(file: string) {
    super(404, `File with url '${file}' not found or not accessable.`);
  }
}
 
export default FileNotFoundException;