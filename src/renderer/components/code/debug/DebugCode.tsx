const DebugCode = () => {

    const tryParseCode = () => {
        console.log('trying to parse code')
    }

    return (
        <div className='debug'>
            <button onClick={tryParseCode}>Try Parse Code</button>
        </div>
    )
}

export default DebugCode
