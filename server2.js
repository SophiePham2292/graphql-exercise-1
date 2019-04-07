const express = require("express")
const express_graphql = require("express-graphql")
const { buildSchema } = require("graphql")

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

// Build a schema
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }

    type Mutation{
        updateCourseTopic(id: Int!, topic: String!): Course
    }

    type Course {
        id: Int!
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`)

const getCourse = args => {
    return coursesData.filter(course => course.id === args.id)[0]
}

const getCourses = args => {
    if (args.topic) {
        return coursesData.filter(course => course.topic === args.topic)
    } else return coursesData
}

const updateCourseTopic = args => {
    const courseIndex = coursesData.findIndex(course => {
        return course.id === args.id
    })

    if (courseIndex === -1) return null
    coursesData[courseIndex].topic = args.topic
    return coursesData[courseIndex]
}

const root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
}

const app = express();

app.use("/meo", express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000, () => console.log("app running on port Meos"))