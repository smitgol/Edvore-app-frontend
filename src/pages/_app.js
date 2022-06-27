import '../styles/globals.css'
import {TokenContext} from "../Context/context";

function MyApp({ Component, pageProps }) {
  return (<TokenContext>
    <Component {...pageProps} />
  </TokenContext>)
}

export default MyApp
