import { useState } from 'react'
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'

function Bill() {
  const [stealthAddress, setStealthAddress] = useState("")
  const [publicAddress, setPublicAddress] = useState({})

  const getVariableHtml = (varName, subscript) =>
    ` <i>(${varName}<sub>${subscript}</sub>)</i>`

  return (
    <>
      <div style={{
        border: '2px solid blue', 
        padding: '10px', 
        color: 'blue',
        overflow: "auto",
        whiteSpace: "nowrap",        
      }} >
        <h2>Bill User Interface</h2>
        Alice's stealth meta address 
        <i> (K<sub>pub</sub>,V<sub>pub</sub>)</i>:
        <input type="text" value={stealthAddress}
          onChange={(e) => setStealthAddress(e.target.value)}
          size="40"
        /> <br /> 
        <br />
        { stealthAddress.length == 132 && (
          <div>

            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthAddress)))
            }}>
              Generate 
              {publicAddress.address && " a new "}
              Address
            </button><p />
            {
              publicAddress.address && (
                <>
                  <b>Address: </b> {publicAddress.address}
                  <br />
                  <b>Bill public key
                    <span dangerouslySetInnerHTML={{__html: getVariableHtml("R", "pub")}} />
                  : </b> {publicAddress.rPub}
                  <br />
                </>
              )
            }
          </div>
        )}
      </div>
    </>
  )
}

export default Bill