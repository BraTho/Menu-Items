import React from 'react';

export function MenuTable({ menuItems, tableClickHandler, selectedItem }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Vegetarian</th>
                </tr>
            </thead>
            <tbody>
                {menuItems.map(item => (
                    <tr
                        key={item.id}
                        onClick={() => tableClickHandler(item)}
                        className={selectedItem && selectedItem.id === item.id ? 'table-active' : ''}
                    >
                        <td>{item.id}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.vegetarian ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}