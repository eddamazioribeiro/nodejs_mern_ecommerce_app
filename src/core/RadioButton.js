import React, { useState, useEffect, Fragment } from 'react';

const RadioButton = ({prices}) => {
    const [value, setValue] = useState(0);

    const handleChange = () => {

    }

    return prices.map((p, i) => {
        return (
            <div key={i}>
                <label
                    className='form-check-label'>
                    <input
                        name='price'
                        onChange={handleChange}
                        value={`${p._id}`}
                        type='radio'
                        className='mr- ml-4'/>
                    {p.name}
                </label>
            </div>
        );
    });
}

export default RadioButton;