# store_tree_mongo
Steps to run - 
1. npm init
2. npm i express mongoose nodemon dotenv
3. npm start

Note - 
1. treeModel.js contains schema to store binary tree in mongo database.
2. Server is running on port 5000.
3. /bfs is the end point (get request) which will give bfs.
4. Each entry in database contains two data - value (contains value of node of binary tree) and children (array containing children of value). 
