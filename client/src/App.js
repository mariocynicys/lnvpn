import {Row, Col, Container} from 'react-bootstrap'
import socketIOClient from "socket.io-client";
import Button from './components/Button'
import {useState} from 'react'
import KeyInput from './components/KeyInput'
import Price from './components/Price';
import CountrySelector from './components/CountrySelector';
import RuntimeSelector from './components/RuntimeSelector';
import InvoiceModal from './components/InvoiceModal';
import  './wireguard.js'
import HeaderInfo from './components/HeaderInfo';
const ENDPOINT = "http://localhost:5001";
const socket = socketIOClient(ENDPOINT);
var keyPair;

function App() {
  const [keyPair, displayNewPair] = useState(window.wireguard.generateKeypair())
  const [priceDollar, updatePrice] =  useState(0.1)
  const [showSpinner, setSpinner] = useState(true)
  const [payment_request, setPaymentrequest] = useState(0) 
  
  
  const updatePaymentrequest = () => {
    socket.on('lnbitsInvoice',invoiceData => {
      setPaymentrequest(invoiceData.payment_request)
      setSpinner(false)
    })
  }
  
  ///////////Change Runtime
  const runtimeSelect = (e) =>{
    updatePrice(e.target.value)
    
  } 
  
  ///////InvoiceModal
  const [visibleInvoiceModal, setShowInvoiceModal] = useState(false);
  const closeInvoiceModal = () => setShowInvoiceModal(false);
  const showInvoiceModal = () => setShowInvoiceModal(true);

 


  return (
    <div>
      <Container className="main-middle">
        <Row>
          <Col>
          <h1>LN ⚡ VPN</h1>
         
          <HeaderInfo/>
          <KeyInput publicKey={keyPair.publicKey} privateKey={keyPair.privateKey} presharedKey={keyPair.presharedKey}/>
          <CountrySelector/>
          <RuntimeSelector onClick={runtimeSelect}/>
          <InvoiceModal show={visibleInvoiceModal} showSpinner={showSpinner} value={payment_request} handleClose={closeInvoiceModal}/>
          <Price dollar={priceDollar}/>
            <div className='buttons'>
              <Button onClick={() => displayNewPair(window.wireguard.generateKeypair)} text="Generate New Key"/>
              <Button onClick={() => {getInvoice(priceDollar);showInvoiceModal();updatePaymentrequest();setSpinner(true)}} text="Get Invoice"/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
  
}
const getInvoice = (price) => {
  socket.emit("getInvoice", (price))
}


const generateRandomKey = () => {
  console.log(keyPair)
  keyPair = window.wireguard.generateKeypair()
  console.log(keyPair)
}

export default App;

