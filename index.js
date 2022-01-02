const express = require('express')

const app = express()
const port = 3000

function indexPage(req, res) {
  res.send(`
<html>
  <head>
    <title>TO DO LIST</title>
  </head>
  <body>
    <style>
      #todoForm{
        background-color: #fafafa;
        padding: 10px;
        max-width: 400px;
        display: flex;
      }
      #todoForm form {
        display: flex;
        width: 100%;
        flex-direction: column;
      }
      #todoForm input {
        padding: 5px;
        border-radius: 5px;
      }
      #todoForm .buttonWrapper {
        margin-top: 10px;
        display: flex;
        justify-content: end;
      }
    </style>
    <div id="todoForm">
      <form>
        <input type="text" name="todo" />
        <div class="buttonWrapper">
          <button type="submit" >
            Add New TODO
          </button>
        </div>
      </form>
    </div>
  </body>
</html>
  `)
}

app.get('/', indexPage)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
