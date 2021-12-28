const fs = require('fs');

const writeFile = fileContent =>{
    return new Promise((resolve, reject)=>{
        fs.writeFile('./dist/index.html', fileContent, err=> {
            //if theres an error, reject the Promis and send the error to the promises `.catch()` method
            if(err){
                reject(err);
                //return out of the function here to make sure the promise doesnt accidentally execute the resolve() function as well
                return;
            }
            //if everything went well, resolve the promis and send the successfull data to the `.then()` method
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

const copyFile =()=>{
    return new Promise((resolve, reject)=>{
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if(err){
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Stylesheet created!'
            });
        });
    });
};

module.exports={writeFile, copyFile};