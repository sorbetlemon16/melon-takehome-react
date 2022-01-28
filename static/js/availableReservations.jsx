"use strict";

function Modal() {

    // this doesn't do anything yet and I'm not even sure it's the approach we want to take
    const savedReservations = () => {
        window.location('/existing_reservations');
    }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Your reservation has been created! 
                </div>
                <div className="modal-footer">
                    <button type="button" data-bs-dismiss="modal">Make another reservation.</button>
                    <button type="button" onClick={savedReservations}>Go to your reservation page.</button>
                </div>
                </div>
            </div>
            </div>
    )
}

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

    const makeReservation = () => {
        // fetch request

        // reset available times
        setAvailableTimes([]);
    }

    return (
        <React.Fragment>
            <form id="schedule" onSubmit={getAvailableSlots}>
                Between: <input type="datetime-local" name="start_time" id="datetime_start" min={earliest} />
                and <input type="datetime-local"  name="end_time" id="datetime_end" min={earliest}/>
                <input type="submit" />
            </form>
            {availableTimes.map((time, index) => {
                return (<button key={index} onClick={makeReservation} data-bs-toggle="modal" data-bs-target="#exampleModal">{time}</button>)
            })}
            <Modal />
        </React.Fragment>
    )
}