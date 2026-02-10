import type {jobPostsDataType} from '../App.tsx'
import type { MouseEvent } from 'react'

export function JobListings({ filteredOrPureJobsData, handleButtonTagClick, selectedTags }:{filteredOrPureJobsData:jobPostsDataType[], handleButtonTagClick:(e: MouseEvent<HTMLButtonElement>) => void, selectedTags: string[]}){
      const jobListingsUI = filteredOrPureJobsData.map((jobPost) => {  
      const jobPostTags = jobPost.tags.map((tag) => {
        return(
          <button className='job-listing-card__button-tag' onClick={handleButtonTagClick} key={`job-listing-button-${tag}`} aria-pressed={selectedTags.includes(tag) ? "true" : "false"}>{tag}</button>
        )
      })
      return(
        <article className='job-listing-card' key={jobPost.id}>
          <div className='job-listing-card__cmp-new-ftr-container'>
            <h2 className='job-listing-card__heading'>{jobPost.company}</h2>
            {jobPost.new ? <p className='job-listing-card__new-tag'>NEW</p> : null}
            {jobPost.featured ? <p className='job-listing-card__featured-tag'>FEATURED</p> : null}
          </div>
          <h3 className='job-listing-card__subheading'>{jobPost.position}</h3>
          <div className='job-listing-card__position-details-container'>
            <p className='job-listing-card__posting-date'>{jobPost.postedAt}</p>
            <img className='job-listing-card__decorative-dot' src='/images/oval.svg' alt=''/>
            <p className='job-listing-card__contract-type'>{jobPost.contract}</p>
            <img className='job-listing-card__decorative-dot' src='/images/oval.svg' alt=''/>
            <p className='job-listing-card__location'>{jobPost.location}</p>
          </div>
          <div className='job-listing-card__button-tags-container'>
            {jobPostTags}
          </div>
        </article>
      )
    })
    return(jobListingsUI)
  }