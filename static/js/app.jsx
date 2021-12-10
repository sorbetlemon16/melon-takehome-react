"use strict";

function App() {
    return(
        <React.Fragment>
            <h1>Hi!</h1>
            <AvailableReservations />
        </React.Fragment>
    )
}

ReactDOM.render(
    <App />, 
    document.querySelector("#app")
)