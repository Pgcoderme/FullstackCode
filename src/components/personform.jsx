const PersonForm=({change1,change2,onChangeHandler1,onChangeHandler2,onChangeHandler3})=>{
    return(
        <form >
        <div>
          name: <input  value={change1} onChange={onChangeHandler1} />
          <br/>
          number:<input value={change2} onChange={onChangeHandler2}></input>
        </div>
        <div>
          <button type="submit" onClick={onChangeHandler3} >add</button>
        </div>
      </form>
    )
    }
    export default PersonForm
    
    