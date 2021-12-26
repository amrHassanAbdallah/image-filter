import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import HttpException from './errors/HttpException';
import errorMiddleware from './middlewares/ErrorMiddleware';
import { nextTick } from 'process';
import fs from 'fs';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  if (!fs.existsSync('./tmp')){
    fs.mkdirSync('./tmp');
}
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get( "/filteredimage", async ( req, res,next ) => {
    try {
      let imageUrl:string = req.query.image_url
      if (!imageUrl){
        return res.status(400).send({
          message:"image_url is required"
        })
      }
        let newFilePath = await filterImageFromURL(imageUrl);
        //res.sendFile(newFilePath)
        let stream = fs.createReadStream(newFilePath);
        stream.pipe(res).once("close", function () {
            stream.destroy(); // makesure stream closed, not close if download aborted.
            deleteLocalFiles([newFilePath])
        });
      
    } catch (error) {
      next(error)
    }

  });
  
  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );




  app.use((req, res, next) => {
    const err = new Error("Not Found");
    next(err);
  });

  app.use(errorMiddleware);

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();