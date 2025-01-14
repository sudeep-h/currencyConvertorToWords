const express=require('express');
const path=require('path'); 

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'public')));

const PORT=3002;
app.listen(PORT, ()=>{
    console.log(`Server running on Port - ${PORT}`);
})