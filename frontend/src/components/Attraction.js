import React from 'react'
import EditAttractionModal from './EditAttractionModal'
import { connect } from 'react-redux'

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
    fetch(`http://localhost:3000/attractions/${attraction_info.attractionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
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


    render() {
      return (
        <EditAttractionModal handleChange={this.handleChange} handleEditSubmit={this.handleEditSubmit} {...this.state} />
      )
    }
  }
)
