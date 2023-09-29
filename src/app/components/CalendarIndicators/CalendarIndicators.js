import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const RangeCalendar = (props) => {


    const handleSelect = (ranges) => {
        props.OnSaveCalendarData([ranges.selection])
    };

    return (
        <div>
            <DateRangePicker
                ranges={props.calendarDataIndustry}
                onChange={handleSelect}
            />
        </div>
    );
};

export default RangeCalendar;

