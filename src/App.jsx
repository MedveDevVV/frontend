import {useState} from 'react'
import './App.css'

function App() {
    const API_URL = "http://localhost:8080/api";
    const [text, setText] = useState('')
    const [result, setResult] = useState('')

    const handleSubmit = async () => {
        const response = await fetch(API_URL + '/data', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text}),
        })
        if (response.ok) {
            setText('')
        } else {
            throw new Error(`(${response.status}) Ошибка: ${response.statusText || "Неизвестная ошибка"}`)
        }
    }

    const handleLoad = async () => {
        const response = await fetch(API_URL + '/data', {method: 'GET'})
        if (response.ok) {
            const data = await response.json()
            setResult(data.text)
        }
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={handleSubmit}>Отправить</button>
            </div>
            <div>
                <textarea
                    value={result}
                    readOnly
                />
                <button onClick={handleLoad}>Загрузить</button>
            </div>
        </div>
    )
}

export default App
