"use strict";

function App() {
    const [ existingReservations, setExistingReservations ] = React.useState([]);

    // add useEffect hook for existingReservations here 

    const makeReservation = (time) => {
        // send a fetch request to the server to add reservation

        setExistingReservations(existingReservations => [... existingReservations, time]);
        // window.location = '/existing_reservations';

        alert(existingReservations);
    }

    return (
        <ReactRouterDOM.BrowserRouter>
          <div className="container-fluid">
            <ReactRouterDOM.Route exact path="/">
              <AvailableReservations makeReservation={makeReservation} />
            </ReactRouterDOM.Route>
            <ReactRouterDOM.Route exact path="/existing_reservations">
                <ExistingReservations existingReservations={existingReservations} />
            </ReactRouterDOM.Route>
          </div>
        </ReactRouterDOM.BrowserRouter>
      );
}

ReactDOM.render(
    <App />, 
    document.querySelector("#app")
)