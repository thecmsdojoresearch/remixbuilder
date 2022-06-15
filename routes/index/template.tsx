(({ data, store }) => {
    return (
        <div>
            <h1>Version 4</h1>
            <h1>Via Import</h1>
            <h1>This button has been clicked for {store.getCounter()} times in passing store</h1>
            <button onClick={()=> { store.incrementCounter() }}>Click</button>
            <h1>{data.a}</h1>

            <div>
                <h4>Submitted Message: {store.getSubmittedMessage()}</h4>
                <label>Add Message</label>
                <input type = "text" 
                    value = {store.getMessage()} 
                    onChange = {(e) => {store.setMessage(e.target.value) }}
                />
                <button onClick={ ()=> {store.submitMessage()} }>Submit Message</button>
            </div>
        </div>
    );
)();
