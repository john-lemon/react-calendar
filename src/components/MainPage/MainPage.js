import React from 'react'
import ReactDOM from 'react-dom'

import Calendar from 'components/Calendar/Calendar'

import 'MainPage.styl'

class MainPage extends React.Component {
  constructor (props) {
    super(props)
    this.state={}
  }


  render () {
    return <div className="main-page">
      <Calendar
        ref="calendar"
        selectedMonthIndex = { new Date().getMonth() }
        selectedYear = { new Date().getFullYear() }
        selectedDay = { new Date().getDate() }
        onSetMonth = { ()=>{ this.setState({value:this.refs.calendar.value }) } }
        onSetDay = { ()=>{ this.setState({value:this.refs.calendar.value }) } }
        onSetYear = { ()=>{ this.setState({value:this.refs.calendar.value }) } }/>
      <div className="calendar-value">{this.state.value ? this.state.value : 'Выберите дату'}</div>
    </div>
  }

}

export default MainPage
