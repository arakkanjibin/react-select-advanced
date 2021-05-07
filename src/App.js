
import React, {useState} from 'react';
import './App.css';
import { FaAngleDown, FaAngleUp, FaSearch } from 'react-icons/fa';

const ORGANISM_NAME = 'advanced-select';

const Dropdown = (props) =>{

  const {
    options,
    placeholder,
    searchPlaceholder,
    disabled,
    showSearchBar,
} = props;

const selectOptions = options ? options : [];

  let [selectedItem, setSelectedItem] = useState(placeholder ?  placeholder : 'Select' );
  let [isOpen, setIsOpen] = useState(false);
  let [searchInput, setSearchInput] = useState('');
  let [dorpDownOptions, setDropdownOptions] = useState([...selectOptions]);

  const getPlaceholder = () =>{
    return(
      <div className={`placeholder`} >
          {selectedItem}
      </div>
    )
  };

  const setSelectedOption = (e, el) => {
    setSelectedItem(el);
    handleIsOpenDropdown(e);
    setSearchInput('');
    setDropdownOptions([...options]);
    props.onSelect(el);
  }

  const handleIsOpenDropdown = (e) =>{
    disabled ? e.preventDefault() :
    setIsOpen(!isOpen);
  }

  const handleOnSearch = (val) => {
    setSearchInput(val);
    if(options){
      let defaultOptions = [...options];
    let searchedContent =  defaultOptions.filter( (el) =>{
      return el.toString().toLocaleLowerCase().includes(val.toLocaleLowerCase())
    })

    setDropdownOptions(searchedContent);
    }
  }
  

  const renderOptions = (el, idx) =>{
    return(<div key={`${el}-${idx}`} className={`${ORGANISM_NAME}__option`} onClick={ (e) => setSelectedOption(e, el)}>
      {el}
    </div>)
  };

  const dropDownOptions = (options) =>{
    return options.map((el, idx) => renderOptions(el, idx))
  }

   return(
    <div className={`${ORGANISM_NAME}`}>
      <div onClick={ (e) => handleIsOpenDropdown(e)} className={`advanced-select__placeholder-wrap ${disabled ? 'disabled': ''}`}>
          {getPlaceholder()} {isOpen ? <FaAngleUp className="arrow-icon" /> : <FaAngleDown className="arrow-icon" />}
          <div className={`placeholder__arrow`}/>
      </div>
      <div className={`${ORGANISM_NAME}__options-wrap ${isOpen ? 'advance-select--menu' : ''}`}>
        { showSearchBar && 
        <div className="input-container">
        <input
          type="text"
          placeholder={ searchPlaceholder ? searchPlaceholder : '' }
          value={searchInput}
          onChange={(el) => handleOnSearch(el.target.value)}
          className={`${ORGANISM_NAME}__searchbox`}
        />
        <FaSearch className="search-icon"/>
        </div>}
        
         {dropDownOptions(dorpDownOptions)}
      </div>
      
    </div>
   )
}

export default Dropdown;
