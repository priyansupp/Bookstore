import React from 'react'

function About() {
  return (
    <div>
      <h1>Flynt.Social</h1>
      <p>You can add books, search/update/delete books.</p>

      <table style={{width: "100%"}}>
        <thead>
          <tr>
            <th>ACTION</th>
            <th>URL</th>
            <th>HTTP</th>
            <th>BODY</th>
            <th>RESULT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{color: "blue"}}>READ</td>
            <td>/books</td>
            <td>GET</td>
            <td>Empty</td>
            <td>Returns ALL Books</td>
          </tr>
          <tr>
            <td style={{color: "blue"}}>READ</td>
            <td>/books/:id</td>
            <td>GET</td>
            <td>Empty</td>
            <td>Returns A Single Book</td>
          </tr>
          <tr>
            <td style={{color: "green"}}>CREATE</td>
            <td>/books</td>
            <td>POST</td>
            <td>JSON?</td>
            <td>New Book Created</td>
          </tr>
          <tr>
            <td style={{color: "orange"}}>UPDATE</td>
            <td>/books/:id</td>
            <td>PUT</td>
            <td>JSON?</td>
            <td>Updates Book</td>
          </tr>
          <tr>
            <td style={{color: "red"}}>DELETE</td>
            <td>/books/:id</td>
            <td>DELETE</td>
            <td>Empty</td>
            <td>Delete Book</td>
          </tr>
        </tbody>
      </table>


    </div>
  )
}

export default About