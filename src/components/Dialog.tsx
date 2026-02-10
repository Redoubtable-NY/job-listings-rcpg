import type { RefObject } from "react"

export function Dialog({dialogRef, selectedTags, handleConfirmedDeletionClick, handleCloseDialogClick}:{dialogRef:RefObject<HTMLDialogElement | null> , selectedTags: string[], handleConfirmedDeletionClick: () => void, handleCloseDialogClick: () => void}){
    
    return(
    <dialog className='caution-dialog' ref={dialogRef}>
        <h2 className='caution-dialog__headline'>
          Are you sure you want to remove {selectedTags.length > 1 ? "all tags" : "the tag"}?
        </h2>
        <section className='caution-dialog-confirmation-buttons-container'>
          <button className='caution-dialog__confirmation-button' onClick={handleConfirmedDeletionClick}>yes</button>
          <button className='caution-dialog__denial-button' onClick={handleCloseDialogClick}>no</button>
        </section>
    </dialog>
    )
}