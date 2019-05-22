import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  users: state.users,
  selected_user: state.user
})

const mapDispatchToProps = {
  loadUsers: () => {
    return dispatch => {
      fetch("http://localhost:3000/users/", {
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
  loadItinerary: (id) => {
    return dispatch => {
      fetch(`http://localhost:3000/users/${id}`, {
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
  class ItineraryIndex extends React.Component {

    componentDidMount() {
      this.props.loadUsers()
    }

    render() {
      return (
        <div>
          {
            !Object.keys(this.props.selected_user).length
            ?
              (!!Object.keys(this.props.users).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
              ? (
                <ul>
                  {this.props.users.map((u,index) => <li key={index} onClick={() => this.props.loadItinerary(u.id)}>{u.username}</li>)}
                </ul>
                )
              : (<h2>...</h2>))
            : <h3>{this.props.selected_user.name}</h3>
          }
        </div>
      ) // The form here should be a find or create style dropdown...
    }
  }
)

// export default App;
