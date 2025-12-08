
const path = require("path");
const EventEmitter  = require("events");
const fs =require('fs').promises;
const fs2=require('fs'); 
const emitter = new EventEmitter();
const os=require('os')
//1
function logCurrentFile(){
    console.log({
        File:__filename,
        Dir:__dirname,
}); 
}
logCurrentFile();
//2
function getFileName(filepath){
    return path.basename(filepath)
}
console.log(getFileName("/user/files/report.pdf"));

//3
let obj={
    dir:"/folder",
    name:"app",
    ext:".js"
}
function buildPath (obj){
    return path.format({
        dir: obj.dir,
        name:obj.name,
        ext: obj.ext
    })
}
console.log(buildPath(obj));
//4
function getFileExtension(filePath){
    return path.extname(filePath)
}
console.log(getFileExtension("/docs/readme.md"));
//5
function parseFile(filePath){
    return {
        Name: path.parse(filePath).name,
        Ext: path.parse(filePath).ext
    }
}
console.log(parseFile("/home/app/main.js"));
//6
function isAbsolute(filePath){
    return path.isAbsolute(filePath);
}
console.log(isAbsolute("/home/user/file.txt"));
//7
function joinFile(...filePath){
    return path.join(...filePath)
}
console.log(joinFile('src','component','app.js'));
//8
function resolvePath(filePathpath){
    return path.resolve(filePathpath)
}
console.log(resolvePath('./task2.js'));

//9
function joinTwoPaths(path1,path2)
{
    return path.join(path1,path2)
}
console.log(joinTwoPaths('/folder1','/folder2/file.txt'));
//10
async function deleteFile(filePath){
    try{
        await fs.unlink(filePath);
        console.log(`the file ${path.basename(filePath)} is deleted`);
    }catch(err){
        console.error('Error delete file', err.message);
        
    }
}
deleteFile('C:/Users/hp/Documents/Route/Assignment2/folder/file.txt')
//11
function createFolder(foldername){
    try{
        const folder = path.join(__dirname, foldername);
        if (!fs2.existsSync(folder)) {
      fs2.mkdirSync(folder);
      console.log('Success');
    } else {
      console.log('Folder already exists');
    }
  } catch (err) {
    console.error('Error creating folder:', err.message);
    }
}
createFolder('newFolder');
//12
emitter.on('start',()=>{
    console.log('welcome event triggered');    
});
emitter.emit('start');
//13
emitter.on('login',(user)=>{
    console.log(`User logged in:${user}`);  
});
emitter.emit('login','Ahmed');
//14
function readFile(filePath){
    try{
        const data =fs2.readFileSync(filePath,"utf-8")
        console.log("the file context =>",data);
        }catch(err){
            console.error("Error reading file",err.message);    
        }
}
readFile("./folder/notes.txt")
//15
async function writeFile(filePath,content) {
    try{
        await fs.writeFile(filePath,content,"utf-8");
        console.log("File saved Successfully");
    }catch{
            console.error("Error writing file",err.message);    
    }
}
writeFile("./async.txt","Async save")
//16
function checkFile(filePath){
    return fs2.existsSync(filePath);
}
console.log(checkFile("./async.txt"));
//17
function getSystemInfo() {
  return {
    Platform: os.platform(),
    Arch: os.arch()
  };
}

console.log(getSystemInfo());
//bonus
var findKthPositive = function(arr, k) {
for (let i = 0; i < arr.length; i++) {
        const missing = arr[i] - (i + 1);
                if (missing >= k) {
            return k + i;
        }
    }
        return k + arr.length;
}
console.log(findKthPositive([2,3,4,7,11],5));
