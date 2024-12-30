import React from 'react';
import './TaskFormInput.css'

const TaskFormInput = () => {
    return (
        <header className='app_header_sec'>
            <form>
                <input type={"text"} className={"task_input_header"} placeholder={"Add Your Tasks"}/>
                <div className={"task_input_bottom_line"}>
                    <button className={"button_tag"}>
                        Html
                    </button>
                    <button className={"button_tag"}>
                        CSS
                    </button>
                    <button className={"button_tag"}>
                        JavaScript
                    </button>
                    <button className={"button_tag"}>
                        Unity
                    </button>

                    <select className={"task_status"}>
                        <option value={"backlog"}>
                            Backlog
                        </option>
                        <option value={"in_progress"}>
                            In Progress
                        </option>
                        <option value={"late_task"}>
                            Late Task
                        </option>
                        <option value={"done"}>
                            Done
                        </option>
                        <option value={"archive"}>
                            Archive
                        </option>
                    </select>
                    <button type={"submit"} className={"task_submit"}>
                        Add Task
                    </button>
                </div>
            </form>
        </header>
    );
};

export default TaskFormInput;