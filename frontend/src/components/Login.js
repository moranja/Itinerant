import React from 'react'

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      if (res.error) {
        console.log(res.message)
      } else {
        localStorage.setItem('token', res.auth_token)
        localStorage.setItem('username', res.username)
        localStorage.setItem('userId', res.id)
        this.props.history.push('/home')
      }
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
   return (
     <form>
       <label>Username</label>
       <input onChange={this.handleChange} name="username" type="text" />
       <label>Password</label>
       <input onChange={this.handleChange} name="password" type="text" />
       <input type="submit" onClick={this.handleSubmit} />
     </form>
   )
  }
}

export default Login
