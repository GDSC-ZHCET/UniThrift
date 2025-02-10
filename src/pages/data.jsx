import '../pages/data.css'

function Data (props){
    return(
        <div className='item'>
            <img className='item-image' src ={props.image} alt=""/>
            <p>{props.name}</p>
            <div className="item-price">
        
            <p>{props.price}</p>
            </div>
        </div>
    )



}

export default Data