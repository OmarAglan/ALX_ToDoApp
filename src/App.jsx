import React from 'react';
import './App.css';

const App = () => {
    return (
        <div className='app'>
            <header className='app_header_sec'>
                <h1>React App</h1>
            </header>
            <main className='app_main_sec'>
                <section className='task_column_part'>
                    section 1 - Backlog
                </section>
                <section className='task_column_part'>
                    section 2 - In Progress
                </section>
                <section className='task_column_part'>
                    section 3 - Late Task
                </section>
                <section className='task_column_part'>
                    section 4 - Done
                </section>
                <section className='task_column_part'>
                    section 5 - Archive
                </section>
            </main>

        </div>
    );
}

export default App;