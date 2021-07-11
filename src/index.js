import React, { useState } from 'react'
import styles from './styles.module.css'
import { FaAngleDown, FaAngleUp, FaSearch } from 'react-icons/fa'

const Dropdown = (props) => {
  const { options, placeholder, searchPlaceholder, disabled, showSearchBar } =
    props

  const selectOptions = options || []

  const [selectedItem, setSelectedItem] = useState(placeholder || 'Select')
  const [isOpen, setIsOpen] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [dorpDownOptions, setDropdownOptions] = useState([...selectOptions])

  const getPlaceholder = () => {
    return <div className={styles.placeholder}>{selectedItem}</div>
  }

  const setSelectedOption = (e, el) => {
    setSelectedItem(el)
    handleIsOpenDropdown(e)
    setSearchInput('')
    setDropdownOptions([...options])
    props.onSelect(el)
  }

  const handleIsOpenDropdown = (e) => {
    disabled ? e.preventDefault() : setIsOpen(!isOpen)
  }

  const handleOnSearch = (val) => {
    setSearchInput(val)
    if (options) {
      const defaultOptions = [...options]
      const searchedContent = defaultOptions.filter((el) => {
        return el
          .toString()
          .toLocaleLowerCase()
          .includes(val.toLocaleLowerCase())
      })

      setDropdownOptions(searchedContent)
    }
  }

  const renderOptions = (el, idx) => {
    return (
      <div
        key={`${el}-${idx}`}
        className={styles.advanced_select__option}
        onClick={(e) => setSelectedOption(e, el)}
      >
        {el}
      </div>
    )
  }

  const dropDownOptions = (options) => {
    return options.map((el, idx) => renderOptions(el, idx))
  }

  return (
    <div className={styles.advanced_select}>
      <div
        onClick={(e) => handleIsOpenDropdown(e)}
        className={`${styles.advanced_select__placeholder_wrap} ${
          disabled ? 'disabled' : ''
        }`}
      >
        {getPlaceholder()}{' '}
        {isOpen ? (
          <FaAngleUp className={styles.arrow_icon} />
        ) : (
          <FaAngleDown className={styles.arrow_icon} />
        )}
        <div className={styles.placeholder__arrow} />
      </div>
      <div
        className={`${styles.advanced_select__options_wrap} ${
          isOpen ? styles.advance_select_menu : ''
        }`}
      >
        {showSearchBar && (
          <div className={styles.input_container}>
            <input
              type='text'
              placeholder={searchPlaceholder || ''}
              value={searchInput}
              onChange={(el) => handleOnSearch(el.target.value)}
              className={styles.advanced_select__searchbox}
            />
            <FaSearch className={styles.search_icon} />
          </div>
        )}

        {dropDownOptions(dorpDownOptions)}
      </div>
    </div>
  )
}

export default Dropdown
