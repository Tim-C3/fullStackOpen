const Form = (props) => {
    return(
    <>
    <form onSubmit={props.submit}>
      <input onChange={props.handleNameChange}  placeholder={"Name"}/><br/>
      <input onChange={props.handleNameChange}  placeholder={"Number"}/><br/>
      
      <button type='submit' >Add</button> 
    </form>
    </>
    )
}  

const Search = (props) => {
  return(
    <>
        <input 
        onChange={props.handleChange}
        value={props.search}
        />
    </>
  )}

  const duplicate = (name, persons) => {
    console.log('In check duplicate component', name);
    const exists = persons.filter(person => 
      JSON.stringify(person.name) === JSON.stringify(name))
    var boolean = null
    exists.length !== 1 ? boolean = false : boolean = true    
    return boolean;
  }
export {Form, Search, duplicate}