function TabPane({ content, active }) {
  
    return (
        <div className={ active ? "tab-pane fade show active" : "tab-pane fade" }>
            { content }
        </div>
    )
  }
  
  export default TabPane