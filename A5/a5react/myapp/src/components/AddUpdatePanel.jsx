import React from 'react';

export function AddUpdatePanel({ panelItem, inputChangeHandler, doneClickHandler, resetClickHandler, cancelClickHandler }) {
    if (!panelItem) return null;

    return (
        <div>
            <div className="mb-3">
                <label>ID</label>
                <input
                    type="number"
                    className="form-control"
                    value={panelItem.id}
                    onChange={e => inputChangeHandler('id', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Category</label>
                <input
                    type="text"
                    className="form-control"
                    value={panelItem.category}
                    onChange={e => inputChangeHandler('category', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Description</label>
                <input
                    type="text"
                    className="form-control"
                    value={panelItem.description}
                    onChange={e => inputChangeHandler('description', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Price</label>
                <input
                    type="number"
                    className="form-control"
                    value={panelItem.price}
                    onChange={e => inputChangeHandler('price', e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Vegetarian</label>
                <input
                    type="checkbox"
                    checked={panelItem.vegetarian}
                    onChange={e => inputChangeHandler('vegetarian', e.target.checked)}
                />
            </div>
            <button className="btn btn-primary" onClick={doneClickHandler}>Done</button>
            <button className="btn btn-secondary" onClick={resetClickHandler}>Reset</button>
            <button className="btn btn-danger" onClick={cancelClickHandler}>Cancel</button>
        </div>
    );
}