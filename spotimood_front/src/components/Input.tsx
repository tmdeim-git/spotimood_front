export default function Input() {
    return (
            <div className="card">
                <h2>
                    How is your mood today?
                </h2>
                <label className="input">
                    <input className="input__field" type="text" placeholder=" " />
                </label>
                <div className="button-group">
                    <button>Send</button>
                    <button type="reset">Reset</button>
                </div>
            </div>
    )
}



