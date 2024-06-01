# Arcane Archives
A Webapp made for the Web Dev portion of the OOSD course at SAIT

Stack used to make this:
* Tailwindcss
* DaisyUI
* Express
* Prisma ORM



### Author
Robbie Soriano


## Installation Guide
1. Run `npm run install` to install the dependencies
2. Run the script `npm run build:css` to start the tailwind process
3. Run `npx prisma generate` to generate the prisma instance
4. Run `npm run dev` to start the node server
5. Page should be good to go


## File Directory Documentation
I've researched and found a good file directory setup for a typical express web app configuration and it goes like this:
```
my-express-app/
├── node_modules/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
│   └── assets/
│       ├── css/
│       └── images/
├── src/
│   ├── controllers/
│   │   └── exampleController.js
│   ├── middlewares/
│   │   └── exampleMiddleware.js
│   ├── models/
│   │   └── exampleModel.js
│   ├── routes/
│   │   └── exampleRoute.js
│   ├── services/
│   │   └── exampleService.js
│   ├── utils/
│   │   └── exampleUtil.js
│   ├── views/
│   │   └── 404.html
│   ├── app.js
│   └── server.js
├── tailwind.config.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

# Explaination

Starting from root level, we got **node modules**, **public** and **src**
* Node modules are made by npm, not much explaination needed
* Public is where static files are stored such as css and images
* src is where the rest of the files are stored

In src theres a lot of different directories and each of them store different files with different jobs. Going from top to bottom:

- Controllers: 
     - Controllers contain the files that handle the http requests. For example, when you do `app.post('/login', (req, res) => {code})` you can substitue the `(req, res) => code` part for the controller. Using our directory example up top, we can import **exampleController.js** from **src/controllers** and import it `const authController = require(../controller/exampleController)`   
     Now we can do a post request like so `app.post('/login', authController.login)`.
     Inside Controllers, we do our http requests of post and get.
- Models:
     - Models are used by database ti determine what data gets placed into the database. Since I'm using **Prisma** which already does that, I didn't include it in this project.
- Routes:
     - In Express, there are routes that bundle up a bunch of similar routes together like for example `app.post()`, `app.get()` or `app.delete`. If they are the same route and needs these http requests, Here is where the bundles are placed to be more organized. 
- Services: 
     - Services are code that can be reused a bunch of times. Say for example we need a function that can create a post in a blog post. Rather than making the same code block through multiple files, we can store them here and call it by importing the file and using it.
- Utils: 
     - Utils are small code blocks. Say for example we are making our own password hasher. We have to call it through different files and make the same code block over again. Rather than doing that, we store it here and import it
- Views:
     - Views are the pages of our web app. Not much to say here other than that

- **app.js**: Not much to say here, since this is where the express playground comes into play