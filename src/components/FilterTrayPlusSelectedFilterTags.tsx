import type { MouseEvent } from 'react'

export function FilterTrayPlusSelectedFilterTags({selectedTags, handleClearFilterTagClick, handleTagRemovalClick}:{selectedTags:string[], handleClearFilterTagClick:(e:MouseEvent<HTMLButtonElement>) => void, handleTagRemovalClick:(e:MouseEvent<HTMLButtonElement>) => void}){
    if(selectedTags.length >= 1){
      const selectedTagsUI = selectedTags.map((tag) => {
        return (
        <button className='filter-tray__button-tag' key={`filter-tray__tag-button-${tag}`} onClick={handleTagRemovalClick}>{tag}</button>
        )
      })
      return(<div className='filter-tray'>
              <div className='filter-tray__tags-container'>
                {selectedTagsUI}
              </div>
            <button className='filter-tray__clear-button' onClick={handleClearFilterTagClick}>Clear</button>
            </div>
      )
    }
    return null
  }