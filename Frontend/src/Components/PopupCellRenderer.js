import {Button} from 'react-bootstrap';
export default function PopupCellRenderer(props) {
    
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    
    const spanClicked = (event) => {
        
        console.log("cellValue : " + cellValue)
    }
    
    return(
    <div>
              <Button style={{diaplay:"none"}} onClick={spanClicked} >{cellValue}</Button>  </div>
    )
    
    
}
