"use strict";

function App() {
    const [ existingReservations, setExistingReservations ] = React.useState([]);
    const [ username, setUsername ] = React.useState(null);
    const history = ReactRouterDOM.useHistory();

    React.useEffect(() => {
        // If username is not defined, send to them to the login page /
        //  display login component. Do this the first time the component is 
        // mounted and every time username changes.
        if (!username) {
          history.push('/login');
        }
        else {
            history.push('/');
        }
      }, [username]);

    // Retrieve existing reservations and display them on first load, as
    // well as any time username updates. the
    React.useEffect(() => {
        fetch(`/api/retrieve_reservations/${username}`)
            .then(response => response.json())
            .then(response => {
                setExistingReservations(response)});
    }, [username])

    function makeReservation (time) {
        // send a fetch request to the server to add reservation
        fetch(`/api/make_reservation/${username}`, 
        {
            method: 'POST',
            body: JSON.stringify({'start_time': time}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if (!res.ok) {
                alert('Attempt to make reservation failed. Please try again');
            }
        })

        // Update existingReservations state 
        setExistingReservations(existingReservations => [... existingReservations, time]);

        // Go to /existing_reservations page and render ExistingReservations
        // component 
        history.push('/existing_reservations');
    }

    function cancelReservation(time) {

        // send a fetch request to the server to add reservation
        fetch(`/api/delete_reservation/${username}`, 
        {
            method: 'POST',
            body: JSON.stringify({'startTime': time}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if (!res.ok) {
                alert('Attempt to delete reservation failed. Please try again');
            }
        })

        // Update existingReservations state 
        const updatedReservations = [...existingReservations];

        // Is there an easier way to do this? I could also have the fetch request
        // return the updated reservations but it seems inefficient
        console.log(time);
        console.log(updatedReservations);
        const index = updatedReservations.indexOf(time);
        updatedReservations.splice(index, 1);
        setExistingReservations(updatedReservations);

    }

    return (
          <div className="container-fluid">
            <ReactRouterDOM.Route exact path="/login">
              <LogIn setUsername={setUsername} />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/">
                <Navbar setUsername={setUsername} /> 
              <AvailableReservations makeReservation={makeReservation} username={username} />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/existing_reservations">
                <Navbar setUsername={setUsername} /> 
                <ExistingReservations 
                    existingReservations={existingReservations} 
                    cancelReservation={cancelReservation} 
                />
            </ReactRouterDOM.Route>
          </div>
      );
}

ReactDOM.render(
    <ReactRouterDOM.BrowserRouter>
        <App />
    </ReactRouterDOM.BrowserRouter>, 
    document.querySelector("#app")
)