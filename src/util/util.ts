import fs from "fs";
// import sharp from "sharp";
import Jimp = require("jimp");
// import axios  from "axios";
import FileNotFoundException from "../errors/FileNotFoundException";
import InternalException from "../errors/InternalException";
import path from "path";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      //const response = await axios({ url: inputURL, responseType: "arraybuffer" });
      const outpath = path.join("tmp","filtered."+ Math.floor(Math.random() * 2000) + ".jpg");
      const pic = await Jimp.read(inputURL); 

      await pic.resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write(outpath, () => {
        resolve(outpath);
      });
    //   await sharp(response.data).resize(256, 256).grayscale().sharpen(60).toFile(outpath)
    //   resolve(outpath)
     } catch (error) {
      // if (axios.isAxiosError(error)){
      //  return  reject(new FileNotFoundException(inputURL))
      // }
      let err = error as Error
      if (err){
        if (err.message == "Could not find MIME for Buffer <null>"){
          return  reject(new FileNotFoundException(inputURL));
        }
      }

      
      return reject(new InternalException(error));
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}
