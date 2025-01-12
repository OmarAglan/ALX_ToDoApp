function Form(){
  const handleSubmit = (event) =>{
    event.preventDefault()
    //rest the form
    event.target.rest();
  };
  return(
    <form className={"form"} onSubmit={handleSubmit}>
      <label htmlFor={"todo"}>
        <input
          type={"text"}
          name={"todo"}
          id={"todo"}
          placeholder={"Please Add You Tasks For Today"}
        />
      </label>
      <button>
        <span className={"hidden-s"}>Submit</span>
        <svg>
          <path d={""}/>
        </svg>
      </button>
    </form>

  )
}