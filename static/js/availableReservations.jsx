"use strict";

function AvailableReservations() {

    const earliest = new Date().toISOString().substring(0,16);
    const [ availableTimes, setAvailableTimes ] = React.useState([]);

    const getAvailableSlots = (evt) => {
        evt.preventDefault();

        const formData = {
            "startTime": document.querySelector('[name="start_time"]').value,
            "endTime": document.querySelector('[name="end_time"]').value
        };
    
        const queryString = new URLSearchParams(formData).toString();

        fetch(`/get_available_reservations?${queryString}`)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setAvailableTimes(response);
            })
        }
    

            // they each need a unique key, needs to be a single element

    return (
        <React.Fragment>
            <form id="schedule" onSubmit={getAvailableSlots}>
                Between: <input type="datetime-local" name="start_time" id="datetime_start" min={earliest} />
                and <input type="datetime-local"  name="end_time" id="datetime_end" min={earliest}/>
                <input type="submit" />
            </form>
            {availableTimes.map((time, index) => {
                return (<div key='{index}'>{index} {time}</div>)
            })}
        </React.Fragment>
    )
}