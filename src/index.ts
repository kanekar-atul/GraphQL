import express, { Express, Request, Response } from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; 
import dotenv from "dotenv";

dotenv.config();

 const startApolloServer = async  () => {
        
    const app: Express = express();
    const port = process.env.PORT || 3000;

    app.use(express.json())

    const server = new ApolloServer({
    typeDefs : `
        type Query {
            hello : String
            say(name:String) : String
        }
    `,
    resolvers : {
        Query : {
            hello : ()=>{
                return 'Hello GraphQL'
            },
            say :  (_,{name}:{name:String})=>`Hello ${name}`
        }
    },
    });

    await server.start()

    app.get("/", (req: Request, res: Response) => {
        res.send("Express + TypeScript Server");
    });

    app.use('/graphql',expressMiddleware(server))

    app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    });
    
}

startApolloServer();