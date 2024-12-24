import React from 'react';

const TaskFormInput = () => {
    return (
        <header className='app_header_sec'>
            <form>
                <input type={"text"} className={"task_input_header"} placeholder={"Add Your Tasks"}/>
                <div className={"task_input_bottom_line"}>
                    <button className={"button_tag"}>
                        Html
                    </button>
                </div>
            </form>
        </header>
    );
};

export default TaskFormInput;