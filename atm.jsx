const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3 id="choice"> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input disabled={!isValid} type="submit" width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('');
    const [validTransaction, setValidTransaction] = React.useState(false);
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    
    const handleChange = (event) => {
      if (Number(event.target.value) <= 0) {
        return setValidTransaction(false)
      }
      if (atmMode === "Cash Back" && Number(event.target.value) > totalState){
        setValidTransaction(false)
      } else {
        setValidTransaction(true)
      }
      console.log(`handleChange ${event.target.value}`);
      setDeposit(Number(event.target.value));
    };
   
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
      console.log(event.target.value);
      setAtmMode(event.target.value);
      if (event.target.value === "Deposit") {
        setIsDeposit(true);
      } 
      if (event.target.value === "Cash Back" || event.target.value === "null") {
        setIsDeposit(false);
      }
    };
  
    return (
      
        <form onSubmit={handleSubmit}>
            <container className="form">
                <h2 className="total" id="total">{status}</h2>
                <h3 className="label">Select an action below to continue</h3>
                <select className="select" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
                    <option id="no-selection" value=""></option>
                    <option id="deposit-selection" value="Deposit">Deposit</option>
                    <option id="cashback-selection" value="Cash Back">Cash Back</option>
                </select>
        
            {atmMode && (
        <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        )}
            </container>
        </form>
    );
  };
  
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  