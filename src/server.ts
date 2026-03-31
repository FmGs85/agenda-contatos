//import fastify, {FastifyInstance} from "fastify"
import fastify from "fastify"
import type { FastifyInstance } from "fastify"

// logger trás algumas informações de log do sistema
const app: FastifyInstance = fastify({ logger: true});

app.listen(
    {
        port: 3100,
    },
    () => console.log('Server Runing...'),
);