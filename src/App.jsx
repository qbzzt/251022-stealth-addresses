import { useEffect, useState } from 'react'
import init from './rust-wasm/pkg/rust_wasm.js'
import Alice from './Alice.jsx'
import Bill from './Bill.jsx'

function App() {
  const [wasmReady, setWasmReady] = useState(false)


  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )

  return (
    <>
      { wasmReady && (
        <>
          <Alice />
          <br />
          <Bill />
        </>
      )}
    </>
  )
}

export default App
