"use strict";

function AvailableReservations(){
    const timeSlots = [
        <li>Date: 12/9 Time: 10:00 am</li>,
        <li>Date: 12/9 Time: 10:30 am</li>
    ];

    return (
        <ul>
            {timeSlots}
        </ul>
    )
}