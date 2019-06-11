import React from 'react'
import SignUp from './SignUp'
import path from '../path'
import port from '../port'

class CreateUser extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://${path}${port}/users/`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        password: this.state.password
      })
    })
    .then( res => res.json())
    .then( res => {
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

  render() {
    return (
      <SignUp handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    )
  }
}

export default CreateUser



//
// <React.Fragment>
//   <form>
//     <label>Username</label>
//     <input onChange={this.handleChange} name="username" type="text" />
//     <label>Name</label>
//     <input onChange={this.handleChange} name="name" type="text" />
//     <label>Password</label>
//     <input onChange={this.handleChange} name="password" type="text" />
//     <input type="submit" onClick={this.handleSubmit} />
//   </form>
// </React.Fragment>
