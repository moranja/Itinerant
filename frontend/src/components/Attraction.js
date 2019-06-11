import React from 'react'
import EditAttractionModal from './EditAttractionModal'
import { connect } from 'react-redux'
import path from '../path'
import port from '../port'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  editAttraction: attraction_info => dispatch => {
    const editArea = {
      attraction_id: attraction_info.attractionId,
      name: attraction_info.name,
      classification: attraction_info.classification,
      description: attraction_info.description
    }
    fetch(`http://${path}${port}/attractions/${attraction_info.attractionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        ...editArea
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        console.log(res.message)
      } else {
        dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: res})
      }
    })
  },
  deleteAttraction: attractionId => dispatch => {
    fetch(`http://${path}${port}/attractions/${attractionId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "X-Requested-With": "XMLHttpRequest"
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        console.log(res.message)
      } else {
        dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: res})
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
  class Attraction extends React.Component {
    state = {
      editName: this.props.name,
      editClassification: this.props.classification,
      editDescription: this.props.description
    }

    handleChange = (e) => {
      this.setState({[e.target.id]: e.target.value})
    }

    handleEditSubmit = () => {
      let payload = {
        attractionId: this.props.id,
        name: this.state.editName,
        classification: this.state.editClassification,
        description: this.state.editDescription
      }
      this.props.editAttraction(payload)
    }

    handleDelete = () => {
      this.props.deleteAttraction(this.props.id)
    }


    render() {
      return (
        <EditAttractionModal handleChange={this.handleChange} handleEditSubmit={this.handleEditSubmit} handleDelete={this.handleDelete} {...this.state} />
      )
    }
  }
)
