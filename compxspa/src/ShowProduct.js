const ShowProduct = ({product, onClickHandle}) => {
  console.log("product:", product)
  return (
    <>
    <h4>{product.productionPlanNumber} {product.productionPlanNumber} <button onClick={onClickHandle}>delete</button></h4>
    </>
  )
}

export default ShowProduct