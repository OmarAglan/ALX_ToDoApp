import React from 'react';
import "./App.css";

import Form from "../component/Form.jsx";
import Header from "../component/Header.jsx";
import TODOHero from "../component/TODOHero.jsx";
import TODoList from "../component/TODoList.jsx";

const App = () => {
    return (
        <div className={"wrapper"}>
            <Header />
            <TODOHero todos_completed={0} todos_total={0} />
            <Form />
            <TODoList todos={[]} />
        </div>
    );
}

export default App;