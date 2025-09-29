import React, { useState } from "react";
import { Button , Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavbarText, NavItem, Input, ToastBody, ToastHeader, InputGroupText, Toast, CardBody, Card, CardTitle , CardSubtitle, CardText,CardFooter, CardHeader, Row, Col,Modal, ModalHeader, ModalFooter,  ModalBody, InputGroup, ListGroup, ListGroupItem, Form, Label
    } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , ButtonDropdown} from 'reactstrap';
import {Tabs, Tab, Spinner, Overlay, Popover, PopoverBody, PopoverHeader, OverlayTrigger} from 'react-bootstrap';

import { FcViewDetails, FcFullTrash, FcUpload, FcDownload, FcApproval} from "react-icons/fc";
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import excel from 'xlsx';
import logo from "../img/logo.png";
import axiosInstance from "../Axios";
import Iframe from 'react-iframe'
import Cookies from "js-cookie";
import axios from 'axios';
import export_import from "../img/export_import.PNG";
import menu from "../img/menu.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Fab from '@mui/material/Fab';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import thumbnail_QoC from "../img/thumbnail_QoC.png";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import UpdateIcon from '@mui/icons-material/Update';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Grid, GridOptions, ICellRendererParams } from 'ag-grid-community';
//import { ModuleRegistry } from '@ag-grid-community/core';
//import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
//import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
//import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
//import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { columnDefshisto_2G_ini, columnDefshisto_3G  , columnDefshisto_4G, columnDefshisto_gen_4G, columnDefshisto_eran, columnDefshisto_licence_site, columnDefshisto_mimo, columnDefshisto_5G, columnDefshisto_synthese, columnDefshisto_synthese_tdd, columnDefshisto_5G_tdd, columnDefshisto_Site_tdd, columnDefshisto_alarm_huw, columnDefshisto_gen_4G_huw, columnDefshisto_licence_huw, frameworkComponents_2, columnDefshisto_gen_5G_huw, columnDefshisto_gen_2G_huw, columnDefshisto_gen_3G_huw, columnDefshisto_configuration_software} from "./Constants"
//import PopupCellRenderer from "./PopupCellRenderer"

import { Site_TDD_default, FiveG_TDD_default, Alarm_HUW_default, Licence_HUW_default, FiveG_HUW_default, FourG_HUW_default, TwoG_HUW_default , ThreeG_HUW_default, Mimo_ERC_default, ERAN_ERC_default, FiveG_ERC_default, FourGen_ERC_default, FourG_ERC_default, ThreeG_ERC_default, TwoG_default, Licence_ERC_default} from "./Constants"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';

import AddBoxIcon from '@mui/icons-material/AddBox';
//import CustomLoadingCellRenderer from './customLoadingCellRenderer';
import { Search } from 'semantic-ui-react'









function ContentRender(props) {
    
    const [hide, sethide] = React.useState(false)
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;
    const [data_powerget, setdata_powerget] = React.useState([]);
    const [data_powersent, setdata_powersent] = React.useState([]);
    const [data, setdata] = React.useState([]);
    const [open7,setOpen7] = React.useState(false);
    
    
    
    const HandleRRU = (event) =>{
        
        setOpen7(false)
        for (const el of Object.keys(data_powerget[0])){
            console.log(el)
           if(!Object.keys(data_powersent).includes(el)){
               data_powersent[el] = data_powerget[0][el]
           }
        }
        
        
        console.log(data_powersent)
        
            
        axiosInstance
      .post('/api_qoc/HandleRRU/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            powersent : data_powersent,
            Utilisateur : "admin"
            
      }
    ).then((response) => {
           console.log(response.data)
            if(response.data['code'] == 200){
                console.log(response.data['data_RRU'])
                setdata_powerget(response.data['data_RRU'])
                setdata(response.data['histo'])
                
            }else{
                
                setdata_powerget([])
                setdata([])
                
            }
            
            console.log(response.data['data_RRU'])

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        setdata_powerget([])});
        
        
        
        
    }

    
    const buttonClicked = (event) => {
        console.log("cellValue : " + cellValue)
        console.log(JSON.parse(JSON.stringify(props.data)))
        
        
        axiosInstance
      .post('/api_qoc/HandleRRUGet/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            id : cellValue 
            
      }
    ).then((response) => {
           console.log(response.data)
            if(response.data['code'] == 200){
                console.log(response.data['data_RRU'])
                setdata_powerget(response.data['data_RRU'])
                setOpen7(true)
            }else{
                
                setdata_powerget([])
                setOpen7(true)
            }
            
            console.log(response.data['data_RRU'])

    })
      .catch((error) => {console.log(error)
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }});
        setdata_powerget([])
        
    
         
   }
   return (
       
       <div>
       <span>
             {hide ? <span style={{diaplay:"none"}}>{cellValue}</span> : null}
          <Button onClick={buttonClicked} style={{background: "#3b5998", color: "#fff", marginTop: "2%",}}><EditIcon /></Button></span>
   
              
              
              <Dialog
        open={open7}
        fullWidth = {true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>Nouvelle Configuration RRU</h5>
           <Form>
        <FormGroup>
          <Label for="RRU">RRU</Label>
          <Input  name="RRU"  defaultValue= {JSON.parse(JSON.stringify(props.data))["RRU"]} placeholder="RRU" onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}/>
        </FormGroup>

         <FormGroup>
          <Label for="exampleSelect">Constructeur</Label>
          <Input type="select" name="Constructeur" defaultValue= {JSON.parse(JSON.stringify(props.data))["Constructeur"]} id="exampleSelect"  onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}>
            <option></option>
            <option>Ericsson</option>
            <option>Huawei</option>
            
          </Input>
        </FormGroup>
        
        <FormGroup>
          <Label for="exampleSelect">Techno</Label>
          <Input type="select" name="Techno" id="exampleSelect" defaultValue= {JSON.parse(JSON.stringify(props.data))["Techno"]} onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}>
            <option></option>
            <option>2G</option>
            <option>3G</option>
            <option>4G</option>
            <option>5G</option>
          </Input>
        </FormGroup>


     <FormGroup>
          <Label for="exampleSelect">Bande</Label>
          <Input type="select" name="Bande" id="exampleSelect" defaultValue= {JSON.parse(JSON.stringify(props.data))["Bande"]} onChange = {(event) =>{ console.log(event.target.name); 
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}>
            <option></option>
            <option>700</option>
            <option>800</option>
            <option>900</option>
            <option>1800</option>
            <option>2100</option>
            <option>2600</option>
            <option>3500</option>
          </Input>
        </FormGroup>
    <FormGroup>
          <Label for="exampleSelect">Zone</Label>
          <Input type="select" name="Zone" id="exampleSelect" defaultValue= {JSON.parse(JSON.stringify(props.data))["Zone"]} onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}>
            <option></option>
            <option>ZTD</option>
            <option>CRZ</option>
            
          </Input>
        </FormGroup>
      <FormGroup>
          <Label for="exampleSelect">MIMO</Label>
          <Input type="select" name="MIMO" id="exampleSelect" defaultValue= {JSON.parse(JSON.stringify(props.data))["MIMO"]} onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}> 
            <option></option>
            <option>4T</option>
            <option>2T</option>
           <option>1T</option>
            
          </Input>
        </FormGroup>
        
       <FormGroup>
          <Label for="Valeur">Valeur</Label>
          <Input  name="Valeur"  placeholder="Valeur" defaultValue= {JSON.parse(JSON.stringify(props.data))["Valuer"]} onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}/>
        </FormGroup>

   <FormGroup>
          <Label for="BandWidth">BandWidth</Label>
          <Input  name="BandWidth"  placeholder="BandWidth" defaultValue= {JSON.parse(JSON.stringify(props.data))["BandWidth"]} onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}/>
        </FormGroup>
       
      </Form>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
           <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {HandleRRU}>
    Enregister
  </Button>
                <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {(event) =>{setOpen7(false);}}>
    Fermer
  </Button>
        </DialogActions>
      </Dialog>


</div>
);
}


export default function MainPage() {
    
    const [files_list, setFiles_2] = React.useState([]);
    const [files_list_3, setFiles_3] = React.useState([]);
    const [files_list_zip, setFiles_zip] = React.useState([]);
   const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);
    const [open6,setOpen6] = React.useState(false);
    const [open7,setOpen7] = React.useState(false);
    const [open8,setOpen8] = React.useState(false);
    const [open15,setOpen15] = React.useState(false);
    const [Message,setMessage] = React.useState(false);
    const [subparametre, setsubparametre] = React.useState('Sous-Paramètre');
    const [Parameter, setParameter] = React.useState('Paramètre');
    const [Paramter_value, setParamter_value] = React.useState([]);
    const [Soft, setSoft] = React.useState('');
    const [dropdownOpen, setdropdownOpen] = React.useState(false);
    const [dropdownOpen1, setdropdownOpen1] = React.useState(false);
    const [data, setdata] = React.useState([]);
    const [data_licence, setdata_licence] = React.useState([]);
    const [data_power, setdata_power] = React.useState([]);
    const [data_powersent, setdata_powersent] = React.useState({});
    const [data_powerget, setdata_powerget] = React.useState([]);
    const [value_Programme, setValue] = React.useState('');
    const [files, setFiles] = React.useState([]);
    const [data_2G, setdata_2G] = React.useState([]);
    const [data_3G, setdata_3G] = React.useState([]);
    const [data_4G, setdata_4G] = React.useState([]);
    const [data_5G_tdd, setdata_5G_tdd] = React.useState([]);
    const [data_licence_site, setdata_licence_site] = React.useState([]);
    const [data_gen_4G, setdata_gen_4G] = React.useState([]);
    const [data_eran, setdata_eran] = React.useState([]);
    const [data_mimo, setdata_mimo] = React.useState([]);
    const [show_program, setshow_program] = React.useState(true);
    const [data_licence_site_huw, setdata_licence_site_huw] = React.useState([]);
    const [data_gen_4G_huw, setdata_gen_4G_huw] = React.useState([]);
    const [data_gen_2G_huw, setdata_gen_2G_huw] = React.useState([]);
    const [data_gen_3G_huw, setdata_gen_3G_huw] = React.useState([]);
    const [data_alarm_huw, setdata_alarm_huw] = React.useState([]);
    const [data_synthese, setdata_synthese] = React.useState([]);
    const [data_synthese_abs, setdata_synthese_abs] = React.useState([]);
    const [data_synthese_tdd, setdata_synthese_tdd] = React.useState([]);
    const [data_site_tdd, setdata_site_tdd] = React.useState([]);
    const [data_5G, setdata_5G] = React.useState([]);
    const [data_synthese_tdd_abs, setdata_synthese_tdd_abs] = React.useState([]);
    const [data_site_tdd_abs, setdata_site_tdd_abs] = React.useState([]);
    const [data_5G_abs, setdata_5G_abs] = React.useState([]);
    const [show, setshow] = React.useState(false);
    const[selectdelete , setselectdelete] = React.useState([]);
    const[MessageExc , setMessageExc] = React.useState("");
    const[TitleExc , setTitleExc] = React.useState("");
    const [showtoast, setshowtoast] = React.useState(false);
    const [cellcliked, setcellcliked] = React.useState("");
    //const [quickFilterText , onQuickFilterText] = React.useState({});
    const [gridApi, setGridApi] = React.useState(null);
    const [gridColumnApi, setgridColumnApi] = React.useState(null);
    const [data_2G_abs, setdata_2G_abs] = React.useState([]);
    const [data_3G_abs, setdata_3G_abs] = React.useState([]);
    const [data_4G_abs, setdata_4G_abs] = React.useState([]);
    const [data_5G_tdd_abs, setdata_5G_tdd_abs] = React.useState([]);
    const [data_licence_site_abs, setdata_licence_site_abs] = React.useState([]);
    const [data_gen_4G_abs, setdata_gen_4G_abs] = React.useState([]);
    const [data_eran_abs, setdata_eran_abs] = React.useState([]);
    const [data_mimo_abs, setdata_mimo_abs] = React.useState([]);
    const [show_program_abs, setshow_program_abs] = React.useState(true);
    const [data_licence_site_huw_abs, setdata_licence_site_huw_abs] = React.useState([]);
    const [data_gen_4G_huw_abs, setdata_gen_4G_huw_abs] = React.useState([]);
    const [data_alarm_huw_abs, setdata_alarm_huw_abs] = React.useState([]);
    const [data_gen_5G_huw, setdata_gen_5G_huw] = React.useState([]);
    const [data_gen_5G_huw_abs, setdata_gen_5G_huw_abs] = React.useState([]);
    const [data_gen_2G_huw_abs, setdata_gen_2G_huw_abs] = React.useState([]);
    const [data_gen_3G_huw_abs, setdata_gen_3G_huw_abs] = React.useState([]);
    const [data_soft, setdata_soft] = React.useState([]);
    //const [statecolumnG, setStatecolumnG] = React.useState({})
    const [columnDefshisto_2G, setcolumnDefshisto_2G]  = React.useState([])
    const [columnDefshisto_3G, setcolumnDefshisto_3G]  = React.useState([])
    const [columnDefshisto_4G, setcolumnDefshisto_4G]  = React.useState([])
    const [columnDefshisto_gen_4G, setcolumnDefshisto_gen_4G]  = React.useState([])
    const [columnDefshisto_eran, setcolumnDefshisto_eran]  = React.useState([])
    const [columnDefshisto_licence_site, setcolumnDefshisto_licence_site]  = React.useState([])
    const [columnDefshisto_mimo, setcolumnDefshisto_mimo]  = React.useState([])
    const [columnDefshisto_5G, setcolumnDefshisto_5G]  = React.useState([])
    const [columnDefshisto_5G_tdd, setcolumnDefshisto_5G_tdd]  = React.useState([])
    const [columnDefshisto_Site_tdd, setcolumnDefshisto_Site_tdd]  = React.useState([])
    const [columnDefshisto_alarm_huw, setcolumnDefshisto_alarm_huw]  = React.useState([])
    const [columnDefshisto_gen_4G_huw, setcolumnDefshisto_gen_4G_huw]  = React.useState([])
    const [columnDefshisto_licence_huw, setcolumnDefshisto_licence_huw]  = React.useState([])
    const [columnDefshisto_gen_5G_huw, setcolumnDefshisto_gen_5G_huw]  = React.useState([])
    const [columnDefshisto_gen_2G_huw, setcolumnDefshisto_gen_2G_huw]  = React.useState([])
    const [columnDefshisto_gen_3G_huw, setcolumnDefshisto_gen_3G_huw]  = React.useState([])
    const [statecolumn, setStatecolumn] = React.useState({});
    const [statecolumn_3GERC, setStatecolumn_3GERC] = React.useState({});
    const [statecolumn_4GERC, setStatecolumn_4GERC] = React.useState({});
    const [statecolumn_5GERC, setStatecolumn_5GERC] = React.useState({});
    const [statecolumn_EranERC, setStatecolumn_EranERC] = React.useState({});
    const [statecolumn_MimoERC, setStatecolumn_MimoERC] = React.useState({});
    const [statecolumn_4GgenERC, setStatecolumn_4GgenERC] = React.useState({});
    const [statecolumn_LicenceERC, setStatecolumn_LicenceERC] = React.useState({});
    const [statecolumn_2GHUW, setStatecolumn_2GHUW] = React.useState({});
    const [statecolumn_3GHUW, setStatecolumn_3GHUW] = React.useState({});
    const [statecolumn_4GHUW, setStatecolumn_4GHUW] = React.useState({});
    const [statecolumn_5GHUW, setStatecolumn_5GHUW] = React.useState({});
    const [statecolumn_5GTDD, setStatecolumn_5GTDD] = React.useState({});
    const [statecolumn_SiteTDD, setStatecolumn_SiteTDD] = React.useState({});
    const [statecolumn_LicenceHUW, setStatecolumn_LicenceHUW] = React.useState({});
    const [statecolumn_AlarmHUW, setStatecolumn_AlarmHUW] = React.useState({});
    
    

    
    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        sortable: true,
        resizable: true,
        floatingFilter: true,
        menuTabs: ['filterMenuTab'],
      };
    
    
    const gridOptions = {
        sideBar : true,
        defaultColDef : defaultColDef,
    
    }
    //const columnDefshisto_2G = gridOptions.api.getColumnDefs();
    
    
    
    
    const HandleColumnTable_2G_ERC = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_2G_ERC/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
             setStatecolumn(dict_column)
             //console.log(dict_column)
        //gridOptions.api.setColumnDefs(values);
            setcolumnDefshisto_2G(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
    
     const HandleColumnTable_3G_ERC = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_3G_ERC/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
             setStatecolumn_3GERC(dict_column)
        
             setcolumnDefshisto_3G(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
     
     
      const HandleColumnTable_4G_ERC = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_4G_ERC/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_4GERC(dict_column)
        setcolumnDefshisto_4G(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
      
      
      const HandleColumnTable_5G_ERC = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_5G_ERC/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_5GERC(dict_column)
        setcolumnDefshisto_5G(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
      const HandleColumnTable_LicenceERC = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_LicenceERC/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_LicenceERC(dict_column)
        setcolumnDefshisto_licence_site(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
      
      const HandleColumnTable_Eran_ERC = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_Eran_ERC/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_EranERC(dict_column)
        setcolumnDefshisto_eran(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
      
      
      const HandleColumnTable_MimoERC = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_MimoERC/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_MimoERC(dict_column)
        setcolumnDefshisto_mimo(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
      
      const HandleColumnTable_4GgenERC = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_4GgenERC/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_4GgenERC(dict_column)
        setcolumnDefshisto_gen_4G(values_1) 
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
      
      const HandleColumnTable_SiteTDD = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_SiteTDD/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_SiteTDD(dict_column)
        setcolumnDefshisto_Site_tdd(values_1) 
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
      
      const HandleColumnTable_5GTDD = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_5GTDD/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_5GTDD(dict_column)
        setcolumnDefshisto_5G_tdd(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
      
      const HandleColumnTable_2G_HUW = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_2G_HUW/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_2GHUW(dict_column)
        setcolumnDefshisto_gen_2G_huw(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
      
      const HandleColumnTable_4G_HUW = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_4G_HUW/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_4GHUW(dict_column)
        setcolumnDefshisto_gen_4G_huw(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
      
      const HandleColumnTable_3G_HUW = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_3G_HUW/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_3GHUW(dict_column)
        setcolumnDefshisto_gen_3G_huw(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
      const HandleColumnTable_5G_HUW = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_5G_HUW/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_5GHUW(dict_column)
        setcolumnDefshisto_gen_5G_huw(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
      
      const HandleColumnTable_AlarmHUW = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_AlarmHUW/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_AlarmHUW(dict_column)
        setcolumnDefshisto_alarm_huw(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
      
      const HandleColumnTable_LicenceHUW = async () => {
    
    axiosInstance
      .post('/api_qoc/HandleColumnTable_LicenceHUW/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data['table_conf'])
            
             let tableconf = response.data['table_conf']
             const values_1 = [];
     
        
            let dict_column = {}
             for (const el of response.data['table_conf']){
                if (el['column_state'] == 'False'){
                
                    dict_column[el['column_name']] = false
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true,  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                        
                    }else{
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)  , field :  el['column_name']   , filter :  'agTextColumnFilter', hide: true})
                    }
                    
                }else if (el['column_state'] == 'True'){
                    
                    dict_column[el['column_name']] = true
                    if (el['column_name'].includes('check') || el['column_name'].includes('Check')){
                        values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter',  cellStyle: params => {
                if (params.value === 'OK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#9FE2BF'};
                }else if (params.value === 'NOK') {
                    //mark police cells as #FF7F50
                    return { backgroundColor: '#FF7F50'};
                }else{
                    return { backgroundColor: '#B2BABB '};
                }
                return null;
            }})
                    }else{
                    
                    values_1.push({headerName :  el['column_name'].charAt(0).toUpperCase() + el['column_name'].slice(1)   , field :  el['column_name']   , filter :  'agTextColumnFilter'})
                    }
                    
                }
             }
             
        
        setStatecolumn_LicenceHUW(dict_column)
        setcolumnDefshisto_licence_huw(values_1)
          

         

    })
      .catch((error) => {console.log(error)
                        
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        
        });
        
        
    
    }
    
    
    
    const handlecolumn = (event) => {
    setStatecolumn({
      ...statecolumn,
      [event.target.name]: event.target.checked,
    });
        
        console.log(statecolumn)
  };
    
     const handlecolumn_2GHUW = (event) => {
    setStatecolumn_2GHUW({
      ...statecolumn_2GHUW,
      [event.target.name]: event.target.checked,
    });
        
        console.log(statecolumn)
  };
    
    const handlecolumn_3GERC = (event) => {
    setStatecolumn_3GERC({
      ...statecolumn_3GERC,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_4GERC = (event) => {
    setStatecolumn_4GERC({
      ...statecolumn_4GERC,
      [event.target.name]: event.target.checked,
    });
  };
   
    const handlecolumn_5GERC = (event) => {
    setStatecolumn_5GERC({
      ...statecolumn_5GERC,
      [event.target.name]: event.target.checked,
    });
  };
    
     const handlecolumn_5GTDD = (event) => {
    setStatecolumn_5GTDD({
      ...statecolumn_5GTDD,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_SiteTDD = (event) => {
    setStatecolumn_SiteTDD({
      ...statecolumn_SiteTDD,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_3GHUW = (event) => {
    setStatecolumn_3GHUW({
      ...statecolumn_3GHUW,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_4GHUW = (event) => {
    setStatecolumn_4GHUW({
      ...statecolumn_4GHUW,
      [event.target.name]: event.target.checked,
    });
  };
   
    const handlecolumn_5GHUW = (event) => {
    setStatecolumn_5GHUW({
      ...statecolumn_5GHUW,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_MimoERC = (event) => {
    setStatecolumn_MimoERC({
      ...statecolumn_MimoERC,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_EranERC = (event) => {
    setStatecolumn_EranERC({
      ...statecolumn_EranERC,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_LicenceERC = (event) => {
    setStatecolumn_LicenceERC({
      ...statecolumn_LicenceERC,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_LicenceHUW = (event) => {
    setStatecolumn_LicenceHUW({
      ...statecolumn_LicenceHUW,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_AlarmHUW = (event) => {
    setStatecolumn_AlarmHUW({
      ...statecolumn_AlarmHUW,
      [event.target.name]: event.target.checked,
    });
  };
    
    const handlecolumn_4GgenERC = (event) => {
    setStatecolumn_4GgenERC({
      ...statecolumn_4GgenERC,
      [event.target.name]: event.target.checked,
    });
  };
    const HandletabConfig = (event) =>{
        let all_table = {}
        all_table['Table_2G_ERC'] = statecolumn
        all_table['Table_3G_ERC'] = statecolumn_3GERC
        all_table['Table_4G_ERC'] = statecolumn_4GERC
        all_table['Table_5G_ERC'] = statecolumn_5GERC
        all_table['Table_Eran_ERC'] = statecolumn_EranERC
        all_table['Table_LicenceERC'] = statecolumn_LicenceERC
        all_table['Table_MimoERC'] = statecolumn_MimoERC
        all_table['Table_4GgenERC'] = statecolumn_4GgenERC
        all_table['Table_2G_HUW'] = statecolumn_2GHUW
        all_table['Table_3G_HUW'] = statecolumn_3GHUW
        all_table['Table_4G_HUW'] = statecolumn_4GHUW
        all_table['Table_5G_HUW'] = statecolumn_5GHUW
        all_table['Table_LicenceHUW'] = statecolumn_LicenceHUW
        all_table['Table_AlarmHUW'] = statecolumn_AlarmHUW
        all_table['Table_5GTDD'] = statecolumn_5GTDD
        all_table['Table_SiteTDD'] = statecolumn_SiteTDD
        setOpen2(true)
        setTitleExc("Import Table Configuration ")
        setMessageExc("Veuillez attendre la fin d'import")
         axiosInstance.post('/api_qoc/HandleColumnfilter/',
                     { headers: {
                       "Content-Type": "application/json",
                       }, 
                     Frontend_modif : all_table ,
                    }).then((response) => {
             HandleColumnTable_2G_ERC()
   HandleColumnTable_3G_ERC()
    HandleColumnTable_4G_ERC()
    HandleColumnTable_5G_ERC()
    HandleColumnTable_Eran_ERC()
    HandleColumnTable_LicenceERC()
    HandleColumnTable_4GgenERC()
    HandleColumnTable_MimoERC()
    HandleColumnTable_5GTDD()
   HandleColumnTable_SiteTDD()
    HandleColumnTable_2G_HUW()
    HandleColumnTable_3G_HUW()
    HandleColumnTable_4G_HUW()
    HandleColumnTable_5G_HUW()
    HandleColumnTable_AlarmHUW()
    HandleColumnTable_LicenceHUW()
             setMessage('Import table Configuration Done !')
         setOpen2(false)
         
            setOpen6(true)
             window.location.href = '/'
         })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                      setStatecolumn(TwoG_default)   
                setMessage('Import table Configuration Fail !')
         setOpen2(false)
         
            setOpen6(true)
                        
                
                        })
    
             }
   
    
    
    

    const toggleshowtoast = () =>{
        setshowtoast(false)
    }
    const toggle = () =>{
        setdropdownOpen(!dropdownOpen)
    }
    const toggle1 = () =>{
        setdropdownOpen1(!dropdownOpen1)
    }
    const [btnDropright, setbtnDropright] = React.useState(false);
    
    const [BaseBandConf, setBaseBandConf] = React.useState({});
    
    
    const handledownloadModel = async () => {
    console.log("button template clicked");
    let domain = window.location.hostname;
    //let url = 'http://' + domain +':3015'+'/templates/template_advnetcheck.xlsx'
    const link = document.createElement('a');
    console.log("domain : "+ domain)
    link.href = "../templates/RRU_ERC_Features.csv";
    //link.href = url
    link.setAttribute('download', 'import_RRU_ERC_Features.csv');
    console.log(link.href);
    document.body.appendChild(link);
    link.click(); 
  }
   
    const onGridReady = params => {
    setGridApi(params.api);
    setgridColumnApi(params.columnApi);
    
}
      
    const Parametre_detail = {
        'BaseBand' : ['BB6641', 'BB6648', 'BB6630', 'BB5216', 'BB5212'],
         'Alarm': ["Pas d' info", "Pas d' info"], 
        'transmissionMode': ["Pas d' info", "Pas d' info"], 
        'EUtranFreqRelation' : ["Pas d' info", "Pas d' info"] 
    }
    const [Site, setSite] = React.useState("");
    
    const [programme, setprogramme] = React.useState({
    "BOLT ZTD": false,
    "BOLT CRZ": false,
    "Ambition Mobile ZTD": false,
    "Ambition Mobile CRZ": false,
    "DI ZTD": false,
    "DI CRZ": false,
    "TDD CRZ": false,
    "TDD ZTD": false,
    "Vercors": false

  });
    
    const [state, setState] = React.useState({
    "Information MiMO/Handover/Performance": false,
    "Information Licence/Alarms/NGS": false,
    "Comparaison Conf vs Avatar 4G": false,
    "Comparaison Conf vs Avatar 5G": false,
    "Information ERAN": false,
    "Infos Général 4G": false
  });
    
    
     

    
    
    
    
    const columnDefs = [{
      headerName: "Features", field: "features" ,filter: 'agTextColumnFilter'
      }, {
        headerName: "Description", field: "description" , filter: 'agTextColumnFilter'
      }]
    
     const columnDefsPower = [
         {
        headerName: "ID", field: "id" , filter: 'agTextColumnFilter', checkboxSelection: true
      },{
      headerName: "RRU", field: "rru" ,filter: 'agTextColumnFilter'
      }, {
        headerName: "Constructeur", field: "constructeur" , filter: 'agTextColumnFilter'
      }, {
        headerName: "Techno", field: "techno" , filter: 'agTextColumnFilter'
      },{
        headerName: "Bande", field: "bande" , filter: 'agTextColumnFilter'
      }, {
        headerName: "Zone", field: "zone" , filter: 'agTextColumnFilter'
      }, {headerName: "MIMO", field: "mimo" ,filter: 'agTextColumnFilter'
      },{
        headerName: "Valeur", field: "valeur" , filter: 'agTextColumnFilter'
      },{
        headerName: "BandWidth", field: "bandwidth" , filter: 'agTextColumnFilter'
      }, {
        headerName: " ", field: "id" , cellRenderer: 'ContentRender'
      }]
     
    
    
     const frameworkComponents = {
        ContentRender: ContentRender,

      };
    
  const columnDefshisto = [{
      headerName: "Date Modification", field: "date_modification" ,filter: 'agTextColumnFilter'
      }, {
        headerName: "Utilisateur", field: "utilisateur" , filter: 'agTextColumnFilter'
      },{
      headerName: "Nom Parametre", field: "nom_parametre" ,filter: 'agTextColumnFilter'
      },
                          {
      headerName: "Sous Parametre", field: "sous_parametre" ,filter: 'agTextColumnFilter'
      },
        {
      headerName: "Parametre Evalué", field: "nom_parametre_evalue" ,filter: 'agTextColumnFilter'
      },
        {
      headerName: "Valleur Avant", field: "valeur_avant" ,filter: 'agTextColumnFilter'
      },
        {
      headerName: "Valeur Après", field: "Valeur_Apres" ,filter: 'agTextColumnFilter'
      }]
    
 
  
   const HandleAddSoftware =(event) =>{
        
      setBaseBandConf({
      ...BaseBandConf,
      [Parameter+"_"+subparametre]:  Soft,
    });
         //BaseBandConf[BaseBand] = Soft
        //console.log(BaseBandConf)
    }
   
   const GetTable_2G_ERC = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_2G_ERC/',
                     { headers: {
                       
                       }}).then((response) => {

            if(response.data['code'] == 200){
                console.log(response.data['table_2G'])
                
                setdata_2G(response.data['table_2G'])
                
                setdata_2G_abs(response.data['table_2G'])
                
          
      
            }else{
                
                setdata_2G([])
               
                setdata_2G_abs([])
               
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                setdata_2G([])
                
       
                setdata_2G_abs([])
               
    }
            ) }
    
    
 const GetTable_3G_ERC = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_3G_ERC/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
       
           
            if(response.data['code'] == 200){
                
                setdata_3G(response.data['table_3G'])
                
            
                setdata_3G_abs(response.data['table_3G'])
                
          
      
            }else{
                
                
                setdata_3G([])
                setdata_3G_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
              
                setdata_3G([])
               
                setdata_3G_abs([])
               
    }
             )}
    
    
    
    
const GetTable_4G_ERC = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_4G_ERC/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
           
            if(response.data['code'] == 200){
                
                
                setdata_4G(response.data['table_4G'])
                setdata_4G_abs(response.data['table_4G'])
                
      
            }else{
                
                setdata_4G([])
                setdata_4G_abs([])
               
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                
                setdata_4G([])
                setdata_4G_abs([])
                
    }
    )}
    
    
    
    const GetTable_5G_ERC = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_5G_ERC/',
                     { headers: {
                       
                       }}).then((response) => {
           
            if(response.data['code'] == 200){
                
                
                setdata_5G(response.data['table_5G'])
                setdata_5G_abs(response.data['table_5G'])

            }else{
                
             
                setdata_5G([])
                setdata_5G_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                
                setdata_5G([])
                setdata_5G_abs([])
               
    })}
    
    
    
const GetTable_Licence_ERC = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_Licence_ERC/',
                     { headers: {
                       
                       }}).then((response) => {
        
           
            if(response.data['code'] == 200){
                
                
                setdata_licence_site(response.data['table_licence'])
                setdata_licence_site_abs(response.data['table_licence'])
                
          
      
            }else{
                
                
                setdata_licence_site([])
                setdata_licence_site_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
     
                setdata_licence_site([])
                
                setdata_licence_site_abs([])
                
    }
    
    )}
    
    const GetTable_Synthese_Site = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_Synthese_Site/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
       
            if(response.data['code'] == 200){
                
                
                setdata_synthese(response.data['table_synthese'])
                setdata_synthese_abs(response.data['table_synthese'])
                
          
      
            }else{
                
                
                setdata_synthese([])
                setdata_synthese_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }       
                
                setdata_synthese([])
                setdata_synthese_abs([])
                
    }
    )}
    
    
    const GetTable_gen_4G_ERC = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_gen_4G_ERC/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
           
            if(response.data['code'] == 200){
                
               
                setdata_gen_4G(response.data['table_gen_4G'])
                
                setdata_gen_4G_abs(response.data['table_gen_4G'])
                
          
      
            }else{
                
               
                setdata_gen_4G([])
               
                setdata_gen_4G_abs([])
               
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
              
                setdata_gen_4G([])
                
                setdata_gen_4G_abs([])
                
    }
    
    )}
    
    const GetTable_Eran = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_Eran/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
        
            if(response.data['code'] == 200){
                
                
                setdata_eran(response.data['table_eran'])
                
                setdata_eran_abs(response.data['table_eran'])
                
          
      
            }else{
                
               
                setdata_eran([])
                
                setdata_eran_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                
                setdata_eran([])
                
                setdata_eran_abs([])
               
    }
    
    )}
    
    
    const GetTable_Synthese_Site_tdd = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_Synthese_Site_tdd/',
                     { headers: {
                       
                       }}).then((response) => {
        
           
            if(response.data['code'] == 200){
                
                setdata_synthese_tdd(response.data['table_synthese_tdd'])
 
                setdata_synthese_tdd_abs(response.data['table_synthese_tdd'])
             
      
            }else{
                
                
                setdata_synthese_tdd([])
               
                setdata_synthese_tdd_abs([])
               
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                
                setdata_synthese_tdd([])
                
                setdata_synthese_tdd_abs([])
              
    }
    
    
    )}
 const GetTable_Site_Tdd = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_Site_Tdd/',
                     { headers: {
                       
                       }}).then((response) => {
           
            if(response.data['code'] == 200){
                
                
                setdata_site_tdd(response.data['table_site_tdd'])
              
                setdata_site_tdd_abs(response.data['table_site_tdd'])
               
          
      
            }else{
                
                
                setdata_site_tdd([])
               
                setdata_site_tdd_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                
                setdata_site_tdd([])
                
                setdata_site_tdd_abs([])
                
    }
    
    )}
    
const GetTable_5G_tdd = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_5G_tdd/',
                     { headers: {
                       
                       }}).then((response) => {
        
           
            if(response.data['code'] == 200){
                
              
                setdata_5G_tdd(response.data['table_5G_tdd'])
                
                setdata_5G_tdd_abs(response.data['table_5G_tdd'])
                
          
      
            }else{
                
                
                setdata_5G_tdd([])
              
                setdata_5G_tdd_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
               
                setdata_5G_tdd([])
               
                setdata_5G_tdd_abs([])
               
    }
    
    
    )}
    
 const GetTable_Licence_4G_huw = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_Licence_4G_huw/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
        
           
            if(response.data['code'] == 200){
                
                
                setdata_licence_site_huw(response.data['table_licence_huw'])
                
                setdata_licence_site_huw_abs(response.data['table_licence_huw'])
                
          
      
            }else{
                
                
                setdata_licence_site_huw([])
                
                setdata_licence_site_huw_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                
                setdata_licence_site_huw([])
                
                setdata_licence_site_huw_abs([])
                
    }
    
    
    
    )}
   const GetTable_4G_huw = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_4G_huw/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
     
            if(response.data['code'] == 200){
                
                
                setdata_gen_4G_huw(response.data['table_gen_4G_huw'])
                
                setdata_gen_4G_huw_abs(response.data['table_gen_4G_huw'])
               
      
            }else{
                
                
                setdata_gen_4G_huw([])
                
                setdata_gen_4G_huw_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                
                setdata_gen_4G_huw([])
                
                setdata_gen_4G_huw_abs([])
                
    }
    
    
    )}
    
    const GetTable_Alarm_huw = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_Alarm_huw/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
           
            if(response.data['code'] == 200){
                
                
                setdata_alarm_huw(response.data['table_alarm_huw'])
                
                setdata_alarm_huw_abs(response.data['table_alarm_huw'])
                
      
            }else{
                
                
                setdata_alarm_huw([])
               
                setdata_alarm_huw_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                
                setdata_alarm_huw([])})
               
                setdata_alarm_huw_abs([])
       
    }
    
    
    
    
    const GetTable_5G_huw = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_5G_huw/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
        
           
            if(response.data['code'] == 200){
                
                
                setdata_gen_5G_huw(response.data['table_gen_5G_huw'])
                
                setdata_gen_5G_huw_abs(response.data['table_gen_5G_huw'])
                
          
      
            }else{
                
                
                setdata_gen_5G_huw([])
                setdata_gen_5G_huw_abs([])
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
               
                setdata_gen_5G_huw([])
                setdata_gen_5G_huw_abs([])
       
                
    }
             )}
    
    
    
    const GetTable_2G_huw = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_2G_huw/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
       
           
            if(response.data['code'] == 200){
                
                
                setdata_gen_2G_huw(response.data['table_gen_2G_huw'])
                
                
                
                setdata_gen_2G_huw_abs(response.data['table_gen_2G_huw'])
               
          
      
            }else{
                
               
                setdata_gen_2G_huw([])
                setdata_gen_2G_huw_abs([])
                
                
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
               
       
                setdata_gen_2G_huw([])
                setdata_gen_2G_huw_abs([])
                
               
    }
    
    )}
    
    const GetTable_3G_huw = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_3G_huw/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
       
            if(response.data['code'] == 200){
                
                
                setdata_gen_3G_huw(response.data['table_gen_3G_huw'])
               
                setdata_gen_3G_huw_abs(response.data['table_gen_3G_huw'])
          
      
            }else{
                
                
                
                setdata_gen_3G_huw([])
                setdata_gen_3G_huw_abs([])
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
             
                setdata_gen_3G_huw([])
                setdata_gen_3G_huw_abs([])
    }
    
    
    )}
    
    const GetTable_histo_modif = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_histo_modif/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
     
           
            if(response.data['code'] == 200){
                
                
                setdata(response.data['histomodif'])
                
                
              
          
      
            }else{
                
                
                setdata([])
                
               
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
           
           setdata([])
                
    }
   )}
    
    
    
    
    const GetTable_mimo_ERC = (event) => {
        
    axiosInstance.post('/api_qoc/GetTable_mimo_ERC/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
     
           
            if(response.data['code'] == 200){
                
                
                setdata_mimo(response.data['table_mimo'])
                setdata_mimo_abs(response.data['table_mimo'])
                
                
              
          
      
            }else{
                
                
                setdata_mimo([])
                setdata_mimo_abs([])
                
               
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
           
              setdata_mimo([])
                setdata_mimo_abs([])
                
    }
    )}
   
   const HandleAllGet = (event) => {
        
    axiosInstance.post('/api_qoc/HandleAllGet/',
                     { headers: {
                       
                       }}).then((response) => {
        
        
        console.log(response.data['table_2G'])
        console.log("tdd : " + response.data['table_site_tdd'])
           
            if(response.data['code'] == 200){
                
                setdata_2G(response.data['table_2G'])
                setdata_3G(response.data['table_3G'])
                setdata_4G(response.data['table_4G'])
                setdata_licence_site(response.data['table_licence'])
                setdata_5G(response.data['table_5G'])
                setdata_synthese(response.data['table_synthese'])
                setdata_synthese_abs(response.data['table_synthese'])
                setdata_gen_4G(response.data['table_gen_4G'])
                setdata_eran(response.data['table_eran'])
                setdata_mimo(response.data['table_mimo'])
                setdata_synthese_tdd(response.data['table_synthese_tdd'])
                setdata_site_tdd(response.data['table_site_tdd'])
                setdata_5G_tdd(response.data['table_5G_tdd'])
                setdata_licence_site_huw(response.data['table_licence_huw'])
                setdata_gen_4G_huw(response.data['table_gen_4G_huw'])
                setdata_alarm_huw(response.data['table_alarm_huw'])
                setdata_gen_5G_huw(response.data['table_gen_5G_huw'])
                setdata_gen_2G_huw(response.data['table_gen_2G_huw'])
                setdata_gen_3G_huw(response.data['table_gen_3G_huw'])
                setdata(response.data['histomodif'])
                
                
                setdata_2G_abs(response.data['table_2G'])
                setdata_3G_abs(response.data['table_3G'])
                setdata_4G_abs(response.data['table_4G'])
                setdata_licence_site_abs(response.data['table_licence'])
                setdata_5G_abs(response.data['table_5G'])
                setdata_gen_4G_abs(response.data['table_gen_4G'])
                setdata_eran_abs(response.data['table_eran'])
                setdata_mimo_abs(response.data['table_mimo'])
                setdata_synthese_tdd_abs(response.data['table_synthese_tdd'])
                setdata_site_tdd_abs(response.data['table_site_tdd'])
                setdata_5G_tdd_abs(response.data['table_5G_tdd'])
                setdata_licence_site_huw_abs(response.data['table_licence_huw'])
                setdata_gen_4G_huw_abs(response.data['table_gen_4G_huw'])
                setdata_alarm_huw_abs(response.data['table_alarm_huw'])
                setdata_gen_5G_huw_abs(response.data['table_gen_5G_huw'])
                setdata_gen_2G_huw_abs(response.data['table_gen_2G_huw'])
                setdata_gen_3G_huw_abs(response.data['table_gen_3G_huw'])
          
      
            }else{
                
                setdata_2G([])
                setdata_3G([])
                setdata_4G([])
                setdata_5G([])
                setdata_synthese([])
                setdata_synthese_abs([])
                setdata_licence_site([])
                setdata_gen_4G([])
                setdata_eran([])
                setdata_mimo([])
                setdata_synthese_tdd([])
                setdata_site_tdd([])
                setdata_5G_tdd([])
                setdata_licence_site_huw([])
                setdata_gen_4G_huw([])
                setdata_alarm_huw([])
                setdata_gen_5G_huw([])
                setdata_gen_5G_huw_abs([])
                setdata([])
                
                setdata_2G_abs([])
                setdata_3G_abs([])
                setdata_4G_abs([])
                setdata_5G_abs([])
                setdata_synthese_abs([])
                setdata_licence_site_abs([])
                setdata_gen_4G_abs([])
                setdata_eran_abs([])
                setdata_mimo_abs([])
                setdata_synthese_tdd_abs([])
                setdata_site_tdd_abs([])
                setdata_5G_tdd_abs([])
                setdata_licence_site_huw_abs([])
                setdata_gen_4G_huw_abs([])
                setdata_alarm_huw_abs([])
                
                setdata_gen_2G_huw([])
                setdata_gen_2G_huw_abs([])
                
                setdata_gen_3G_huw([])
                setdata_gen_3G_huw_abs([])
            }
            
            

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                setdata_2G([])
                setdata_3G([])
                setdata_4G([])
                setdata_5G([])
                setdata_licence_site([])
                setdata_synthese([])
                setdata_synthese_abs([])
                setdata_gen_4G([])
                setdata_eran([])
                setdata_synthese_tdd([])
                setdata_site_tdd([])
                setdata_5G_tdd([])
                setdata_mimo([])
                setdata_licence_site_huw([])
                setdata_gen_4G_huw([])
                setdata_alarm_huw([])});
                setdata_gen_5G_huw([])
                setdata_gen_5G_huw_abs([])
       
                setdata_2G_abs([])
                setdata_3G_abs([])
                setdata_4G_abs([])
                setdata_5G_abs([])
                setdata_synthese_abs([])
                setdata_licence_site_abs([])
                setdata_gen_4G_abs([])
                setdata_eran_abs([])
                setdata_mimo_abs([])
                setdata_synthese_tdd_abs([])
                setdata_site_tdd_abs([])
                setdata_5G_tdd_abs([])
                setdata_licence_site_huw_abs([])
                setdata_gen_4G_huw_abs([])
                setdata_alarm_huw_abs([])
       
                setdata_gen_2G_huw([])
                setdata_gen_2G_huw_abs([])
                
                setdata_gen_3G_huw([])
                setdata_gen_3G_huw_abs([])
    }

  const handleChange = (event) => {
      console.log(state)
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
      
      console.log(state)
  };
    
    
     const handleFiles = (event) => {
    console.log("file :" + event.target.files);
    setFiles(event.target.files);
    //handleUploadClick();  
  };
    
    const handleChangeProgramme = (event) => {
      
    setValue(event.target.value)
        
  };
    
    const handleClose3 = () =>{
        setOpen3(false);
    }
    
     const handleClose4 = () =>{
        setOpen4(false);
    }
     const handleClose5 = () =>{
        setOpen5(false);
    }
     const handleClose15 = () =>{
        setOpen15(false);
    }
     
        
    

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose8 = () => {
    setOpen8(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
    const handleLogOut = (event) =>{
        
        localStorage.clear();
    window.location.href = "https://vmwres-outi059/";
        
    }
    
    
    
    const HandleBaseBandeConf = async () => {
        console.log(localStorage.getItem("currentUser")["name"])
        setMessage('')
        
        axiosInstance
      .post('/api_qoc/UpdateSoftwareConf/',
             {
        headers:
        {  

        }, 
            BaseBandConf : BaseBandConf ,
            Utilisateur : "admin"
            
      }
    ).then((response) => {
            if(response.data['code'] == 200){
                
                console.log(response.data)
            
            setdata(response.data['histo'])
            console.log("data_histo :" , response.data['histo'])
            setMessage('Import Conf Done !')
            setOpen6(true)
                setBaseBandConf({})
            
            
            
            }else{
                
            setdata([])
            setOpen6(true)
            setMessage('Import Conf Fail !')
            }
           
            

    })
      .catch((error) => {console.log(error)
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                         setOpen6(true)
    setMessage('Import Conf Fail !')
                        });
        
     
        
    }
    
    const handleImportRef= (event) =>{
        setbtnDropright(!btnDropright)
        console.log(event.target.files);
    setFiles_3(event.target.files);
    setOpen5(true)}
    
    const handleImport= (event) =>{
        setbtnDropright(!btnDropright)
        console.log(event.target.files);
    setFiles_2(event.target.files);}
    
    const HandleScriptHuw = async () => {
        
        setFiles_zip([])         
        //setOpen4(false)
         setOpen2(true)
        setTitleExc("Qoc Tool Exécution")
        setMessageExc("Veuillez attendre la fin Exécution")
        let form_data = new FormData();
        for (let i = 0; i < files_list.length; i++) {
            form_data.append(`files[${i}]`, files_list[i]);
        }
           form_data.append('programme',  value_Programme)
        try {
      const response = await axiosInstance.post('/api_qoc/HandleScriptHuw/', form_data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
      console.log(response.data['code'])
      if (response.data['code'] == 200) {

          
           setprogramme({
    "BOLT ZTD": false,
    "BOLT CRZ": false,
    "Ambition Mobile ZTD": false,
    "Ambition Mobile CRZ": false,
    "DI ZTD": false,
    "DI CRZ": false,
    "TDD CRZ": false,
    "TDD ZTD": false,
    "Vercors": false

  })
        
        console.log("hello world")
         setFiles_2([])
          GetTable_2G_ERC()
          GetTable_3G_ERC()
          GetTable_4G_ERC()
          GetTable_5G_ERC()
          GetTable_Licence_ERC()
          GetTable_gen_4G_ERC()
          GetTable_Eran()
          GetTable_mimo_ERC()
          GetTable_Synthese_Site()
          GetTable_Synthese_Site_tdd()
           GetTable_5G_tdd()
            GetTable_Site_Tdd()
        GetTable_Licence_4G_huw()
        GetTable_4G_huw()
        GetTable_Alarm_huw()
        GetTable_5G_huw()
        GetTable_2G_huw()
        GetTable_3G_huw()
        GetTable_histo_modif()
        //HandleAllGet()
        setOpen2(false)
          let list_file_zip = []
          console.log(list_file_zip)
          list_file_zip.push(response.data['filename'])
          setFiles_zip(list_file_zip)
          
        
         
      }else{
          console.log("error")
          setprogramme({
    "BOLT ZTD": false,
    "BOLT CRZ": false,
    "Ambition Mobile ZTD": false,
    "Ambition Mobile CRZ": false,
    "DI ZTD": false,
    "DI CRZ": false,
    "TDD CRZ": false,
    "TDD ZTD": false,
    "Vercors": false

  })
          
          //HandleAllGet()
          GetTable_2G_ERC()
GetTable_3G_ERC()
GetTable_4G_ERC()
GetTable_5G_ERC()
GetTable_Licence_ERC()
GetTable_gen_4G_ERC()
GetTable_Eran()
GetTable_mimo_ERC()
GetTable_Synthese_Site()
GetTable_Synthese_Site_tdd()
GetTable_5G_tdd()
GetTable_Site_Tdd()
GetTable_Licence_4G_huw()
GetTable_4G_huw()
GetTable_Alarm_huw()
GetTable_5G_huw()
GetTable_2G_huw()
GetTable_3G_huw()
GetTable_histo_modif()
          setOpen2(false)
          setTitleExc("Qoc Tool Exécution")
          setMessageExc("Problème Lors d'éxecution suite à l'erreur "+response.data['msg'] +" Veuillez Contacter l'administateur")
          setOpen3(true)
          
      }
    } catch (error) {
        //HandleAllGet()
        GetTable_2G_ERC()
GetTable_3G_ERC()
GetTable_4G_ERC()
GetTable_5G_ERC()
GetTable_Licence_ERC()
GetTable_gen_4G_ERC()
GetTable_Eran()
GetTable_mimo_ERC()
GetTable_Synthese_Site()
GetTable_Synthese_Site_tdd()
GetTable_5G_tdd()
GetTable_Site_Tdd()
GetTable_Licence_4G_huw()
GetTable_4G_huw()
GetTable_Alarm_huw()
GetTable_5G_huw()
GetTable_2G_huw()
GetTable_3G_huw()
GetTable_histo_modif()
         setprogramme({
    "BOLT ZTD": false,
    "BOLT CRZ": false,
    "Ambition Mobile ZTD": false,
    "Ambition Mobile CRZ": false,
    "DI ZTD": false,
    "DI CRZ": false,
    "TDD CRZ": false,
    "TDD ZTD": false,
    "Vercors": false

  })  
        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
        console.log(error.config.url)
      console.log(error);
    }
         
    }
    
    
    
    const HandleRRUImportmass = (event) =>{
        
        setOpen7(false)
        setshow(true)
        console.log(data_powersent)
        const form_data = new FormData();
    form_data.append('files', files[0])
    //for (let i = 0; i < files.length; i++) {
      //form_data.append(`files[${i}]`, files[i]);
    //}
        form_data.append('Utilisateur', 'admin')
   
    console.log(form_data)
    
        
            
        axiosInstance
      .post('/api_qoc/HandleRRUMasse/',form_data,
             {
        headers:
        {   "content-type": "multipart/form-data",
            //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }
            
      }
    ).then((response) => {
           console.log(response.data)
            if(response.data['code'] == 200){
                console.log(response.data['data_RRU'])
                setdata_powerget(response.data['data_RRU'])
                setOpen8(false)
        setFiles([])
        setOpen6(true)
        setMessage('Import Done !')
                setshow(false)
            }else{
                
                setdata_powerget([])
                setOpen8(false)
            setFiles([])
            setOpen6(true)
            setMessage('Import Fail !')
            setshow(false)
            }
            
            console.log(response.data['data_RRU'])

    })
      .catch((error) => {console.log(error)
    
    
    if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
    setdata_powerget([])
                setOpen8(false)
            setFiles([])
            setOpen6(true)
            setMessage('Import Fail !')
            setshow(false)
    });
        
        
        
        
    }
    
    const HandleCellClick = (event) =>{
        //console.log(event.value)
        //console.log(event.data)
        setcellcliked(event.value)
        setshowtoast(true)
        
        
    }
    const HandleRRU = (event) =>{
        
        setOpen7(false)
        //console.log(data_powersent)
        
            
        axiosInstance
      .post('/api_qoc/HandleRRU/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            powersent : data_powersent,
            Utilisateur : "admin"
            
      }
    ).then((response) => {
           console.log(response.data)
            if(response.data['code'] == 200){
                console.log(response.data['data_RRU'])
                setdata_powerget(response.data['data_RRU'])
                setdata(response.data['histo'])
            }else{
                
                setdata_powerget([])
                setdata([])
            }
            
            console.log(response.data['data_RRU'])

    })
      .catch((error) => {console.log(error)
                        
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        setdata_powerget([])});
        
        
        
        
    }
    
    
    
    
    const HandleScriptErc = async () => {
        setFiles_zip([])        
        let programme_exc = 'test'
        
        for (const el of Object.keys(programme)){
            
            if (programme[el] == true){
                
                programme_exc = el
            }
        }
         
        //setOpen4(false)
        setOpen2(true)
        setTitleExc("Qoc Tool Exécution")
        setMessageExc("Veuillez attendre la fin Exécution")
         let form_data = new FormData();
        for (let i = 0; i < files_list.length; i++) {
            form_data.append(`files[${i}]`, files_list[i]);
        }
        form_data.append('programme',  value_Programme)
        
        try {
      const response = await axiosInstance.post('/api_qoc/HandleScriptErc/', form_data,  {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
      console.log(response.data['code'])
      if (response.data['code'] == 200) {
          
           setprogramme({
    "BOLT ZTD": false,
    "BOLT CRZ": false,
    "Ambition Mobile ZTD": false,
    "Ambition Mobile CRZ": false,
    "DI ZTD": false,
    "DI CRZ": false,
    "TDD CRZ": false,
    "TDD ZTD": false,
    "Vercors": false

  })
        
        console.log("hello world")
         setFiles_2([])
        //HandleAllGet()
          GetTable_2G_ERC()
GetTable_3G_ERC()
GetTable_4G_ERC()
GetTable_5G_ERC()
GetTable_Licence_ERC()
GetTable_gen_4G_ERC()
GetTable_Eran()
GetTable_mimo_ERC()
GetTable_Synthese_Site()
GetTable_Synthese_Site_tdd()
GetTable_5G_tdd()
GetTable_Site_Tdd()
GetTable_Licence_4G_huw()
GetTable_4G_huw()
GetTable_Alarm_huw()
GetTable_5G_huw()
GetTable_2G_huw()
GetTable_3G_huw()
GetTable_histo_modif()
        setOpen2(false)
          let list_file_zip = []
          console.log(list_file_zip)
          list_file_zip.push(response.data['filename'])
          setFiles_zip(list_file_zip)
          
        
         
      }else{
          console.log("error")
          setprogramme({
    "BOLT ZTD": false,
    "BOLT CRZ": false,
    "Ambition Mobile ZTD": false,
    "Ambition Mobile CRZ": false,
    "DI ZTD": false,
    "DI CRZ": false,
    "TDD CRZ": false,
    "TDD ZTD": false,
    "Vercors": false

  }) 
          //HandleAllGet()
          GetTable_2G_ERC()
GetTable_3G_ERC()
GetTable_4G_ERC()
GetTable_5G_ERC()
GetTable_Licence_ERC()
GetTable_gen_4G_ERC()
GetTable_Eran()
GetTable_mimo_ERC()
GetTable_Synthese_Site()
GetTable_Synthese_Site_tdd()
GetTable_5G_tdd()
GetTable_Site_Tdd()
GetTable_Licence_4G_huw()
GetTable_4G_huw()
GetTable_Alarm_huw()
GetTable_5G_huw()
GetTable_2G_huw()
GetTable_3G_huw()
GetTable_histo_modif()
          setOpen2(false)
          setTitleExc("Qoc Tool Exécution")
          setMessageExc("Problème Lors d'éxecution suite à l'erreur "+response.data['msg'] +" Veuillez Contacter l'administateur")
          setOpen3(true)
          
      }
    } catch (error) {
         setprogramme({
    "BOLT ZTD": false,
    "BOLT CRZ": false,
    "Ambition Mobile ZTD": false,
    "Ambition Mobile CRZ": false,
    "DI ZTD": false,
    "DI CRZ": false,
    "TDD CRZ": false,
    "TDD ZTD": false,
    "Vercors": false

  })  
        //HandleAllGet()
        GetTable_2G_ERC()
GetTable_3G_ERC()
GetTable_4G_ERC()
GetTable_5G_ERC()
GetTable_Licence_ERC()
GetTable_gen_4G_ERC()
GetTable_Eran()
GetTable_mimo_ERC()
GetTable_Synthese_Site()
GetTable_Synthese_Site_tdd()
GetTable_5G_tdd()
GetTable_Site_Tdd()
GetTable_Licence_4G_huw()
GetTable_4G_huw()
GetTable_Alarm_huw()
GetTable_5G_huw()
GetTable_2G_huw()
GetTable_3G_huw()
GetTable_histo_modif()
        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
        console.log(error.config.url)
      console.log(error);
    }
         
    }
    
    const HandleDelete = (event) => {
        
        console.log(selectdelete)
        
        setOpen2(true)
        setTitleExc("Suppression RRU")
        setMessageExc("Veuillez attendre la fin de Suppression")
        
        
        axiosInstance
      .post('/api_qoc/HandleRRUDelete/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            id : selectdelete
            
      }
    ).then((response) => {
           console.log(response.data)
            if(response.data['code'] == 200){
                console.log(response.data['data_RRU'])
                setdata_powerget(response.data['data_RRU'])
                
                setOpen2(false)
          setTitleExc("Suppression RRU")
          setMessageExc("Supprission Done!")
          setOpen3(true)
            }else{
                
                setdata_powerget([])
            }
            
            console.log(response.data['data_RRU'])

    })
      .catch((error) => {console.log(error)
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        setdata_powerget([])
        setOpen2(false)
          setTitleExc("Suppression RRU")
          setMessageExc("Problème Lors de Supprission, Veuillez Contacter l'administateur")
          setOpen3(true)
                        });
        
        
    
         
   }
        
    
    
    const HandleImportReFile = async () =>{
        
        //setbtnDropright(!btnDropright)

        setOpen5(false)
         setOpen2(true)
         let form_data = new FormData();
        for (let i = 0; i < files_list_3.length; i++) {
            form_data.append(`files[${i}]`, files_list_3[i]);
        }
        
        try {
      const response = await axiosInstance.post('/api_qoc/ImportReferenceFile/', form_data,  {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    });
      console.log(response.data['code'])
      if (response.data['code'] == 200) {

        console.log("hello world")
        setOpen2(false)
        setFiles_3([])
        setOpen6(true)
        setMessage('Import Done !')
          
        
         
      }else{
          console.log("error")
          setOpen2(false)
          setOpen6(true)
          setMessage('Import Fail !')
          
          
      }
    } catch (error) {
        
        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
       
        setOpen2(false)
        setOpen6(true)
        setMessage('Import Fail !')
         
    }
        
    }
    
    
    const HandleExport = async () => {
        
        axiosInstance
      .post('/api_qoc/HandleExport/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            state : state, 
            Site : Site,
      }
    ).then((response) => {
           console.log(response.data)
            let filename = ""
            if (Site == ""){
                filename = "all_table"+'.xlsx'
            }else{
                filename = Site+'.xlsx'
            }
            const link = document.createElement('a');
            
            link.href = './export/'+filename;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

    })
      .catch((error) => {
            if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
            
            console.log(error)});
        
    }
    
    

    const ImportLicencefeatures = async () => {
        
        axiosInstance
      .post('/api_qoc/HandleImportLicence/',
             {
        headers:
        {  //"Access-Control-Allow-Headers": "*",
            //'Access-Control-Allow-Origin': "*",
           //'Access-Control-Allow-Credentials': "true",
          //'Content-Disposition': "attachment; filename='info_4G.xls'",
          //'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
         //"Content-Type": "application/json",

        }, 
            
      }
    ).then((response) => {
          
           console.log(response.data)
            if(response.data['code'] == 200){
                setdata_licence(response.data['data_licence'])
                setdata_powerget(response.data['data_RRU'])
                setdata_soft(response.data['data_soft'])
            }else{
                
                setdata_licence([])
                setdata_powerget([])
                setdata_soft([])
                
            }
            
            console.log(response.data['data_licence'])

    })
      .catch((error) => {console.log(error)
                        
                        if (error.config.url === "api_auth/token/refresh/") {
      window.alert(
        "Votre session a expiré. Vous serez redirigé vers la page de connexion."
      );
      
    localStorage.clear();
    window.location.href = "http://vmwres-outi055/";
    }
                        
                        setdata_licence([])
        setdata_powerget([])});
        setdata_soft([])
        
        
    }
    
 

React.useEffect(() => {
    
    ImportLicencefeatures();
    //HandleAllGet();
    GetTable_2G_ERC()
GetTable_3G_ERC()
GetTable_4G_ERC()
GetTable_5G_ERC()
GetTable_Licence_ERC()
GetTable_gen_4G_ERC()
GetTable_Eran()
GetTable_mimo_ERC()
GetTable_Synthese_Site()
GetTable_Synthese_Site_tdd()
GetTable_5G_tdd()
GetTable_Site_Tdd()
GetTable_Licence_4G_huw()
GetTable_4G_huw()
GetTable_Alarm_huw()
GetTable_5G_huw()
GetTable_2G_huw()
GetTable_3G_huw()
GetTable_histo_modif()
   HandleColumnTable_2G_ERC()
   HandleColumnTable_3G_ERC()
    HandleColumnTable_4G_ERC()
    HandleColumnTable_5G_ERC()
    HandleColumnTable_Eran_ERC()
    HandleColumnTable_LicenceERC()
    HandleColumnTable_4GgenERC()
    HandleColumnTable_MimoERC()
    HandleColumnTable_5GTDD()
   HandleColumnTable_SiteTDD()
    HandleColumnTable_2G_HUW()
    HandleColumnTable_3G_HUW()
    HandleColumnTable_4G_HUW()
    HandleColumnTable_5G_HUW()
    HandleColumnTable_AlarmHUW()
    HandleColumnTable_LicenceHUW()
    
    
   
  },[]);
    
    const  handle_global_filter_hw = (event) =>{
        let new_data_licence_site_huw = []
        let new_data_gen_4G_huw = []
        let new_data_alarm_huw = []
        let new_data_gen_2G_huw = []
        let new_data_gen_3G_huw = []
        let new_data_gen_5G_huw = []
        
        for (const el of data_licence_site_huw){
            if(el['sitename'].includes(Site)){
                new_data_licence_site_huw.push(el)
            }
        }
             
        for (const el of data_gen_4G_huw){
            if(el['sitename'].includes(Site)){
                new_data_gen_4G_huw.push(el)
            }
        }
        
        for (const el of data_gen_2G_huw){
            if(el['sitename'].includes(Site)){
                new_data_gen_2G_huw.push(el)
            }
        }
        
        for (const el of data_gen_3G_huw){
            if(el['sitename'].includes(Site)){
                new_data_gen_3G_huw.push(el)
            }
        }
        
        for (const el of data_gen_5G_huw){
            if(el['sitename'].includes(Site)){
                new_data_gen_5G_huw.push(el)
            }
        }
             
        for (const el of data_alarm_huw){
            if(el['sitename'].includes(Site)){
                new_data_alarm_huw.push(el)
            }
        }
             
             
        setdata_licence_site_huw(new_data_licence_site_huw)
        setdata_gen_4G_huw(new_data_gen_4G_huw)
        setdata_alarm_huw(new_data_alarm_huw)
        setdata_gen_2G_huw(new_data_gen_2G_huw)
        setdata_gen_3G_huw(new_data_gen_3G_huw)
        setdata_gen_5G_huw(new_data_gen_5G_huw)
    }
    
    const  handle_global_filter_tdd = (event) =>{
        
        
        
        let new_data_synthese_tdd = []
        let new_data_site_tdd = []
        let new_data_5G_tdd = []
        
        for (const el of data_synthese_tdd){
            if(el['sitename'].includes(Site)){
                new_data_synthese_tdd.push(el)
            }
        }
             
        for (const el of data_site_tdd){
            if(el['sitename'].includes(Site)){
                new_data_site_tdd.push(el)
            }
        }
             
        for (const el of data_5G_tdd){
            if(el['sitename'].includes(Site)){
                new_data_5G_tdd.push(el)
            }
        }
             
             setdata_synthese_tdd(new_data_synthese_tdd)
                setdata_site_tdd(new_data_site_tdd)
                setdata_5G_tdd(new_data_5G_tdd)
        
        
    }
   const  handle_global_filter = (event) =>{
        
        
        let new_data_synthese = []
        let new_data_2G = []
        let new_data_3G = []
        let new_data_4G = []
        let new_data_5G = []
        let new_data_licence_site = []
        let new_data_gen_4G = []
        let new_data_eran = []
        let new_data_mimo = []
        
            for (const el of data_synthese){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_synthese.push(el)
                  }
                }
       for (const el of data_2G){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_2G.push(el)
                  }
             
                
                }
       for (const el of data_3G){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_3G.push(el)
                  }
                }
       for (const el of data_4G){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_4G.push(el)
                  }
                }
       for (const el of data_5G){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_5G.push(el)
                  }
                }
       
       for (const el of data_licence_site){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_licence_site.push(el)
                  }
                }
       
       for (const el of data_gen_4G){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_gen_4G.push(el)
                  }
                }
       
       for (const el of data_eran){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_eran.push(el)
                  }
                }
       
       for (const el of data_mimo){
             console.log(el['sitename'].includes(Site))
                if (el['sitename'].includes(Site) ) {
                    
                    new_data_mimo.push(el)
                  }
                }
   setdata_synthese(new_data_synthese)
   setdata_2G(new_data_2G)
   setdata_3G(new_data_3G)
   setdata_4G(new_data_4G)
   setdata_5G(new_data_5G)
   setdata_licence_site(new_data_licence_site)
   setdata_gen_4G(new_data_gen_4G)
   setdata_eran(new_data_eran)
   setdata_mimo(new_data_mimo)}
                
 
    
    return(
    
    
    <div>
        
  <Navbar  expand="xl" light style ={{  height: '10vh', background: '#FFFFFF'}}>
    <NavbarBrand href="/">
         <img
            src ={thumbnail_QoC} 
            width="90%"
            alt="First slide" style = {{marginLeft :"2%", marginRight :"4%"}}
          ></img> 
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
        <img
            src ={logo} 
            width="10%"
            alt="First slide" style = {{ marginLeft : "83%" }}
          ></img>
     <Button   style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} onClick={handleLogOut}>Déconnexion</Button>
    </Collapse>
  </Navbar>

 <div style ={{  height: '10vh',width: "100%",   backgroundImage: `url(${menu})`}}>

    
</div>
 


 <Tabs defaultActiveKey="Utilisateur" id="uncontrolled-tab-example" className="mb-3" >
  <Tab eventKey="Utilisateur" title="Utilisateur">
  
  
  
  
   <Tabs defaultActiveKey="Ericsson_FDD" id="uncontrolled-tab-example" className="mb-3" >
  <Tab eventKey="Ericsson_FDD" title="Ericsson 2G/3G/4G/5G">
      <Card style = {{ height: '80vh'}}>
    <CardHeader >
      <h4> Dashboard Ericsson </h4>
     <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" ,marginRight : "3%", marginTop :'1%'}} onClick = {(event) => {setOpen4(true) }}>
        Exécuter
      </Button>
        
       <TextField 
          id="standard-search"
          label="Chercher Site"
          type="search"
          variant="standard"
          onChange={(event) => {
           setSite(event.target.value)
        
    }} />
    
    

      <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginLeft : "3%", marginTop :'1%'}}  onClick={handle_global_filter} >
        Filter
      </Button>
    <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginLeft : "3%", marginTop :'1%'}}  onClick={(event) => {setdata_synthese(data_synthese_abs)
    setdata_2G(data_2G_abs)
   setdata_3G(data_3G_abs)
   setdata_4G(data_4G_abs)
   setdata_5G(data_5G_abs)
   setdata_licence_site(data_licence_site_abs)
   setdata_gen_4G(data_gen_4G_abs)
   setdata_eran(data_eran_abs)
   setdata_mimo(data_mimo_abs)
  }} >
        Clear
      </Button>
    </CardHeader>
       <CardBody  style = {{background:'#ffff'}}>

      <CardText  >


<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%' }}>




 <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Synthèse Paramètre NOK</h3>

<AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_synthese}
        rowData={data_synthese}
        onCellClicked={HandleCellClick}
        animateRows={true}
        pagination={true}
        rowSelection={'multiple'}
        
       
        
                
        >
    </AgGridReact>

     
</div>      

       <div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%' }}>

 <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 2G</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_2G}
        rowData={data_2G}
        onCellClicked={HandleCellClick}
        animateRows={true}
        pagination={true}
        rowSelection={'multiple'}
        
         
        >
    </AgGridReact>
</div>      


<div className="ag-theme-alpine" style={{ height: 400, width: "100%" , marginBottom :'4%' }}>
<h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 3G</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_3G}
        rowData={data_3G}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
        
                
        >
    </AgGridReact>
</div>      


<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
  <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 4G</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_4G}
        rowData={data_4G}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>    

<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
  <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 5G</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_5G}
        rowData={data_5G}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>    

<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
   <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Licence/Alarms/NGS/RET </h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_licence_site}
        rowData={data_licence_site}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>      

<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
   <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Eran/IPSEC/Compteur/Synchro</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_eran}
        rowData={data_eran}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>      

<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
   <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Infos Général 4G</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_gen_4G}
        rowData={data_gen_4G}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>    

<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
   <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Handover/Performance</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_mimo}
        rowData={data_mimo}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>    


      </CardText>
 
    </CardBody>

</Card> 
    </Tab>

  <Tab eventKey="Ericsson_TDD" title="Ericsson 5G TDD">
      <Card style = {{ height: '80vh'}}>
    <CardHeader>
      <h4> Dashboard Ericsson </h4>
     <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" ,marginRight : "3%", marginTop :'1%'}} onClick = {(event) => {setOpen4(true) }}>
        Exécuter
      </Button>
        
       <TextField 
          id="standard-search"
          label="Chercher Site"
          type="search"
          variant="standard"
          onChange={(event) => {
           setSite(event.target.value)
        
    }} />
    

      <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginLeft : "3%", marginTop :'1%'}}  onClick={handle_global_filter_tdd} >
        filter
      </Button>
     <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginLeft : "3%", marginTop :'1%'}}  onClick={(event) =>{

               setdata_synthese_tdd(data_synthese_tdd_abs)
                setdata_site_tdd(data_site_tdd_abs)
                setdata_5G_tdd(data_5G_tdd_abs)
                
}}  >
        Clear
      </Button>
    </CardHeader>
       <CardBody >

      <CardText >
<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%' }}>
        <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Synthèse Paramètre NOK</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_synthese_tdd}
        rowData={data_synthese_tdd}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>      

       <div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%' }}>

 <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 5G</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_5G_tdd}
        rowData={data_5G_tdd}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>      


<div className="ag-theme-alpine" style={{ height: 400, width: "100%" , marginBottom :'4%' }}>
<h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Site TDD</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_Site_tdd}
        rowData={data_site_tdd}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>      
      </CardText>
 
    </CardBody>

</Card> 
    </Tab>
    <Tab eventKey="Huawei" title="Huawei">
       <Card style = {{ height: '80vh'}}>
    <CardHeader>
      <h4> Dashboard Huawei </h4>
     <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginRight : "3%", marginTop :'1%'}} onClick = {(event) => {setSite(setOpen15(true)) }} >
        Exécuter
      </Button>
        
       <TextField 
          id="standard-search"
          label="Chercher Site"
          type="search"
          variant="standard"
          onChange={(event) => {
           setSite(event.target.value)
        
    }} />
    

      <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginLeft : "3%", marginTop :'1%'}}  onClick={handle_global_filter_hw}>
        filter
      </Button>
     <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginLeft : "3%", marginTop :'1%'}}  onClick={(event) =>{

                setdata_licence_site_huw(data_licence_site_huw_abs)
                setdata_gen_4G_huw(data_gen_4G_huw_abs)
                setdata_alarm_huw(data_alarm_huw_abs)
                setdata_gen_3G_huw(data_gen_3G_huw_abs)
                setdata_gen_2G_huw(data_gen_2G_huw_abs)
                setdata_gen_5G_huw(data_gen_5G_huw_abs)
}} >
        Clear
      </Button>
    </CardHeader>
       <CardBody >

      <CardText >
        
  <div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
  <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 2G Géneral</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_gen_2G_huw}
        rowData={data_gen_2G_huw}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div> 

<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
  <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 3G Géneral</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_gen_3G_huw}
        rowData={data_gen_3G_huw}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>    
        
<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
  <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 4G Géneral</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_gen_4G_huw}
        rowData={data_gen_4G_huw}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>    

   <div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
  <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Cell 5G Géneral</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_gen_5G_huw}
        rowData={data_gen_5G_huw}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>    
  


<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
   <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Licence </h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_licence_huw}
        rowData={data_licence_site_huw}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>      



<div className="ag-theme-alpine" style={{ height: 400, width: "100%", marginBottom :'4%'  }}>
   <h3 style = {{ marginLeft : "40%", marginBottom :'1%', color :"#25465f"}}> Information Alarms</h3>
     <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_alarm_huw}
        rowData={data_alarm_huw}
        animateRows={true}
        onCellClicked={HandleCellClick}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>    

      </CardText>
 
    </CardBody>

</Card> 
    </Tab>

                     

</Tabs>
   
  </Tab>
  
  
  
  
  

   
  <Tab eventKey="Administateur" title="Administateur">
  
  
    <Tabs defaultActiveKey="Configuration BB" id="uncontrolled-tab-example" className="mb-3" >
    
      <Tab eventKey="Configuration BB" title="Configuration BB">
      <Card style = {{ height: '80vh'}}>
    <CardHeader>
      <h4> Configuration </h4>
     <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginRight : "3%", marginTop :'1%'}} onClick = {HandleBaseBandeConf}>
        Importer Config
      </Button>
      
        
    </CardHeader>
       <CardBody >
           
            <CardText >
        <InputGroup className="mb-3">
    <InputGroupText id="basic-addon1"><SettingsIcon/></InputGroupText>
  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" }} caret>
    {Parameter}
  </DropdownToggle>

  <DropdownMenu>
{['BaseBand', 'Alarm', 'transmissionMode', 'EUtranFreqRelation'].map((param) =>{
  return(<DropdownItem onClick={(event) => {setParameter(param) ; setParamter_value(Parametre_detail[param])}}>{param}</DropdownItem>)
    
})}
    

</DropdownMenu>

</Dropdown>
<InputGroupText id="basic-addon1" style = {{marginLeft : "2%"}}><SettingsIcon/></InputGroupText>
<Dropdown isOpen={dropdownOpen1} toggle={toggle1}>
    <DropdownToggle style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" }} caret>
    {subparametre}
  </DropdownToggle>

  <DropdownMenu>
{Paramter_value.map((subparam) =>{
  return(<DropdownItem onClick={(event) => {setsubparametre(subparam)}}>{subparam}</DropdownItem>)
    
})}
    
  </DropdownMenu>


</Dropdown>
     <InputGroupText id="basic-addon1" style = {{marginLeft : "2%"}}><SettingsIcon/></InputGroupText>
    <Input placeholder="Software" style = {{width : '10vh'}} onChange={(event) => {setSoft(event.target.value)
                                                                                  console.log(event.target.value)}} />
       <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" }} onClick={HandleAddSoftware}>Ajouter</Button>
          </InputGroup>

           
       
       {Object.keys(BaseBandConf).map((el,index) =>( 
       <ListGroup variant="flush">
  <ListGroupItem> <span>{el}</span> : {BaseBandConf[el]}</ListGroupItem>
      </ListGroup>))}
      
      </CardText >
      
      </CardBody >
      
      </Card >
      </Tab>
  
    
  <Tab eventKey="Configuration Table" title="Configuration Table">
      <Card style = {{ height: '80vh'}}>
    <CardHeader>
      <h4> Configuration Table </h4>
    
      
      <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginRight : "3%", marginTop :'1%'}} onClick = {HandletabConfig}>
        Sauvegarder tabConfig
      </Button>
        
    </CardHeader>
       <CardBody >
           
            
      <CardText >
      <Typography  style = {{marginTop : "1%", marginBottom : "1%", fontWeight: "bold"}}>Configuration Table ERC</Typography> 
      <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table 2G ERC</Typography>  
        </AccordionSummary>
        <AccordionDetails>
          
          {Object.keys(TwoG_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn[el]} onChange={handlecolumn}  name={el}/>} label={el} />))}
          

        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table 3G ERC</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {Object.keys(ThreeG_ERC_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_3GERC[el]} onChange={handlecolumn_3GERC}  name={el}/>} label={el} />))}


        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table 4G ERC</Typography>
        </AccordionSummary>
        <AccordionDetails>
         {Object.keys(FourG_ERC_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_4GERC[el]} onChange={handlecolumn_4GERC}  name={el}/>} label={el} />))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table 5G ERC</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {Object.keys(FiveG_ERC_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_5GERC[el]} onChange={handlecolumn_5GERC}  name={el}/>} label={el} />))}

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Licence/Alarms/NGS/RET</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {Object.keys(Licence_ERC_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_LicenceERC[el]} onChange={handlecolumn_LicenceERC}  name={el}/>} label={el} />))}
          
         

        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Eran/IPSEC/Compteur/Synchro</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Object.keys(ERAN_ERC_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_EranERC[el]} onChange={handlecolumn_EranERC}  name={el}/>} label={el} />))}
          

        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Info Général 4G</Typography>
        </AccordionSummary>
        <AccordionDetails>
        {Object.keys(FourGen_ERC_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_4GgenERC[el]} onChange={handlecolumn_4GgenERC}  name={el}/>} label={el} />))}
          
          
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Handover/Performance</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Object.keys(Mimo_ERC_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_MimoERC[el]} onChange={handlecolumn_MimoERC}  name={el}/>} label={el} />))}
          
        </AccordionDetails>
      </Accordion>
      </div>
     
     
     <Typography  style = {{marginTop : "3%", marginBottom : "1%", fontWeight: "bold"}}>Configuration Table ERC TDD</Typography> 
      <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table 5G ERC TDD</Typography>  
        </AccordionSummary>
        <AccordionDetails>
          
          {Object.keys(FiveG_TDD_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_5GTDD[el]} onChange={handlecolumn_5GTDD}  name={el}/>} label={el} />))}

        </AccordionDetails>
      </Accordion>
      
     
          
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Site TDD</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {Object.keys(Site_TDD_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_SiteTDD[el]} onChange={handlecolumn_SiteTDD}  name={el}/>} label={el} />))}

        </AccordionDetails>
      </Accordion>
      
      </div>
      
      
       <Typography  style = {{marginTop : "3%", marginBottom : "1%", fontWeight: "bold"}}>Configuration Table HUW</Typography> 
      <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table 2G HUW</Typography>  
        </AccordionSummary>
        <AccordionDetails>
        {Object.keys(TwoG_HUW_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_2GHUW[el]} onChange={handlecolumn_2GHUW}  name={el}/>} label={el} />))}
          


        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table 3G HUW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Object.keys(ThreeG_HUW_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_3GHUW[el]} onChange={handlecolumn_3GHUW}  name={el}/>} label={el} />))}

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table 4G HUW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {Object.keys(FourG_HUW_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_4GHUW[el]} onChange={handlecolumn_4GHUW}  name={el}/>} label={el} />))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        
          <Typography>Table 5G HUW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
         {Object.keys(FiveG_HUW_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_5GHUW[el]} onChange={handlecolumn_5GHUW}  name={el}/>} label={el} />))}

        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Licence Site HUW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {Object.keys(Licence_HUW_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_LicenceHUW[el]} onChange={handlecolumn_LicenceHUW}  name={el}/>} label={el} />))}

        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Alarms Site HUW</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {Object.keys(Alarm_HUW_default).map((el, index) => ( <FormControlLabel control={<Switch   checked={statecolumn_AlarmHUW[el]} onChange={handlecolumn_AlarmHUW}  name={el}/>} label={el} />))}

        </AccordionDetails>
      </Accordion>
      
      
      

      </div>
     
            </CardText >
    </CardBody>

</Card> 
    </Tab>
                                      
<Tab eventKey="Historique" title="Historique">
      <Card style = {{ height: '80vh'}}>
    <CardHeader>
      <h4 style={{marginLeft : '40%'}}> Historique de Modification </h4>
        
    </CardHeader>
       <CardBody >
           
           <CardText > 
          
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
    <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto}
        rowData={data}
        animateRows={true}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>
        
          </CardText >
        
    </CardBody>

</Card> 
    </Tab>


<Tab eventKey="Licences ERC" title="Licences ERC">
      <Card style = {{ height: '80vh'}}>
    <CardHeader >
      <h4 style={{marginLeft : '40%'}}> Licences ERC </h4>
        
    </CardHeader>
       <CardBody >
           
             
          <div className="ag-theme-alpine" style={{ height: '70vh', width: "100%" }}>
    <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={data_licence}
        animateRows={true}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>
    
        
          
        
    </CardBody>

</Card> 
    </Tab>

<Tab eventKey= "RRU MIMO PUISSANCE ERC" title="RRU MIMO PUISSANCE">
      <Card style = {{ height: '80vh'}}>
    <CardHeader >
      <h4 > Licences ERC </h4>
     <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" ,marginRight : "3%", marginTop :'1%'}} onClick = {(event) => {setSite(setOpen7(true)) }}>
        Ajouter Config
      </Button>
     <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" ,marginRight : "3%", marginTop :'1%'}} onClick = {(event) => {setOpen8(true)}}>
        Importer Config
      </Button>
     <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" ,marginRight : "3%", marginTop :'1%'}} onClick = {(event) => {ImportLicencefeatures()}}>
      <UpdateIcon/>
        </Button>
       <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold" ,marginRight : "3%", marginTop :'1%'}} onClick =  {HandleDelete} ><FcFullTrash/></Button>
    </CardHeader>
       <CardBody >
           
             
          <div className="ag-theme-alpine" style={{ height: '70vh', width: "100%" }}>
    <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefsPower}
        rowData={data_powerget}
        animateRows={true}
        pagination={true}
        rowSelection={'multiple'}
        frameworkComponents={frameworkComponents}
        onSelectionChanged={(event) => { let selectedNodes = event.api.getSelectedNodes();
	        let selectedData = selectedNodes.map(node => node.data.id);
            console.log(JSON.stringify(selectedData))
            setselectdelete(selectedData)}}
            
                
                
        >
    </AgGridReact>
</div>
    
        
          
        
    </CardBody>

</Card> 
    </Tab>
    
    <Tab eventKey="Configuration_Software" title="Configuration_Software">
      <Card style = {{ height: '80vh'}}>
    <CardHeader >
      <h4 style={{marginLeft : '40%'}}> Configuration Software </h4>
        
    </CardHeader>
       <CardBody >
           
             
          <div className="ag-theme-alpine" style={{ height: '70vh', width: "100%" }}>
    <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefshisto_configuration_software}
        rowData={data_soft}
        animateRows={true}
        pagination={true}
        rowSelection={'multiple'}
                
        >
    </AgGridReact>
</div>
    
        
          
        
    </CardBody>

</Card> 
    </Tab>

</Tabs>
   
  </Tab>
  
</Tabs>
      
<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Export"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Coucher les tables à exporter </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="Information MiMO/Handover/Performance" />
            }
            label="Information MiMO/Handover/Performance"
          />
          <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="Information Licence/Alarms/NGS" />
            }
            label="Information Licence/Alarms/NGS"
          />
          <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="Comparaison Conf vs Avatar 4G" />
            }
            label="Comparaison Conf vs Avatar 4G"
          />
            <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="Comparaison Conf vs Avatar 5G" />
            }
            label="Comparaison Conf vs Avatar 5G"
          />
        <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="Information ERAN" />
            }
            label="Information ERAN"
          />
        <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="Infos Général 4G" />
            }
            label="Infos Général 4G"
          />
        </FormGroup>
      </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} onClick={HandleExport}>Exporter</Button>
          <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} onClick={handleClose} autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>


<Dialog
        open={open2}
        fullWidth = {true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {TitleExc}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>{MessageExc}</h5>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
                <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true" style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}}
    />
    Loading...
  </Button>
        </DialogActions>
      </Dialog>
<Dialog
        open={open5}
        fullWidth = {true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>Importer le fichier reference</h5>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
         <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {(event) => {setOpen5(false)}}>
    Fermer
  </Button>
                <Button  style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {HandleImportReFile}>
    Envoyer
  </Button>
        </DialogActions>
      </Dialog>

<Dialog
        open={open6}
        fullWidth = {true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>{Message}</h5>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
                <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {(event) =>{setOpen6(false);}}>
    Fermer
  </Button>
        </DialogActions>
      </Dialog>


  <Dialog
        open={open7}
        fullWidth = {true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>Nouvelle Configuration RRU</h5>
           <Form>
        <FormGroup>
          <Label for="RRU">RRU</Label>
          <Input  name="RRU"  placeholder="RRU" onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}/>
        </FormGroup>

         <FormGroup>
          <Label for="exampleSelect">Constructeur</Label>
          <Input type="select" name="Constructeur" id="exampleSelect"  onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}>
            <option></option>
            <option>ERC</option>
            <option>HUA</option>
            
          </Input>
        </FormGroup>
        
        <FormGroup>
          <Label for="exampleSelect">Techno</Label>
          <Input type="select" name="Techno" id="exampleSelect" onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}>
            <option></option>
            <option>2G</option>
            <option>3G</option>
            <option>4G</option>
            <option>5G</option>
          </Input>
        </FormGroup>


     <FormGroup>
          <Label for="exampleSelect">Bande</Label>
          <Input type="select" name="Bande" id="exampleSelect" onChange = {(event) =>{ console.log(event.target.name); 
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}>
            <option></option>
            <option>700</option>
            <option>800</option>
            <option>900</option>
            <option>1800</option>
            <option>2100</option>
            <option>2600</option>
            <option>3500</option>
          </Input>
        </FormGroup>
    <FormGroup>
          <Label for="exampleSelect">Zone</Label>
          <Input type="select" name="Zone" id="exampleSelect" onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}>
            <option></option>
            <option>ZTD</option>
            <option>CRZ</option>
            
          </Input>
        </FormGroup>
      <FormGroup>
          <Label for="exampleSelect">MIMO</Label>
          <Input type="select" name="MIMO" id="exampleSelect" onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}> 
            <option></option>
            <option>4T</option>
            <option>2T</option>
           <option>1T</option>
            
          </Input>
        </FormGroup>
        
       <FormGroup>
          <Label for="Valeur">Valeur</Label>
          <Input  name="Valeur"  placeholder="Valeur" onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}/>
        </FormGroup>

   <FormGroup>
          <Label for="BandWidth">BandWidth</Label>
          <Input  name="BandWidth"  placeholder="BandWidth" onChange = {(event) =>{
                          setdata_powersent({
      ...data_powersent,
      [event.target.name]:  event.target.value,
    })}}/>
        </FormGroup>
       
      </Form>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
           <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {HandleRRU}>
    Enregister
  </Button>
                <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {(event) =>{setOpen7(false);}}>
    Fermer
  </Button>
        </DialogActions>
      </Dialog>

  <Dialog
        open={open3}
        fullWidth = {true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {TitleExc}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5>{MessageExc} </h5>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
                <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {handleClose3}>
    
    Fermer
  </Button>
        </DialogActions>
      </Dialog>



<Dialog
        open={open4}
        onClose={handleClose4}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = "md"
      >
        <DialogTitle id="alert-dialog-title">
          {"Programme"}
        </DialogTitle>
        <DialogContent>

          <DialogContentText id="alert-dialog-description">

<div   style = {{ float:'left' ,  backgroundImage: `url(${menu})`, height: '90vh', width : '40%', position : 'relative'}}>
     
        <ListGroup variant="flush">
  <ListGroupItem  style = {{ color: "#FF7F50", fontWeight: "bold" , float:'left' ,background: '#00000000' }} class="border border-white">  <img src={export_import} width="14%" className={export_import} /> <span  style ={{marginLeft :"2%"}}> Fichier à Importer</span></ListGroupItem>
      </ListGroup>
         <ButtonDropdown  style ={{marginTop :"2%"}} direction="right" isOpen={btnDropright} toggle={(event) => {setbtnDropright(!btnDropright) } } >
            <DropdownToggle caret style = {{background:'#FF7F50',  width : '30vh', fontWeight: "bold" }} >
          Importer
        </DropdownToggle>
         <DropdownMenu>
  
         <label  style = {{marginLeft : "5%"}}>
                               <input
                              style={{ display: "none"}}
                              id="file"
                              name="file"
                              type="file"
                              multiple
                              onChange={handleImport}
                            /><span >Importer Logs</span></label>
         <DropdownItem divider />
        <label style = {{marginLeft : "5%"}}>
                               <input
                              style={{ display: "none" }}
                              id="file"
                              name="file"
                              type="file"
                              multiple
                              onChange={handleImportRef}
                            /><span >Importer Ref File</span></label>
          </DropdownMenu>
         </ButtonDropdown>
        
    

    {files_list.length !== 0 && (Array.from(files_list).map((file,index) =>(                   
       <p>                                 
        <Toast>
      
      <ToastBody>
        {file.name}     
    <Button  color="light" style= {{marginLeft : "38%"}} onClick={() => {  const values = [...files_list];
    values.splice(index, 1);
    setFiles_2(values);}}> <FcFullTrash /> </Button>
      </ToastBody>
    </Toast>
                       </p>                 
                                         
                                )))}  
                                
                                
        {files_list_3.length !== 0 && (Array.from(files_list_3).map((file,index) =>(                   
       <p>                                 
        <Toast>
      
      <ToastBody>
        {file.name}     
    <Button  color="light" style= {{marginLeft : "38%"}} onClick={() => {  const values = [...files_list_3];
    values.splice(index, 1);
    setFiles_3(values);}}> <FcFullTrash /> </Button>
      </ToastBody>
    </Toast>
                       </p>                 
                                         
                                )))} 
                                
   <ListGroup variant="flush">
  <ListGroupItem class="border border-white" style = {{ color: "#FF7F50", fontWeight: "bold" , float:'left' , background: '#00000000', marginTop :"70%"}}><img src={export_import} width="14%" className={export_import} /> <span style ={{marginLeft :"2%"}}>Fichier à Exporter</span></ListGroupItem>
      </ListGroup>

 {files_list_zip.length !== 0 && (Array.from(files_list_zip).map((file_zip,index) =>(                   
       <p>                                 
        <Toast>
      
      <ToastBody>
        {file_zip}     
    <Button  color="light" style= {{marginLeft : "38%"}} onClick={() => { const link = document.createElement('a');
            
            link.href = './export/'+file_zip;
            link.setAttribute('download', file_zip);
            document.body.appendChild(link);
            link.click(); setFiles_zip([]) }}> <FcDownload /> </Button>
      </ToastBody>
    </Toast>
                       </p>                 
                                         
                                )))} 
    
</div>  
 <div style = {{  height: '90vh', marginLeft:'40%',  position : 'relative' , width : "60%"}}>
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Choisir Le programme</FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value_Programme}
             onChange={handleChangeProgramme}>

    <FormControlLabel value="BOLT ZTD" control={<Radio />} label="BOLT ZTD" />
    <FormControlLabel value="BOLT CRZ" control={<Radio />} label="BOLT CRZ" />
    <FormControlLabel value="DI ZTD" control={<Radio />} label="DI ZTD" />
    <FormControlLabel value="DI CRZ" control={<Radio />} label="DI CRZ" />
    <FormControlLabel value="TDD ZTD" control={<Radio />} label="TDD ZTD" />
    <FormControlLabel value="TDD CRZ"  control={<Radio />} label="TDD CRZ" />
    <FormControlLabel value="Ambition Mobile ZTD" control={<Radio />} label="Ambition Mobile ZTD" />
    <FormControlLabel value="Ambition Mobile CRZ"  control={<Radio />} label="Ambition Mobile CRZ" />
    <FormControlLabel value="Vercors" control={<Radio />} label="Vercors" />
    </RadioGroup>

  
      </FormControl>
</div>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} onClick={HandleScriptErc}>Exécuter</Button>
          <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} onClick={handleClose4} autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>


<Dialog
        open={open15}
        onClose={handleClose15}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = "md"
      >
        <DialogTitle id="alert-dialog-title">
          {"Programme"}
        </DialogTitle>
        <DialogContent>

          <DialogContentText id="alert-dialog-description">

<div   style = {{ float:'left' ,  backgroundImage: `url(${menu})`, height: '90vh', width : '40%', position : 'relative'}}>
     
        <ListGroup variant="flush">
  <ListGroupItem  style = {{ color: "#FF7F50", fontWeight: "bold" , float:'left' ,background: '#00000000' }} class="border border-white">  <img src={export_import} width="14%" className={export_import} /> <span  style ={{marginLeft :"2%"}}> Fichier à Importer</span></ListGroupItem>
      </ListGroup>
         <ButtonDropdown  style ={{marginTop :"2%"}} direction="right" isOpen={btnDropright} toggle={(event) => {setbtnDropright(!btnDropright) } } >
            <DropdownToggle caret style = {{background:'#FF7F50',  width : '30vh', fontWeight: "bold" }} >
          Importer
        </DropdownToggle>
         <DropdownMenu>
  
         <label  style = {{marginLeft : "5%"}}>
                               <input
                              style={{ display: "none"}}
                              id="file"
                              name="file"
                              type="file"
                              multiple
                              onChange={handleImport}
                            /><span >Importer Logs</span></label>
         <DropdownItem divider />
        <label style = {{marginLeft : "5%"}}>
                               <input
                              style={{ display: "none" }}
                              id="file"
                              name="file"
                              type="file"
                              multiple
                              onChange={handleImportRef}
                            /><span >Importer Ref File</span></label>
          </DropdownMenu>
         </ButtonDropdown>
        
    

    {files_list.length !== 0 && (Array.from(files_list).map((file,index) =>(                   
       <p>                                 
        <Toast>
      
      <ToastBody>
        {file.name}     
    <Button  color="light" style= {{marginLeft : "38%"}} onClick={() => {  const values = [...files_list];
    values.splice(index, 1);
    setFiles_2(values);}}> <FcFullTrash /> </Button>
      </ToastBody>
    </Toast>
                       </p>                 
                                         
                                )))}  
                                
                                
        {files_list_3.length !== 0 && (Array.from(files_list_3).map((file,index) =>(                   
       <p>                                 
        <Toast>
      
      <ToastBody>
        {file.name}     
    <Button  color="light" style= {{marginLeft : "38%"}} onClick={() => {  const values = [...files_list_3];
    values.splice(index, 1);
    setFiles_3(values);}}> <FcFullTrash /> </Button>
      </ToastBody>
    </Toast>
                       </p>                 
                                         
                                )))} 
                                
   <ListGroup variant="flush">
  <ListGroupItem class="border border-white" style = {{ color: "#FF7F50", fontWeight: "bold" , float:'left' , background: '#00000000', marginTop :"70%"}}><img src={export_import} width="14%" className={export_import} /> <span style ={{marginLeft :"2%"}}>Fichier à Exporter</span></ListGroupItem>
      </ListGroup>

 {files_list_zip.length !== 0 && (Array.from(files_list_zip).map((file_zip,index) =>(                   
       <p>                                 
        <Toast>
      
      <ToastBody>
        {file_zip}     
    <Button  color="light" style= {{marginLeft : "38%"}} onClick={() => { const link = document.createElement('a');
            
            link.href = './export/'+file_zip;
            link.setAttribute('download', file_zip);
            document.body.appendChild(link);
            link.click(); setFiles_zip([]) }}> <FcDownload /> </Button>
      </ToastBody>
    </Toast>
                       </p>                 
                                         
                                )))} 
    
</div>  

 <div style = {{  height: '90vh', marginLeft:'40%',  position : 'relative' , width : "60%"}}>
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Choisir Le programme</FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value_Programme}
             onChange={handleChangeProgramme}>

    <FormControlLabel value="BOLT ZTD" control={<Radio />} label="BOLT ZTD" />
    <FormControlLabel value="BOLT CRZ" control={<Radio />} label="BOLT CRZ" />
    <FormControlLabel value="DI ZTD" control={<Radio />} label="DI ZTD" />
    <FormControlLabel value="DI CRZ" control={<Radio />} label="DI CRZ" />
    <FormControlLabel value="TDD ZTD" control={<Radio />} label="TDD ZTD" />
    <FormControlLabel value="TDD CRZ"  control={<Radio />} label="TDD CRZ" />
    <FormControlLabel value="Ambition Mobile ZTD" control={<Radio />} label="Ambition Mobile ZTD" />
    <FormControlLabel value="Ambition Mobile CRZ"  control={<Radio />} label="Ambition Mobile CRZ" />
    <FormControlLabel value="Vercors" control={<Radio />} label="Vercors" />
    </RadioGroup>

  
      </FormControl>
</div>
 

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} onClick={HandleScriptHuw}>Exécuter</Button>
          <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} onClick={handleClose15} autoFocus>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

<Dialog
        open={open8}
        fullWidth = {true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Import Configuration RRU Puissance"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
    <input
      id="contained-button-file"
      multiple
      type="file"
      onChange={handleFiles}
    />

  {show? <h5 style = {{marginTop : "5%"}}> Veuillez attendre la fin d'import <CircularProgress/> </h5>  : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button
         style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold", marginRight : "53%"}} variant="primary" 
         onClick={handledownloadModel}>
         Modèle
        </Button>
            <Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {HandleRRUImportmass}>
    
    Importer
  </Button>
<Button style = {{background: '#4682B4', color : '#ffff', fontWeight: "bold"}} variant="primary" onClick = {handleClose8}>
    
    Fermer
  </Button>
         
        </DialogActions>
      </Dialog>

 



   <Dialog onClose={toggleshowtoast} open={showtoast}>
      <DialogTitle>{cellcliked}</DialogTitle>
      
    </Dialog>


</div>
    
    )
}
