import { useState, useEffect } from 'react'
import ProductPlanInput from "./ProductPlanInput"
import ShowProduct from './ShowProduct'
import Filter from './Filter'
import productService from './services/products'
import Notification from './Notification'

const App = () => {
  const [products, setProduct] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState({text: '', isError: false})

  useEffect(() => {
    productService
      .getAll()
      .then(initialPersons => {
        console.log("product init:", initialPersons)
        setProduct(initialPersons)
        console.log("product init:", products)
      })
  }, []) // Tyhjä taulukko viimeisenä parametrinä merkitsee, että useEffect funktio
  // kutsutaan vain kerran kun komponentti rendereoidaan ensimmäisen kerran.

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChahge = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDeleteClick = (id) => {
    //console.log('Delete: ', id)

    const findResult = products.find(product => product.id === id)
    if (window.confirm(`Delete ${findResult.name} ?`))
    {
      productService
        .deleteProduct(id)
        .then(response => {
          setProduct(products.filter(product => product.id !== id))
          setMessage({text: `${findResult.name} deleted`, isError: false})
          setTimeout(() => {
          setMessage({text: ``, isError: false})
          }, 3000)
        })
        .catch(error => {
          setProduct(products.filter(p => p.id !== findResult.id))
          setMessage({text: `the product ${findResult.name}  was already deleted from server`, isError: true})
          setTimeout(() => {
          setMessage({text: ``, isError: false})
          }, 3000)
        })
    }
  }

  const addNewName = (event) => {
    event.preventDefault()
    const productObject = {
      name: newName,
      number: newNumber
    }

    if (!products.find(element => {
      //console.log("Elemet.name: ", element.name)
      if (element.name === newName){
        if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
          productService
            .update(element.id, productObject)
            .then(returnedProduct => {
              setProduct(products.map(p => p.id !== element.id ? p : returnedProduct))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              setProduct(products.filter(p => p.id !== element.id))
              setMessage({text: `information ${newName} has already deleted from server`, isError: true})
              setTimeout(() => {
                setMessage({text: ``, isError: false})
              }, 3000)
            })
        }
        return true
      }
      else
        return false
    }))
    productService
      .create(productObject)
      .then(returnedProduct => {
        setProduct(products.concat(returnedProduct))
        setNewName('')
        setNewNumber('')
        setMessage({text: `Added ${newName}`, isError: false})
          setTimeout(() => {
          setMessage({text: ``, isError: false})
          }, 3000)
      })
     .catch(error => {
        setMessage({text: error.response.data.error, isError: true})
          console.log('error: ', error.response.data)
          setTimeout(() => {
            setMessage({text: ``, isError: false})
          }, 3000)
      })
  }

  const filttered = (arr, filter) =>{
    if (filter !== '')
      return arr.filter((element) => element.name.toLowerCase().includes(filter.toLowerCase()))
    
    return arr
  }

  return (
    <div>
    <h2>Production line</h2>
    <Notification message={message.text} isError={message.isError} />
    <Filter newFilter={newFilter} handleFilterInputChange={handleFilterInputChange} />
    <ProductPlanInput 
      newName={newName} 
      newNumber={newNumber} 
      handleNameInputChange={handleNameInputChange} 
      handleNumberInputChahge={handleNumberInputChahge} 
      onClickHandle={addNewName}/>
    <h2>Products</h2>
    {filttered(products, newFilter).map(product => 
      <ShowProduct 
        key={product.nameOfTheProduction} 
        product={product}  
        onClickHandle={() => handleDeleteClick(product.productionPlanNumber)}
      />
    )}
  </div>
  )
}

export default App