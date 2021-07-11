import React from 'react'
import Dropdown  from 'react-select-advanced'
import 'react-select-advanced/dist/index.css'


const countryList = ['America', 'Australia', 'Germany', 'India']

const handleOnSelect = (val) =>{

  console.log('val', val)

}
const App = () => {
  return <Dropdown 
    options={countryList}
    onSelect={handleOnSelect}
    showSearchBar
    placeholder='Select' 
    searchPlaceholder='Search'/>
}

export default App
