//1
import fs from "fs";
import zlip from "zlib";
const readableStream = fs.createReadStream("big.txt",{
    encoding:"utf-8",
    highWaterMark:64*1024
});
readableStream.on("open" , ()=>{
  console.log("File is Opened")
})
readableStream.on("ready" , ()=>{
  console.log("Stream is Ready")
})
readableStream.on("data", (chunk) => {
  console.log( chunk);
});

readableStream.on("end", () => {
  console.log("Finished reading file.");
});
readableStream.on("close" , ()=>{
  console.log("File is Closed")
})
//2
const writableStream1 = fs.createWriteStream("./output.txt")
readableStream.pipe(writableStream1);
writableStream1.on("finish",()=>{
   console.log("file copied using streams");
   
})
//3
const writableStream2 = fs.createWriteStream("big.txt.gz");
const gzip = zlip.createGzip();
readableStream.pipe(gzip).pipe(writableStream2);
console.log("File compressed!");
//4
