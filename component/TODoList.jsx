
function TODoList({ todos }) {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => <Item key={index} item={item} />)
      ) : (
        <p>You haven't Added Anything Yet, Add Something?!</p>
      )}
    </ol>
  );
}

function Item({ item }) {
  return (
    <li id={item?.id} className="todo_item">
      <button className="todo_items_left">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="10" stroke="#88AB33" strokeWidth="2" />
          {item?.completed && (
            <path d="M6 11L9 14L15 8" stroke="#88AB33" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
        <p style={{ textDecoration: item?.completed ? 'line-through' : 'none' }}>
          {item?.title}
        </p>
      </button>
      <div className="todo_items_right">
        <button>
          <span className="visually-hidden">Edit</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 3.5L20.5 7.5L7 21H3V17L16.5 3.5Z" stroke="#C2B39A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button>
          <span className="visually-hidden">Delete</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="#C2B39A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TODoList;