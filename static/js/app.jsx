"use strict";

function App() {
    const [ existingReservations, setExistingReservations ] = React.useState([]);
    const [ username, setUsername ] = React.useState(null);
    const history = ReactRouterDOM.useHistory();

    // Retrieve existing reservations and display them when component is 
    // mounted, on first load, as well as any time username updates.
    React.useEffect(() => {
        fetch(`/api/retrieve_reservations/${username}`)
            .then(response => response.json())
            .then(response => {
                setExistingReservations(response)});
    }, [username])

    function makeReservation (time) {
        // send a POST request to the server to add reservation
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

        // Go to /existing_reservations and render ExistingReservations
        // component 
        history.push('/existing_reservations');
    }

    function cancelReservation(time) {

        // send a POST request to the server to cancel reservation
        fetch(`/api/delete_reservation/${username}`, 
        {
            method: 'POST',
            body: JSON.stringify({'startTime': time}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => setExistingReservations(response));    }

    // Only show navbar if user is logged in
    const navbar = username ? <Navbar setUsername={setUsername}/> : ""

    return (
        <React.Fragment>
            {navbar}
            <div className="container-fluid">
                <ReactRouterDOM.Route exact path="/">
                    <LogIn setUsername={setUsername} />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path="/schedule">
                    <AvailableReservations makeReservation={makeReservation} username={username} />
                </ReactRouterDOM.Route>
                <ReactRouterDOM.Route exact path="/existing_reservations">
                    <ExistingReservations 
                        existingReservations={existingReservations} 
                        cancelReservation={cancelReservation} 
                    />
                </ReactRouterDOM.Route>
            </div>
          </React.Fragment>
      );
}

ReactDOM.render(
    <ReactRouterDOM.BrowserRouter>
        <App />
    </ReactRouterDOM.BrowserRouter>, 
    document.querySelector("#app")
)