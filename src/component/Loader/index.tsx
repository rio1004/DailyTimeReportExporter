import './loader.scss'
type loadProps = {
  bgColor:String
}

const index = (props:loadProps) => {
  console.log(props)
  const styleProps = props.bgColor == 'black' ? 'loader loaderBlack': 'loader loaderWhite'
  return (
    <div className={styleProps}></div>
  )
}

export default index