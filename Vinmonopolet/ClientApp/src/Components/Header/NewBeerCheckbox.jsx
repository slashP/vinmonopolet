import React from 'react';
import styles from './styles.css';

const NewBeerCheckbox = ( props ) => {
    return (
        <div style={styles.newCheckbox} className="onlynew-container" title="Show only beers on vinmonopolets 'new products'-list." onClick={() => props.onOnlyNew()}>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-50 -50 370 370" enableBackground="new 0 0 300 300" space="preserve">     
                <text  x="15" y="120" fontSize="100" fill="#999">Only</text>
                <text x="23" y="230" fontSize="100" fill="#999">new</text>
                { props.onlyNew &&
                    <g>
                        <path fill="#fff" d="M10 10 L 270 10 L 270 270 L 10 270"/>
                        <path fill="#999" d="M128.775,265.136l146.36-214.392c6.772-9.926,4.215-23.459-5.706-30.236L251.459,8.244
                            c-9.921-6.772-23.464-4.221-30.236,5.706L100.171,191.268l-53.14-37.916c-9.779-6.978-23.366-4.71-30.345,5.075l-12.64,17.71
                            c-6.978,9.779-4.705,23.366,5.075,30.345l89.679,63.985C108.58,277.445,122.004,275.057,128.775,265.136z"/>
                    </g>
                }
            </svg>
        </div>
    )
}

export default NewBeerCheckbox;











