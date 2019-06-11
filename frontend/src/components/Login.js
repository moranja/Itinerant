import React from 'react'
import SignIn from './SignIn'
import path from '../path'
import port from '../port'

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://${path}${port}/login`, {
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

  logout = () => {
    localStorage.clear()
    this.setState({}) // Is this bad? lol
  }

  componentDidMount() {
    localStorage.clear()
    this.setState({}) // Is this bad? lol
  }

  render() {
    return (
      <SignIn handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
    )
  }
}

export default Login


  //
  // {
  //   !localStorage.token
  //   ? (
  //     <div>
  //       <form>
  //         <label>Username</label>
  //         <input onChange={this.handleChange} name="username" type="text" />
  //         <label>Password</label>
  //         <input onChange={this.handleChange} name="password" type="password" />
  //         <input type="submit" onClick={this.handleSubmit} />
  //       </form>
  //       <button onClick={() => this.props.history.push('/create_user')}>Create an account</button>
  //     </div>
  //   )
  //   : (
  //     <React.Fragment>
  //       <h4>You're already logged in!</h4>
  //       <button onClick={this.logout}>Logout</button>
  //     </React.Fragment>
  //   )
  // }
