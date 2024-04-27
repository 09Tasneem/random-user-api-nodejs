const fs = require('fs');
const path = require("path")

module.exports.getRandomUsers = (req, res, next) =>{

    fs.readFile(path.join(__dirname, "../data/users.json"), (err, data) =>{

        if(err){
            res.status(500).send({
                success: false,
                message: "Error reading file..."
            });

            return;
        }

        try{

            const jsonData = JSON.parse(data);

            const randomNumber = Math.floor(Math.random() * jsonData.length);
        
            res.status(200).send({
                success: true,
                message: "Success",
                data: jsonData[randomNumber]
            })

        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            })
        }

    })
}


module.exports.getAllUsers = (req, res, next) =>{

    fs.readFile(path.join(__dirname, "../data/users.json"), (err, data) =>{

        if(err){
            res.status(500).send({
                success: false,
                message: "Error reading file..."
            });

            return;
        }

        try{

            const limit = req.query.limit;

            let jsonData = JSON.parse(data);

            jsonData = jsonData.slice(0, limit)
        
            res.status(200).send({
                success: true,
                message: "Success",
                data: jsonData
            })

        }catch(err){
            res.status(500).send({
                success: false,
                message: err.message
            })
        }

    })

}


module.exports.addAUser = (req, res, next) => {

    const data = req.body;

    if (data.id, data.name, data.gender, data.contact, data.address, data.photoUrl) {


        fs.readFile(path.join(__dirname, "../data/users.json"), (err, data2) =>{

            if(err){
                res.status(500).send({
                    success: false,
                    message: "Error reading file..."
                });
    
                return;
            }
    
            try{
    
                let fileData = JSON.parse(data2);
                
                fileData.push(data);

                const newData = JSON.stringify(fileData);

                fs.writeFile(path.join(__dirname, "../data/users.json"), newData, () =>{
                    res.send(fileData)
                });
    
            }catch(err){
                res.status(500).send({
                    success: false,
                    message: err.message
                })
            }

        })
        
    }else{

        res.status(500).send({
            success: false,
            message: "Please give all the required info..."
        })

    }

}



module.exports.updateAUser = (req, res, next) => {

    const data = req.body;

    if (data.id) {


        fs.readFile(path.join(__dirname, "../data/users.json"), (err, data2) =>{

            if(err){
                res.status(500).send({
                    success: false,
                    message: "Error reading file..."
                });
    
                return;
            }
    
            try{
    
                let fileData = JSON.parse(data2);

                let specificData = fileData.filter(nData => nData.id == data.id)[0];
                let newData = fileData.filter(nData => nData.id != data.id);

                if (specificData) {

                    specificData.id = data.id;
                    specificData.name = data.name;
                    specificData.gender = data.gender;
                    specificData.contact = data.contact;
                    specificData.address = data.address;
                    specificData.photoUrl = data.photoUrl;

                    newData.push(specificData);

                    const newJsonData = JSON.stringify(newData)


                    fs.writeFile(path.join(__dirname, "../data/users.json"), newJsonData, (err) =>{

                        if(!err){
                            
                    res.status(200).send({
                        success: true,
                        message: "Success",
                        data: specificData
                    })
                        }else{
                            res.status(500).send({
                                success: false,
                                message: "Error"
                            })
                        }

                    })

                }else{
                    res.status(500).send({
                        success: false,
                        message: "Couldn't find data with id"
                    })
                }

    
            }catch(err){
                res.status(500).send({
                    success: false,
                    message: err.message
                })
            }

        })
        
    }else{

        res.status(500).send({
            success: false,
            message: "Please give all the required info..."
        })

    }

}


module.exports.deleteUser = (req, res, next) =>{

    const id = req.params.id;
    const jsonData = fs.readFileSync(path.join(__dirname, "../data/users.json"));
    const data = JSON.parse(jsonData);
    let newData = data.filter(x => x.id != id);

    newData = JSON.stringify(newData);
    fs.writeFileSync(path.join(__dirname, "../data/users.json"), newData);

    res.status(200).send({
        success: true,
        message: "User deleted successfully.",
        data: newData
    })

}

module.exports.bulkUpdate = (req, res, next) =>{

    const data = req.body;
    console.log(data);

    if(Array.isArray(data)){

        data.map(x => {

                    const data2 = fs.readFileSync(path.join(__dirname, "../data/users.json"));
        
                    let fileData = JSON.parse(data2);
    
                    let specificData = fileData.filter(nData => nData.id == x.id)[0];

                    let newData = fileData.filter(nData => nData.id != x.id);
    
                    if (specificData) {
    
                        specificData.id = x.id;
                        specificData.name = x.name;
                        specificData.gender = x.gender;
                        specificData.contact = x.contact;
                        specificData.address = x.address;
                        specificData.photoUrl = x.photoUrl;
    
                        newData.push(specificData);
    
                        const newJsonData = JSON.stringify(newData)
    
                        fs.writeFileSync(path.join(__dirname, "../data/users.json"), newJsonData)
                    }

        })

        res.send("Done")
        
    }else{
        res.status(500).send("Please provide an array of data...")
    }

}