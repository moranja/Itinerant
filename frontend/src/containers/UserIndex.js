import React from 'react'
import { connect } from 'react-redux'
import history from '../history'
import path from '../path'
import port from '../port'

const mapStateToProps = (state) => ({
  users: state.users,
  selected_user: state.user
})

const mapDispatchToProps = {
  loadUsers: () => {
    return dispatch => {
      fetch(`http://${path}${port}/users/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      }) // change this to request from the selected itinerary eventually....
      .then(res => res.json())
      .then(users => {
        dispatch({ type: "USER_LIST", payload: users })
      })
    }
  },
  selectUser: (id) => {
    return dispatch => {
      fetch(`http://${path}${port}/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      }) // change this to request from the selected itinerary eventually....
      .then(res => res.json())
      .then(user => {
        dispatch({ type: "SELECT_USER", payload: user })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  class UserIndex extends React.Component {

    componentDidMount() {
      this.props.loadUsers()
    }

    render() {
      return (
        <div>
          {
            (!!Object.keys(this.props.users).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
            ? (
              <ul>
                {this.props.users.map((u,index) => <li key={index} onClick={() => history.push(`/users/${u.id}`)}>{u.username}</li>)}
              </ul>
              )
            : (<h2>...</h2>))
          }
        </div>
      )
    }
  }
)
