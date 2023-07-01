import { useState } from "react"

export default function DeleteButton({ onDelete }) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    return (
        <div className="d-inline-block">
            <i class="ri-delete-bin-line delete" onClick={() => setShowConfirmDialog(true)}>
            </i >
            {showConfirmDialog && (
                <div className="fixed-top w-100 h-100 d-flex justify-content-center align-items-center"
                style={{left:0,top:0, zIndex:1}}
                >
                    <div className="p-4 bg-white rounded" style={{
                        background: "black",
                        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)"
                    }}>

                        <div className="form-group">
                            {/* <input id="confirm-delete" className="mr-2" type="checkbox" /> */}
                            <label htmlFor="confirm-delete">Are you sure you want to delete this item? </label>
                        </div>
                        <button class="btn btn-secondary btn-sm mx-2" onClick={()=>setShowConfirmDialog(false)}>Cancel</button>
                        <button class="btn btn-danger btn-sm mx-2" onClick={onDelete}>Delete</button>
                    </div>

                </div>
            )}
        </div>

    )

}