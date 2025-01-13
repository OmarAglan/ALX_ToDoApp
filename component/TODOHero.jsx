function TODOHero({ todos_completed, todos_total }) {
  return (
    <section className="todohero_section">
      <div>
        <p className="text_large">Task Done</p>
        <p className="text_small">keep it up</p>
      </div>
      <div>
        {todos_completed}/{todos_total}
      </div>
    </section>
  );
}

export default TODOHero;