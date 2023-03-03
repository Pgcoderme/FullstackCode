const Filter=({onChangeHandler})=>{

    return (
       <form>
       <div>
        filter shown with:<input   onChange={onChangeHandler}/>
       </div>
    </form>
    )
   }
   export default Filter
   