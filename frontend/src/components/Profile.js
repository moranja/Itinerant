import React from 'react'
import ProfileList from './ProfileList'
import NavBar from './NavBar'
import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  loadUser: () => {
    return dispatch => {
      fetch(`http://localhost:3000/users/${localStorage.userId}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => {
        dispatch({ type: "SELECT_USER", payload: user })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
  class UserContainer extends React.Component {
    componentDidMount() {
      this.props.loadUser()
    }

    render() {
      return (
        <React.Fragment>
        <NavBar />
          {
            !!Object.keys(this.props.user).length
            ?
              (<ProfileList itineraries={this.props.user.itinerary_list} name={this.props.user.name}/>)
            :
              null
          }

        </React.Fragment>
      )
    }
  }
)
