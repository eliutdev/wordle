import { useState } from 'react';

const KEYS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
];

export default Keyboard = ({onClick}) => {
    const [keyboard, setKeyboard] = useState(KEYS);
    return (
        <div style={
            {
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                margin: '1rem auto',
            }
        }>
            {keyboard.map((row, rowIndex) => (
                <div key={rowIndex} style={
                    {
                        display: 'grid',
                        gridTemplateColumns: `repeat(${rowIndex == 2 ? 9 : 10}, 1fr)`
                    }
                }>
                    {row.map((key, keyIndex) => (
                        <button onClick={() => onClick(key)} key={keyIndex} style={{
                            textAlign: 'center',
                            margin: '0.33rem',
                            padding: '0.33rem',
                            cursor: 'pointer',
                        }}>
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}