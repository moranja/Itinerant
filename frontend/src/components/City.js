import React from 'react'
import Plan from './Plan'
import Area from './Area'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const mapDispatchToProps = {
  addAreaFromItinerary: area_info => dispatch => {
    const newArea = {
      city_id: area_info.cityId,
      name: area_info.name,
      content: area_info.content
    }
    fetch(`http://localhost:3000/areas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        ...newArea
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
  addPlan: plan_info => dispatch => {
    const newPlan = {
      city_id: plan_info.cityId,
      date: plan_info.date,
      time: plan_info.time,
      content: plan_info.content
    }
    fetch(`http://localhost:3000/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        ...newPlan
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

export default connect(null, mapDispatchToProps) (
  class City extends React.Component {

    state = {
      startDate: ""
    }

    handleChange = (e) => {
      this.setState({[e.target.id]: e.target.value})
    }

    handleDateChange = (date) => {
      console.log(date)
      this.setState({
        startDate: date,
        formatted_date: [date.getFullYear(), date.getMonth()+1, date.getDate()].join('-')
      })
    }

    handleSubmit = (e) => {
      e.persist()
      e.preventDefault()
      let payload = {
        cityId: this.props.id,
        name: this.state.name,
        content: this.state.content
      }
      this.props.addAreaFromItinerary(payload)
    }

    handlePlanSubmit = (e) => {
      e.persist()
      e.preventDefault()
      let payload = {
        cityId: this.props.id,
        date: this.state.formatted_date,
        time: this.state.time,
        content: this.state.description
      }
      this.props.addPlan(payload)
    }

    componentDidMount() {
      // const today = new Date()
      // this.setState({ startDate: today })
    }

    render() {
      return (
        <React.Fragment>
          <div>
            <h2>{this.props.name}, {this.props.country}</h2>
              <ul>
                {this.props.plans.map(p => <Plan {...p} key={p.id}/>)}
              </ul>
              Schedule a New Plan: <br/>
              <form onSubmit={this.handlePlanSubmit}>
                <DatePicker
                  placeholderText="Click to select a date"
                  selected={this.state.startDate}
                  onChange={this.handleDateChange}
                />
                <input type="text" placeholder="Time" id="time" onChange={this.handleChange}/>
                <input type="text" placeholder="Description" id="description" onChange={this.handleChange}/>
                <input type="submit" />
              </form>
              <br />
              {this.props.areas.map(a => <Area {...a} key={a.id}/>)}
          </div>
          <form onSubmit={this.handleSubmit}>
            New Area:
            <br />
            <input type="text" placeholder="Name" id="name" onChange={this.handleChange}/>
            <input type="text" placeholder="Description" id="content" onChange={this.handleChange}/>
            <input type="submit" />
          </form>
        </React.Fragment>
      )
    }
  }
)
