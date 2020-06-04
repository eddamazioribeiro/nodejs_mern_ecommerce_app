import React, { useState, useEffect } from 'react';

const Checkbox = ({ categoties, handleFilters }) => {
    const [checked, setChecked] = useState([]);

    const handleToggle = c => () => {
        const currentCategotyId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];

        if (currentCategotyId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategotyId, 1);
        }
        
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    return categoties.map((c, i) => {
        return (
            <li key={i}
                className='list-unstyled'>
                <label
                    className='form-check-label'>
                    <input
                        onChange={handleToggle(c._id)}
                        value={checked.indexOf(c._id === -1)}
                        type='checkbox'
                        className='form-check-input' />
                    {c.name}
                </label>
            </li>
        );
    })
}

export default Checkbox;