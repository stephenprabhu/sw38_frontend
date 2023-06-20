// check decimal then fix 2
// convert yo number
// add commmas

const CommaSeperator = (val) => {
  const myVal = val % 1 !== 0 ? val.toFixed(2) : val
  return myVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}

export default CommaSeperator