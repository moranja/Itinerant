import React from 'react'
import Plan from './Plan'
import Area from './Area'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

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
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newArea
      })
    })
    .then(res => res.json())
    .then(res => { dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: res})})
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
  class City extends React.Component {

    handleChange = (e) => {
      this.setState({[e.target.id]: e.target.value})
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

    render() {
      return (
        <React.Fragment>
          <div>
            <h2>{this.props.name}, {this.props.country}</h2>
              <ul>
                {this.props.plans.map(p => <Plan {...p} key={p.id}/>)}
              </ul>
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
