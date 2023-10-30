const express = require('express')
const mg = require('mongoose')
const app = express()

app.use(express.json())

app.use(express.static(__dirname))
mg.connect('mongodb://127.0.0.1:27017/FoodSystem')

const conn = mg.connection
conn.on('connected',()=>{
    console.log("Connected")
})

const taskSchema = new mg.Schema({
    ID:Number,
    FOODNAME:String,
    TYPE:String,
    ANY:String,
    MOBILE:Number,
    IMAGE : String,
    BIRTHDATE : Date
    

})

const Task = mg.model('tasks', taskSchema);

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')
})  
app.get('/api/tasks',(req,res)=>{
    Task.find().then((data)=>{
        res.json(data)
    })
})
  
  
app.post('/api/tasks',(req,res)=>{
    Task.create({
        ID:req.body.ID,
        
        FOODNAME:req.body.FOODNAME,
        
        TYPE:req.body.TYPE,

        ANY : req.body.ANY,

        MOBILE : req.body.MOBILE, 

        IMAGE : req.body.IMAGE,

        BIRTHDATE : req.body.BIRTHDATE

    }).then((newData)=>{
        res.json(newData)
    })
})
  

app.put('/api/tasks/:TID', async (req, res) => {
    const { TID } = req.params;
    const { ID, FOODNAME, TYPE , ANY , IMAGE , MOBILE , BIRTHDATE} = req.body;
  
    try {
      const task = await Task.findByIdAndUpdate(
        TID,
        { ID, FOODNAME, TYPE , ANY , MOBILE , IMAGE , BIRTHDATE
         },
        { new: true } // Return the updated task
      );
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
    
      
  
  app.delete('/api/tasks/:TID', (req, res) => {
    const { TID } = req.params;
    
    console.log(TID);
    Task.deleteOne({_id: TID}).then((err,data)=>{
    res.json(data)
    })
  });

  
  let port = 2520;
  app.listen(port, () => {
    console.log(`Server is running on port ${port} `);
  });