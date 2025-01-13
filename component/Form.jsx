function Form() {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="todo">
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
        />
      </label>
      <button type="submit">
        <span className="visually-hidden">Add Task</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M4 12H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

export default Form;