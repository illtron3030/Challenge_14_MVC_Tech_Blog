const sequelize = require("../config/connection")
const {User,Blog,Comment} = require("../models")

const users = [
    {
        username: "mike",
        password: "mikepassword"
    },
    {
        username: "leon",
        password: "leonpassword"
    },
    {
        username: "bill",
        password: "billpassword"
    },

]

const blogs = [
    {
        title: "My first post",
        content: "meow",
        userId: 1
    },
    {
        title: "My second post",
        content: "woof",
        userId: 1
    },
    {
        title: "Toby's first post",
        content: "hi i'm Tobias",
        userId: 2
    },
    {
        title: "Brenda's first post",
        content: "hi i'm brenda",
        userId: 3
    },
]

const comments = [
    {
        body: "great post!",
        blogId: 1,
        userId: 1
    },
    {
        body: "i agree!",
        blogId: 3,
        userId: 2
    },
    {
        body: "well said!",
        blogId: 4,
        userId: 1
    },
    {
        body: "happy monday!",
        blogId: 2,
        userId: 3
    },

]

const plantSeeds = async ()=>{
    try{
        await sequelize.sync({force:true})
        await User.bulkCreate(users,{
            individualHooks:true
        });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);
        process.exit(0);
    } catch(err){
        console.log(err)
    }
}

plantSeeds()