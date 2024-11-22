import React from 'react';

export function ButtonPanel({ addClickHandler, updateClickHandler, deleteClickHandler, selectedItem }) {
    return (
        <div>
            <button className="btn btn-primary" onClick={addClickHandler}>Add</button>
            <button className="btn btn-warning" onClick={updateClickHandler} disabled={!selectedItem}>Update</button>
            <button className="btn btn-danger" onClick={deleteClickHandler} disabled={!selectedItem}>Delete</button>
        </div>
    );
}