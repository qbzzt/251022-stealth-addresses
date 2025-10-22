use wasm_bindgen::prelude::*;
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
use hex::{decode,encode};

#[wasm_bindgen]
pub fn wasm_generate_stealth_meta_address() -> String {
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();

    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}

fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
    // ensure correct length
    if vec.len() != N { return None; }
    // try_into consumes vec and attempts to make [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
    Some(array)
}

#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);

    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}


#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    let private_key =
        compute_stealth_key(
            &str_to_array::<20>(address)?,
            &str_to_array::<33>(bill_pub_key)?,
            &str_to_array::<32>(view_private_key)?,            
            &str_to_array::<32>(spend_private_key)?
        );
    encode(private_key).into()
}

#[wasm_bindgen(start)]
pub fn main() {
    console_error_panic_hook::set_once();
}
