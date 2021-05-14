// add a search box
// set the value as the passed in parameter for props
// add an onChange event func that 
const SearchBox = (props) => {
    return (
        <div>
            <input 
            value={props.value}
            onChange={(e) => props.setSearchVal(e.target.value)}
            placeholder='Search here...'
            >
            </input>
        </div>
    )
}

export default SearchBox;