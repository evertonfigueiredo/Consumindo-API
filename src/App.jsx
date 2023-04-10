import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState("")
  
  const changeName = (event) => {
    setName(event.target.value);
  }

  const listUsers = () => {
    fetch("https://62e9252e249bb1284ebb6ac6.mockapi.io/users")
      .then(response => response.json())
      .then(data => {
        setUsers(data)
      })
  }

  const addUser = () => {
    fetch("https://62e9252e249bb1284ebb6ac6.mockapi.io/users", {
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.id) {
          listUsers()
        }
      })
  }

  useEffect(() => {
    listUsers()
  }, [])


  return (
    <div className='container py-5'>
      <div className='row'>
        {users && users.map((user) => 
          <div className='col-3 py-2' key={user.id}>
            <div className="card">
              <img src={user.avatar} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="row">
        <input type="text" onChange={changeName}/>
        {/* <button onClick={addUser}>Adicionar Usuário</button> */}
      </div>
    </div>
  )
}

export default App
