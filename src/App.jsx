import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const changeName = (event) => {
    setName(event.target.value);
  }

  const changeEmail = (event) => {
    setEmail(event.target.value);
  }

  const changePassword = (event) => {
    setPassword(event.target.value);
  }

  const listUsers = () => {
    fetch("http://localhost:8000/usuario/", {
      headers: {
        'Authorization': `Basic ${localStorage.getItem("token")}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data.data.usuarios);
        setUsers(data.data.usuarios)
      })
  }

  const loginUser = () => {

    fetch("http://localhost:8000/usuario/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.statusCode === 401) {
          alert(data.message)
        }
        if (data.statusCode === 200) {
          localStorage.setItem("token", data.data.token);
          listUsers()
        }
      })
  }

  const addUser = () => {
    console.log(name, email, password);
    fetch("http://localhost:8000/usuario/criar", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.statusCode === 201) {
          listUsers()
        }
      })
  }

  const autenticadoUser = () => {
    fetch("http://localhost:8000/usuario/rotaAutenticada", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${localStorage.getItem("token")}`
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
  }

  const logout = () => {
    localStorage.removeItem("token");
    document.location.reload(true);
  }

  useEffect(() => {
    listUsers()
  }, [])


  return (
    <div className='container py-5'>
      <div className='row'>
        {users && users.map((user) =>
          <div className='col-3 py-2' key={user._id}>
            <div className="card">
              {/* <img src={user.avatar} className="card-img-top" alt="..." /> */}
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="row">
        <input type="text" placeholder='Name' onChange={changeName} />
        <input type="email" placeholder='email' onChange={changeEmail} />
        <input type="password" placeholder='Password' onChange={changePassword} />
        <button onClick={addUser}>Adicionar Usuário</button>
      </div> */}
      <div className="row">
        <input type="email" placeholder='email' onChange={changeEmail} />
        <input type="password" placeholder='Password' onChange={changePassword} />
        <button onClick={loginUser}>Logar</button>
      </div>
      <hr />
      <div className="row">
        <button onClick={autenticadoUser}>Rota Autenticada</button>
      </div>
      <hr />
      <div className="row">
        <button onClick={logout}>Sair</button>
      </div>
    </div>
  )
}

export default App
