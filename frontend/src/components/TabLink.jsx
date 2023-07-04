function TabLink({ name, active, tab_setter }) {
  
    function test(){
        tab_setter(name);
    }

    return (
        <button className={ active ? 'nav-link active' : 'nav-link' } onClick={test}>{ name }</button>
    )
  }
  
  export default TabLink