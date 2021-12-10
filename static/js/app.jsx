"use strict";

function App() {
    return(
        <React.Fragment>
            <h1>Hi!</h1>
            <h1>Bye</h1>
        </React.Fragment>
    )
}

ReactDOM.render(
    <App />, 
    document.querySelector("#app")
)