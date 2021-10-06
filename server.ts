import Fastify, { FastifyInstance } from "fastify";

const app:FastifyInstance = Fastify({logger:true});

app.get('./', async(request, reply)=>{
    return {hello: "World"}
})

// Run the server!
const start = async () => {
  try {
    await app.listen(3000)
  } catch (err) {
    app.log.error(err)
  }
}
start()