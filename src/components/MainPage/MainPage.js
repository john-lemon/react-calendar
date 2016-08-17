import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from 'components/Calendar/Calendar';


class MainPage extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
      return <div className="b-main-page">
        <Calendar 
            selectedMonthIndex = { new Date().getMonth() }
            selectedYear = { new Date().getFullYear() }
            selectedDay = { new Date().getDate() }/>
      </div>
    }

}

export default MainPage;
