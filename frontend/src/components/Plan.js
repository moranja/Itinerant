import React from 'react'

import EditPlanModal from './EditPlanModal'
import { connect } from 'react-redux'
import path from '../path'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  editPlan: plan_info => dispatch => {
    const editPlan = {
      plan_id: plan_info.planId,
      date: plan_info.date,
      time: plan_info.time,
      content: plan_info.content
    }
    fetch(`http://${path}:3000/plans/${plan_info.planId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        ...editPlan
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
  deletePlan: planId => dispatch => {
    fetch(`http://${path}:3000/plans/${planId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
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
  class Plan extends React.Component {

    state = {
      editDate: "",
      formattedDate: this.props.date,
      editTime: this.props.time,
      editContent: this.props.content
    }

    handleChange = (e) => {
      this.setState({[e.target.id]: e.target.value})
    }

    handleDateChange = (date) => {
      console.log(date)
      this.setState({
        editDate: date,
        formattedDate: [date.getFullYear(), date.getMonth()+1, date.getDate()].join('-')
      })
    }

    handleEditSubmit = () => {
      let payload = {
        planId: this.props.id,
        date: this.state.formattedDate,
        time: this.state.editTime,
        content: this.state.editContent
      }
      this.props.editPlan(payload)
    }

    handleDelete = () => {
      this.props.deletePlan(this.props.id)
    }

    render() {
      return (
        <EditPlanModal handleChange={this.handleChange} handleDelete={this.handleDelete} handleDateChange={this.handleDateChange} handleEditSubmit={this.handleEditSubmit} {...this.state} />
      )
    }
  }
)
