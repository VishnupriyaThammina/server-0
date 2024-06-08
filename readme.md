# Node app set up [ ecom ]

**Mandatory steps**

1. Go to the NodeJS website and download NodeJS
2. Make sure Node and NPM are installed and their PATHs defined
3. Create a new project folder
4. Start running NPM in your project folder (it runs in the background)
5. Install any NPM packages we need

**Step 1: Create a folder open in vs code**

![Untitled](./readme/readme-img/Untitled.png)

```jsx
npm init
npm install
npm i express
```

![Untitled](./readme/readme-img/Untitled%201.png)

![Untitled](./readme/readme-img/Untitled%202.png)

| Folder name | description |
| --- | --- |
| Controllers | Logic of your endpoints |
| models | data structure definition in your backend [ dbs ] |
| routes | main routes of your application |
| test | all your testing code |
| utils | functions used throughout your applications like validation.js, helper.js |
| middlewares | files that bridge between various technologies, like jwt tech is used in auth  |
| views | building pages, HTML, pug, ejs |
| public | CSS, js images |
| config | configurations like connection with db |
- Step 2: Install mongoose

```jsx
npm i mongoose
```

- step 3: build models, how your db should look like
    - Let’s first create one schema and then connect to DB
    - **Schema:** logical and visual representation of a database
    - in mongo db `schema` is a json object that defines the structure and contents of you data
    - in mongo id key is always assigned will be the primary key
    
    ```jsx
    const mongoose = require('mongoose');
    // require mongoose 
    
    // schema definition
    
    const Schema = mongoose.Schema;
    
    const DemoSchema = new Schema({
        feild1:{
    type:String,
    required:true
        },
        feild2: Number
    });
    
    // creating and exporting the model
    const Demo = mongoose.model('Demo',DemoSchema)
    module.exports = Demo
    
    ```
    
    - **String**: A UTF-8 string.
    - **Number**: A numerical value (integers, floating points).
    - **Date**: A date value.
    - **Buffer**: Binary data.
    - **Boolean**: A true/false value.
    - **Mixed**: A flexible type that can hold any data type.
    - **ObjectId**: An identifier for documents.
    - **Array**: An array of values.
    - **Decimal128**: High-precision decimal type.
    - **Map**: A flexible data structure to store key-value pairs.
    - **Embedded Documents**: Documents within documents (subdocuments).
    
    ![Untitled](./readme/readme-img/Untitled%203.png)
    
    - Made all data-related modules
- **Step 3 : DB connection**

```jsx
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3030;

// Connect to MongoDB
mongoose.connect('mongodb+srv://vishnupriyat20:vish@cluster0.mgnwtzl.mongodb.net/').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit with failure
});

app.listen(port, () => {
  console.log('Server is listening on port:', port);
});

```

![Untitled](./readme/readme-img/Untitled%204.png)

What is a controller: 

→ code responsible for CRUD operation functions when a request is sent

- **Writing a Controller:**
- if res.status line is encountered it is like the return statement of a controller function