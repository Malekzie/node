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
1. Clone the Repository:
     ``` bash
     git clone https://github.com/Malekzie/node.git
     cd <node>
     ```
2. Install Dependencies: `npm install`
3. Set up environment variables:
     - Create an .env file in the root directory and add necessary environment variables
     - Example:
      ```
          DATABASE_URL=your-database-url
          JWT_SECRET_KEY=your-jwt-secret 
          // You can run on the terminal node [enter] require('crpyto').randomBytes(64).toString('hex') [enter] and copy the data to JWT Secret. Same goes for session secret
          SESSION_SECRET=your-session-secret
     ```
4. Run `npx prisma generate` to generate the prisma instance
5. Seed the database:
     `node prisma/seed.js`
6. Build TailwindCSS:
     `npm run build:css`
7. Start dev server `npm run dev`


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
│   ├── repositories/
│   │   └── exampleRepository.js
│   ├── routes/
│   │   └── exampleRoute.js
│   ├── services/
│   │   └── exampleService.js
│   ├── utils/
│   │   └── exampleUtil.js
│   ├── views/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── partials/
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
     - Controllers handle the HTTP requests. For example, in an Express app, instead of defining the request handler inline like app.post('/login', (req, res) => { ... }), you can import and use a controller method like app.post('/login', authController.login). Controllers help keep your code organized and maintainable.
- Middleware:
     - Middlewares are functions that execute during the lifecycle of a request to the Express server. They can modify the request or response objects, end the request-response cycle, and call the next middleware in the stack.
- Repositories:
     - Repositories contain code for data access and manipulation. They interact with the database and abstract the data access logic, making it easier to manage and reuse.
- Routes:
     - Routes bundle together similar HTTP routes. For instance, all user-related routes like login, registration, and profile updates can be grouped in a user route file. This keeps the routing logic organized and maintainable.
- Services: 
     - Services contain reusable business logic that can be used across multiple parts of the application. For example, a function to create a blog post can be placed in a service file and reused wherever needed.
- Utils: 
     - Utils are small code blocks. Say for example we are making our own password hasher. We have to call it through different files and make the same code block over again. Rather than doing that, we store it here and import it
- Views:
     - Views are the pages of our web app. Not much to say here other than that

- **app.js**: Not much to say here, since this is where the express playground comes into play

