const express = require("express")
const express_graphql = require("express-graphql")
const { buildSchema } = require("graphql")

const schema = buildSchema(`
    type Query {
        message: String
    }
`)

const root = {
    message: function () { return "Hello Choe and Hung" }
}

const app = express();

app.use("/graphql", express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(4000, () => console.log("App ruuning on port 4000"))

