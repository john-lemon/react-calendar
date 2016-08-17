import React from 'react';
import ReactDOM from 'react-dom';

import DropdownMenu from 'components/Dropdown/Dropdown.js';
import {nominativeMonthNames, shortDayNames} from 'const/const.js';

import './Calendar.styl';

class Calendar extends React.Component {

  get value () {
    return `${this.state.selectedDay} ${this.state.selectedMonth} ${this.state.selectedYear}`
  }


  render () {
    let monthListOptions = [];
    let yearsListOptions = [];

    nominativeMonthNames.forEach(function(item, i) {
      monthListOptions.push({
        name: item,
        action: this._onSetMonth.bind(this, i, item)
      })
    }.bind(this));

    for (var year=2016; year>2000; year--) {
      yearsListOptions.push({
        name: year,
        action: this._onSetYear.bind(this, year)
      })
    }

    return <div className="calendar">
      <div className="calendar__selector">
        <div className="calendar__select calendar__select_month">
          <span className="calendar__selected calendar__selected_month" onClick={this._onOpenMonthsList.bind(this)}>{this.state.selectedMonth}</span>
          <DropdownMenu ref="monthList" options={monthListOptions} mix="calendar__dropdown"/>
        </div>
        <div className="calendar__select calendar__select_year">
          <span className="calendar__selected calendar__selected_year" onClick={this._onOpenYearsList.bind(this)}>{this.state.selectedYear}</span>
          <DropdownMenu ref="yearsList" options={yearsListOptions}/>
        </div>
      </div>
      <div className="calendar__month">
        <div className="calendar__daynames">
          <div className="calendar__row">
            {shortDayNames.map(day => {
              return <span className="calendar__cell" key={day}>
              {day}
            </span>
            })}
          </div>
        </div>
        {this._renderDays()}
      </div>
    </div>
  }

  componentWillMount () {
    this.state = {}
    this.state.selectedMonthIndex = this.props.selectedMonthIndex;
    this.state.selectedYear = this.props.selectedYear
    this.state.selectedDay = this.props.selectedDay
    this.state.selectedMonth = nominativeMonthNames[this.state.selectedMonthIndex];
  }

  _onSetMonth (index, monthName) {
    this.setState({
      selectedMonthIndex: index,
      selectedMonth: nominativeMonthNames[index]
    },() => {
        this.props.onSetMonth(index, monthName)
    });
  }

  _onOpenMonthsList () {
    this.refs.monthList.setState({
      opened: true
    })
  }

  _onSetYear (year) {
    this.setState({
      selectedYear: year
    }, () => {
        this.props.onSetYear(year)
    })
  }

  _onOpenYearsList () {
    this.refs.yearsList.setState({
      opened: true
    })
  }

  _onSetDay (day) {
    this.setState({
      selectedDay: day
    }, () => {
        this.props.onSetDay(day);
    });

  }

  _renderDays () {
    let currentMonth = this.state.selectedMonthIndex;
    let currentYear = this.state.selectedYear;
    let lastDate = new Date (currentYear, currentMonth+1, 0).getDate(); // количество дней в месяце
    let firstDayOfCurrentMonth = new Date (currentYear, currentMonth, 1).getDay();
    let emptyCellFromStart = firstDayOfCurrentMonth == 0 ? 6 : firstDayOfCurrentMonth-1; // количество пустых ячеек, которыми надо заполнить первую неделю месяца с начала
    let lastDayOfCurrentMonth = new Date (currentYear, currentMonth+1, 0).getDay();
    let emptyCellFromEnd = lastDayOfCurrentMonth == 0 ? 0 : 7 - lastDayOfCurrentMonth; // количество пустых ячеек, которыми надо заполнить последнюю неделю месяца с конца
    let daysInMonth = emptyCellFromStart + lastDate + emptyCellFromEnd; // Общее количество дней, которыми надо заполнить календарь с учетом пустых ячеек
    let monthArray = [];
    let weekArray = [];

    for (var d=0, dl = daysInMonth; d<dl; d++) {
      if (d % 7 != 0 || d===0) {
        if (d<emptyCellFromStart || d > daysInMonth - emptyCellFromEnd-1) {
          weekArray.push('');
        } else {
          weekArray.push(d+1 - (emptyCellFromStart));
        }
      } else {
        monthArray.push(weekArray);
        weekArray = [];
        weekArray.push(d+1 - (emptyCellFromStart));
      }
    }
    monthArray.push(weekArray);

    return <div className="calendar__days">
      {monthArray.map((week, i) => {
        return <div className="calendar__row" key={`week-${i}`}>
          {Array.from(week).map((day,i) => {
            return <span className={`calendar__cell ${day == this.state.selectedDay ? 'calendar__cell_active': null}`} key={`day-${i}`} onClick={this._onSetDay.bind(this, day)}>
              {day}
            </span>
          })}
        </div>
      })}
    </div>
  }

}

Calendar.defaultProps = {
  onSetDay: Function.prototype,
  onSetMonth: Function.prototype,
  onSetYear: Function.prototype,
}


export default Calendar;
