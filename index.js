const express = require('express')
const fs = require('fs');

const app = express()
app.use(express.urlencoded({ extended: true }));
const port = 3000

let todos = [];
let completedTodos = [];

function writeData(data, filename){
  fs.writeFileSync(filename, data.join('\n'))
}

// read contents of filename and return array of string
function readData(filename){
  let content = fs.readFileSync(filename)
  let parsedData = String(content).trim().split('\n')
  return parsedData
}


function generateTodoEntry(){
  let html = ''

  for(let i=0; i < todos.length; i++){
    html += `
      <div class="todoItem">
        <div class="todoContent">${todos[i]}</div>
        <div class="todoAction">
          <form method="POST" action="/markAsDone" style="display: inline;">
            <input type="hidden" name="index" value="${i}"/>
            <button type="submit">Mark as Done</button>
          </form>
        </div>
      </div>
    `
  }

  return html
}

function generateCompletedTodoEntry(){
  let html = ''

  for(let i=0; i < completedTodos.length; i++){
    html += `
      <div class="todoItem">
        <div class="todoContent">${completedTodos[i]}</div>
        <div class="todoAction">
          <form method="POST" action="/markAsDone" style="display: inline;">
            <input type="hidden" name="index" value="${i}"/>
            <button type="submit">Undo</button>
          </form>
        </div>
      </div>
    `
  }

  return html
}


function indexPage(req, res) {
  res.send(`
<html>
  <head>
    <title>TO DO LIST</title>
  </head>
  <body>
    <style>
      #todoForm{
        display: flex;
      }
      #todoForm form {
        display: flex;
        width: 100%;
        flex-direction: column;
      }
      #todoForm input {
        font-size: 2em;
        padding: 10px;
        border: 0;
        border-radius: 4px;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
      }
      #todoForm .buttonWrapper {
        margin-top: 10px;
        display: flex;
        justify-content: end;
      }
      #wrapper {
        width: 500px;
        margin: auto;
      }
      #wrapper h1 {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .shadow-card {
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        background-color: #ffffff;
        padding: 10px;
      }
      #todoList {
        margin-top: 1em;
        display: flex;
        flex-direction: column;
      }

      .todoItem{
        display: flex;
        justify-content: space-between;
        padding-top: 2px;
        padding-bottom: 2px;
        align-items: center;
      }

      button {
        background: #506e85;
        padding: 12px;
        border-radius: 10px;
        border: 0;
        color: white;
        font-weight: bold;
      }

      #completedTodo {
        margin-top: 12px;
        color: #bbb;
      }
      #completedTodo button {
        background: #7790a3;
      }
    </style>
    <div id="wrapper">
      <h1>ToDo List</h1>

      <div id="todoForm" class="shadow-card">
        <form method="POST" action="/tambahTodo">
          <input type="text" name="todo" />
          <div class="buttonWrapper">
            <button type="submit" >
              Add New TODO
            </button>
          </div>
        </form>
      </div>
      <div id="todoList" class="shadow-card">
        ${ generateTodoEntry()}
      </div>
      <div id="completedTodo" class="shadow-card">
        ${ generateCompletedTodoEntry()}
      </div>
    </div>
  </body>
</html>
  `)
}

function addTodo(req, res){
  todos.push(req.body.todo)
  writeData(todos, 'todos.txt')
  res.redirect('/')
}

function markAsDone(req, res){
  let index = parseInt(req.body.index)
  let completedTodo = todos.splice(index, 1)
  completedTodos.push(completedTodo)
  writeData(todos, 'todos.txt')
  res.redirect('/')
}

app.get('/', indexPage)
app.post('/tambahTodo', addTodo)
app.post('/markAsDone', markAsDone)

todos = readData('todos.txt')
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
