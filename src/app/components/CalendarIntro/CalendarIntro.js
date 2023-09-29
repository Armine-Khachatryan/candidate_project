import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const RangeCalendarIntro = (props) => {
    // const [dateRange, setDateRange] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         key: 'selection'
    //     }
    // ]);


    const handleSelect = (ranges) => {
        props.OnSaveCalendarDataIntro([ranges.selection])
    };

    return (
        <div>
            <DateRangePicker
                ranges={props.dateRangeIntro}
                onChange={handleSelect}
            />
        </div>
    );
};

export default RangeCalendarIntro;