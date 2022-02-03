"use strict";

function AvailableReservations(props) {

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

    // const makeReservation = (time) => {
    //     // fetch request

    //     // add to available times
    //     setAvailableTimes([]);
    //     window.location = '/existing_reservations';
    // }

    return (
        <React.Fragment>
            <form id="schedule" onSubmit={getAvailableSlots}>
                Between: <input type="datetime-local" name="start_time" id="datetime_start" min={earliest} />
                and <input type="datetime-local"  name="end_time" id="datetime_end" min={earliest} />
                <input type="submit" />
            </form>
            {availableTimes.map((time, index) => {
                return (
                <button key={time} onClick={() => props.makeReservation(time)}>
                    {time}
                </button>)
            })}
        </React.Fragment>
    )
}

function ExistingReservations(props) {
    console.log(props.existingReservations);
    return (
        <React.Fragment> 
            {props.existingReservations.map((value) => 
                {
                    return(<div>Hello{value}</div>)
                }
            )}
        </React.Fragment>
    )
}