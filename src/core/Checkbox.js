import React, {useState, useEffect} from 'react';

const Checkbox = ({categoties}) => {
    return categoties.map((c, i) => {
        return(
            <li key={i}
                className='list-unstyled'>
                <label
                    className='form-check-label'>
                    <input
                        type='checkbox'
                        className='form-check-input'/>                    
                    {c.name}
                </label>
            </li>
        );
    })
}

export default Checkbox;