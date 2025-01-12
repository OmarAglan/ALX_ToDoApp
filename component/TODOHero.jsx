import '../src/App.css';
function TODOHero({todos_completed, todos_total}){
  return(
    <section>
      <div>
        <p>Tasks That Has Been Completed.</p>
        <p>Good Work, Keep It Up!</p>
      </div>
      <div>
        {todos_completed/{todos_total}}
      </div>
    </section>
  )
}

export default TODOHero;