import { useState, useMemo, useEffect, useRef } from 'react'
import { JobListings } from './components/JobListings.tsx'
import { FilterTrayPlusSelectedFilterTags } from './components/FilterTrayPlusSelectedFilterTags.tsx'
import { Dialog } from './components/Dialog.tsx'
import type { MouseEvent } from 'react'
import './App.css'
import jobsData from './data.json' 

const transformedJobs = jobsData.map((jobPost) => {
  const { role, ...jobPostMin1 } = jobPost
  const { level, ...jobPostMin2 } = jobPostMin1 
  const { languages, ...jobPostMin3} = jobPostMin2
  const { tools, ...jobPostMin4} = jobPostMin3
  const tags = [role, level, ...languages, ...tools]
  const transformedJobPost = {...jobPostMin4, tags: tags}
  return transformedJobPost
})

export type jobPostsDataType = {
  tags: string[];
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  postedAt: string;
  contract: string;
  location: string;
}


function App() {
  // REACT HOOKS
  const [jobPostsData, setJobPostsData] = useState<jobPostsDataType[]>(transformedJobs)
  
  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    const savedTags = localStorage.getItem('filterTags')
    return savedTags != null ? JSON.parse(savedTags) : [] 
    }
  )
  
  const dialogRef = useRef<HTMLDialogElement | null>(null)
  
  const filteredOrPureJobPosts = useMemo(() => jobsDataFiltrator(jobPostsData),[selectedTags, jobPostsData])
  
  useEffect(() => {
    localStorage.setItem('filterTags', JSON.stringify(selectedTags))
  }, [selectedTags])

  // DERIVED VALUES
  function jobsDataFiltrator(jobsData: jobPostsDataType[]){
    if(selectedTags.length >= 1){
      const isSubset = (chosenTags:string[], jobPostTags:string[]) => {
        return ( chosenTags.every((tag) => jobPostTags.includes(tag)) )
      }
      const filteredJobs = jobsData.filter((jobPost) => {
        return isSubset(selectedTags, jobPost.tags)
      })
      return filteredJobs
    }
    return jobsData
  }

  //EVENT HANDLER RELATED FUNCTIONS
  const handleOpenDialogClick = () => {
    if(dialogRef.current != null){
      dialogRef.current.showModal()
    }
  }

  const handleCloseDialogClick = () => {
    if(dialogRef.current != null){
      dialogRef.current.close()
    }
  }

  function handleTagRemovalClick(e:MouseEvent<HTMLButtonElement>): void{
    if(e && selectedTags.length != 0){
      const buttonTarget = e.target as HTMLButtonElement
      const remaininigSelectedTags = selectedTags.filter((tag) => tag != buttonTarget.innerText)
      setSelectedTags(remaininigSelectedTags)
    }
  }

  function handleConfirmedDeletionClick(){
    setSelectedTags([])
    handleCloseDialogClick()
  }


  function handleButtonTagClick(e:MouseEvent<HTMLButtonElement>): void{
    if(e != null && !selectedTags.includes(e.currentTarget.innerText)){
    const clickedTag = e.currentTarget.innerText
      setSelectedTags((prevSelectedTags) => [...prevSelectedTags, clickedTag])
    }
  }

  function handleClearFilterTagClick(e:MouseEvent<HTMLButtonElement>){
    if(e.currentTarget != null){
      handleOpenDialogClick()
    }
  }

  return (
    <>
      <header className='job-listings-header'>
        <h1>
          Devjobs
        </h1>
      </header>
      <FilterTrayPlusSelectedFilterTags selectedTags={selectedTags} handleClearFilterTagClick={handleClearFilterTagClick} handleTagRemovalClick={handleTagRemovalClick}/>
      <main className='job-listings-container'>
           <JobListings filteredOrPureJobsData={filteredOrPureJobPosts} handleButtonTagClick={handleButtonTagClick} selectedTags={selectedTags}/>
      </main>
      <Dialog dialogRef={dialogRef} selectedTags={selectedTags} handleConfirmedDeletionClick={handleConfirmedDeletionClick} handleCloseDialogClick={handleCloseDialogClick}/>
    </>
  )
}

export default App
