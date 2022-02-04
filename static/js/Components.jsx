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

        fetch(`/api/get_available_reservations/${props.username}?${queryString}`)
            .then(response => response.json())
            .then(response => {
                if (response.length == 0) {
                    alert('No times available, try again!');
                }
                setAvailableTimes(response);
            })
        }

    return (
        <React.Fragment>
            <h1> Schedule a melon reservation! </h1>
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
    return (
        <React.Fragment> 
            <h1> Reservations </h1>
            {props.existingReservations.map((time) => {
                return (
                <form key={time} onSubmit={
                    (evt) => {
                        evt.preventDefault();
                        props.cancelReservation(time);
                    }
                    }>
                    {time}
                    <input type="submit" value="Cancel reservation" />
                </form>)
            })}

        </React.Fragment>
    )
}

function LogIn(props) {
   
    const history = ReactRouterDOM.useHistory();

    const login = (evt) => {
        evt.preventDefault();

        props.setUsername(document.querySelector('#username').value);

        history.push("/schedule");
   }

    return (
        <React.Fragment>
            <h1> Login </h1>
            <form onSubmit={login}>
                Username: <input id="username" type="text" />
                <input type="submit"/>
                
            </form>
        </React.Fragment>
    )
}

function Navbar(props) {

    return (
        <div className="link_header">
        <ReactRouterDOM.Link to="/existing_reservations">
          <span>Existing Reservations</span>
        </ReactRouterDOM.Link>
  
        <ReactRouterDOM.NavLink to="/schedule">
            Make a Reservation
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink  
            to="/"
            onClick={() => props.setUsername(null)}
        >
            Logout
        </ReactRouterDOM.NavLink>
      </div>
    )
}